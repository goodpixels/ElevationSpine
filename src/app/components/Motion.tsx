import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

/**
 * Site-wide scroll motion ("floaty"), applied from one place.
 *
 * The client's launch edits require content to be visible immediately, so
 * nothing that is on screen when a page opens is ever hidden. Tagging runs
 * in a layout effect (after render, before paint) and only touches blocks
 * that start below the fold; those float up into place as they scroll in.
 *
 * Variants (rules in styles/motion.css):
 *   text   h1/h2: each word rises and fades in turn
 *   zoom   figures/photos: settle from a slight zoom
 *   (none) cards, paragraphs, other blocks: rise and fade
 * Grid children stagger 160ms apart. Only opacity and transform animate.
 * ?motion=off in the URL switches it off in that browser (see index.html).
 */

const GRIDS = "main .grid > *";
const BLOCKS = "main section > div > *, main section > div > div > *, main header > div > *";

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  // Only plain-text headings: React owns anything with nested elements.
  if (Array.from(el.childNodes).some((n) => n.nodeType !== Node.TEXT_NODE)) return;
  el.dataset.split = "1";
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  const frag = document.createDocumentFragment();
  let i = 0;
  text.split(/( +)/).forEach((part) => {
    if (!part) return;
    if (/^ +$/.test(part)) {
      frag.appendChild(document.createTextNode(part));
    } else {
      const s = document.createElement("span");
      s.className = "mw";
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--w", String(i++));
      s.textContent = part;
      frag.appendChild(s);
    }
  });
  el.replaceChildren(frag);
}

export default function Motion() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    if (!root.hasAttribute("data-motion") || !main) return;
    // Measure from the top of the new page (ScrollToTop runs after paint).
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const startLine = () => window.innerHeight * 0.88;
    // Anything already on screen stays exactly as rendered.
    const belowFold = (el: Element) => el.getBoundingClientRect().top > startLine();

    const pending = new Set<HTMLElement>();
    const tag = (el: HTMLElement, variant = "") => {
      if (el.hasAttribute("data-reveal") || el.closest("[data-reveal]") || el.querySelector("[data-reveal]")) return;
      if (el.closest("[data-no-reveal]") || !belowFold(el)) return;
      el.setAttribute("data-reveal", variant);
      pending.add(el);
    };

    main.querySelectorAll<HTMLElement>(GRIDS).forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
      el.style.setProperty("--d", `${Math.min(i, 6) * 160}ms`);
      tag(el);
    });
    main.querySelectorAll<HTMLElement>("h1, h2").forEach((h) => {
      if (h.closest("[data-reveal]") || !belowFold(h)) return;
      splitWords(h);
      tag(h, h.dataset.split ? "text" : "");
    });
    main.querySelectorAll<HTMLElement>("figure").forEach((el) => tag(el, "zoom"));
    main.querySelectorAll<HTMLElement>("p, ul").forEach((el) => tag(el));
    main.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => tag(el));

    let ticking = false;
    const check = () => {
      ticking = false;
      const limit = startLine();
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        const started = r.top + Math.min(r.height * 0.2, 60) < limit || r.bottom <= window.innerHeight;
        if (started && r.bottom > 0) {
          el.setAttribute("data-in", "");
          pending.delete(el);
          // Once revealed it is an ordinary element again, so hover lifts apply.
          window.setTimeout(() => {
            el.removeAttribute("data-reveal");
            el.removeAttribute("data-in");
            el.style.removeProperty("--d");
          }, 3200);
        }
      });
      if (pending.size === 0) detach();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Safety net: nothing may stay hidden if scroll events never arrive.
    const late = window.setTimeout(check, 800);

    return () => {
      detach();
      window.clearTimeout(late);
      pending.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.style.removeProperty("--d");
      });
    };
  }, [pathname]);

  return null;
}
