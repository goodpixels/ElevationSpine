import svgPaths from "@/imports/ElevationHome1/svg-podh48szuv";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Link, Routes, Route, useLocation } from "react-router";
import SaberCDetail from "./SaberCDetail.tsx";
import Home from './pages/Home.tsx';
import Products from './pages/Products.tsx';
import News from './pages/News.tsx';
import Partners from './pages/Partners.tsx';
import Contact from './pages/Contact.tsx';
import Resources from './pages/Resources.tsx';
import ResourcesAdmin from './pages/ResourcesAdmin.tsx';
import Login from './pages/Login.tsx';

// ─── Scroll To Top Component ────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// ─── Shared animation presets ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TextRevealTitle({
  text,
  className = "",
  as = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const Component = motion[as] as any;
  const words = text.split(" ");

  return (
    <Component
      ref={ref}
      className={`inline-flex flex-wrap gap-x-[0.24em] gap-y-[0.1em] overflow-hidden ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-0.5">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0, filter: "blur(5px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "105%", opacity: 0, filter: "blur(5px)" }
            }
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + idx * 0.035,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/resources" }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (targetHref: string) => {
    if (location.pathname === targetHref || (targetHref === "/" && location.pathname === "/")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Navbar: 3 pills grouped tightly together with subtle floating depth ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed z-50 inset-x-0 top-6 px-4 md:px-8 pointer-events-none"
      >
        <div className="flex items-center justify-center gap-[2px] max-w-[1600px] mx-auto">

          {/* ── Logo pill ── */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto shrink-0"
          >
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="flex items-center h-[64px] px-6 rounded-[22px] bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/[0.06] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(42,196,244,0.15)] hover:border-[#2ac4f4]/40"
            >
              <img
                src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
                alt="Elevation Spine"
                className="h-[44px] w-auto object-contain"
                style={{ maxWidth: 200 }}
              />
            </Link>
          </motion.div>

          {/* ── Nav links pill ── */}
          <div className="pointer-events-auto hidden md:flex items-center gap-1 px-5 h-[64px] rounded-[22px] bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/[0.06]">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-heading text-[14px] font-medium transition-all duration-200 px-4 py-2 rounded-[14px] whitespace-nowrap ${
                    isActive
                      ? "text-[#0a0e17] font-semibold"
                      : "text-[#475569] hover:text-[#2ac4f4] hover:bg-black/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-[14px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ── Login pill ── */}
          <motion.div
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="pointer-events-auto hidden md:flex shrink-0"
          >
            <Link
              to="/login"
              className="flex items-center h-[64px] px-8 gap-2.5 rounded-[22px] bg-[#2ac4f4] text-[#0a0e17] font-heading text-[14px] font-bold shadow-[0_6px_24px_rgba(42,196,244,0.4)] transition-all duration-300 hover:bg-[#6ecff4] hover:shadow-[0_8px_32px_rgba(42,196,244,0.5)] shrink-0 whitespace-nowrap"
            >
              <span>→</span> Login
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="pointer-events-auto md:hidden text-[#1a2535] p-3 flex flex-col gap-1.5 bg-white/95 rounded-[22px] border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.10)] h-[64px] w-[64px] items-center justify-center ml-auto cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-transform duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-transform duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[96px] inset-x-4 z-40 overflow-hidden rounded-[24px] bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.15)]"
          >
            <div className="flex flex-col gap-1.5 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="font-heading text-[15px] font-medium text-[#1a2535] px-4 py-3 rounded-[14px] hover:bg-black/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-heading text-[14px] font-bold text-center text-[#0a0e17] bg-[#2ac4f4] hover:bg-[#6ecff4] px-4 py-3.5 rounded-[16px] mt-2 block transition-all shadow-md"
              >
                → Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 bg-[#0a0e17] border-t border-white/[0.08] px-6 md:px-12 pt-24 pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.75, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between gap-16"
      >
        <div className="max-w-[660px] flex flex-col gap-9">
          <h3 className="font-heading font-bold text-white text-[36px] tracking-[-0.9px]">
            Elevation Spine
          </h3>
          <p className="font-sans text-white/50 text-[18px] md:text-[21px] leading-[1.45]">
            Leading the industry in zero-profile spinal fixation solutions. Our mission is to simplify complex surgical procedures through elegant mechanical engineering.
          </p>
          <p className="font-sans text-white/60 text-[16px]">
            © 2026 Elevation Spine. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-[72px]">
          {[
            { heading: "Navigation", links: [{ label: "About us", href: "/#about" }, { label: "Products", href: "/products" }, { label: "Contact", href: "/contact" }] },
            { heading: "Legal", links: [{ label: "Privacy policy", href: "#" }, { label: "Legal disclaimer", href: "#" }, { label: "FDA notices", href: "#" }] },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-6">
              <p className="font-heading font-semibold text-white/40 text-[11px] tracking-[1.5px]">
                {col.heading}
              </p>
              <nav className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link key={l.label} to={l.href} className="font-sans text-white/60 text-[16px] hover:text-[#2ac4f4] transition-colors duration-200">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div className="flex flex-col gap-6">
            <p className="font-heading font-semibold text-white/40 text-[11px] tracking-[1.5px]">Connect</p>
            <div className="flex gap-4">
              {[
                { icon: svgPaths.p1e78c320, vb: "0 0 22.5 25" },
                { icon: svgPaths.p68cd680, vb: "0 0 25 20" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/10 border border-white/10 rounded-full w-[52px] h-[52px] flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg fill="none" viewBox={s.vb} className="w-5 h-5">
                    <path d={s.icon} fill="white" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/saber-c" element={<SaberCDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resourcesadmin" element={<ResourcesAdmin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="bg-[#0a0e17] min-h-screen flex flex-col justify-between relative overflow-clip">
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 flex-1 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}