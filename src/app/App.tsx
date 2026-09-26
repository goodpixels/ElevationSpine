import { Linkedin, Youtube, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router";
import SaberCDetail from "./SaberCDetail.tsx";
import Home from './pages/Home.tsx';
import Products from './pages/Products.tsx';
import News from './pages/News.tsx';
import Partners from './pages/Partners.tsx';
import Resources from './pages/Resources.tsx';
import ResourcesAdmin from './pages/ResourcesAdmin.tsx';
import Login from './pages/Login.tsx';
import About from './pages/About.tsx';
import SaberXADetail from './SaberXADetail.tsx';
import Privacy from './pages/Privacy.tsx';
import Legal from './pages/Legal.tsx';
import FDANotices from './pages/FDANotices.tsx';

// Legal and FDA pages stay out of the footer until Jim signs off.
const SHOW_LEGAL_AND_FDA = false;

const YOUTUBE_URL = "https://www.youtube.com/@ElevationSpine-i9z";
const LINKEDIN_URL = "https://www.linkedin.com/company/elevation-spine/";

// ─── Scroll To Top Component ────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// ─── Legacy reveal helpers ───────────────────────────────────────────────────
// Content must be visible immediately, so these no longer hide anything while
// waiting for scroll or animation.

export function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function TextRevealTitle({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  return <Tag className={className}>{text}</Tag>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const productLinks = [
  { label: "SABER-C | AVIA™", sub: "ACDF Fixation System", href: "/saber-c" },
  { label: "SABER-XA™", sub: "Expandable ALIF System", href: "/saber-xa" },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", children: productLinks },
  { label: "News", href: "/news" },
  { label: "Partners & Contact", href: "/partners" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/products") return ["/products", "/saber-c", "/saber-xa"].some((p) => pathname.startsWith(p));
  return pathname.startsWith(href);
}

function ProductsDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number>();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <Link
        to="/products"
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 font-heading text-[14px] font-medium transition-colors duration-200 px-3.5 py-2 rounded-[4px] whitespace-nowrap ${
          active ? "text-[#0a0e17] font-semibold bg-black/[0.04]" : "text-[#475569] hover:text-[#2ac4f4]"
        }`}
      >
        Products
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="w-[260px] bg-white border border-black/[0.08] rounded-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-2">
            {productLinks.map((p) => (
              <Link key={p.href} to={p.href} className="block px-3 py-2.5 rounded-[4px] hover:bg-black/[0.03]">
                <span className="block font-heading font-bold text-[14px] text-[#0a0e17]">{p.label}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-[#0891b2] mt-0.5">{p.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <nav className="fixed z-50 inset-x-0 top-5 px-4 md:px-8 pointer-events-none">
        <div className="flex items-center justify-between gap-3 max-w-[1400px] mx-auto pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[5px] px-4 md:px-5 py-2.5">
          <Link to="/" className="flex items-center shrink-0 py-1 px-1" aria-label="Elevation Spine home">
            <img
              src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386315/Elevation-Logo-ForAnimations_xlwquh.svg"
              alt="Elevation Spine"
              className="h-[42px] md:h-[48px] w-auto object-contain"
              style={{ maxWidth: 230 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) =>
              link.children ? (
                <ProductsDropdown key={link.label} active={isActivePath(location.pathname, link.href)} />
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative font-heading text-[14px] font-medium transition-colors duration-200 px-3.5 py-2 rounded-[4px] whitespace-nowrap ${
                    isActivePath(location.pathname, link.href)
                      ? "text-[#0a0e17] font-semibold bg-black/[0.04]"
                      : "text-[#475569] hover:text-[#2ac4f4]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="w-px h-5 bg-black/[0.1] mx-1" />

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-5 py-2 rounded-[4px] bg-[#2ac4f4] text-[#0a0e17] font-heading text-[13px] font-bold shadow-[0_4px_16px_rgba(42,196,244,0.35)] transition-colors duration-200 hover:bg-[#6ecff4] whitespace-nowrap ml-1"
            >
              Partner Portal
            </Link>
          </div>

          <button
            className="md:hidden text-[#1a2535] p-2 flex flex-col gap-1.5 rounded-[4px] border border-black/[0.08] bg-black/[0.02] h-[44px] w-[44px] items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-transform duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a2535] transition-transform duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu: renders fully visible on open, no fade-in gate */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[88px] inset-x-4 z-40 rounded-[6px] bg-white border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.15)]">
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block font-heading text-[15px] font-medium text-[#1a2535] px-4 py-3 rounded-[4px] hover:bg-black/5"
                >
                  {link.label}
                </Link>
                {link.children?.map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    className="block font-heading text-[14px] text-[#475569] pl-8 pr-4 py-2.5 rounded-[4px] hover:bg-black/5"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              to="/login"
              className="font-heading text-[14px] font-bold text-center text-[#0a0e17] bg-[#2ac4f4] hover:bg-[#6ecff4] px-4 py-3 rounded-[4px] mt-2 block"
            >
              Partner Portal
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Netlify Forms: the matching static form lives in index.html.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "newsletter", email }).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-[420px]">
      <h2 className="font-heading font-bold text-white text-[20px] mb-1.5">Stay Updated</h2>
      <p className="font-sans text-white/60 text-[14px] mb-4">Get product and company news from Elevation Spine.</p>
      {status === "done" ? (
        <p className="font-sans text-[#2ac4f4] text-[14px]" role="status">Thank you for subscribing.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 min-w-0 bg-white/10 border border-white/15 rounded-[4px] px-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#2ac4f4]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-6 py-3 rounded-[4px] hover:bg-[#6ecff4] transition-colors cursor-pointer disabled:opacity-60"
          >
            Subscribe
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="font-sans text-amber-300 text-[13px] mt-2" role="alert">
          Something went wrong. Please try again or email info@elevationspine.com.
        </p>
      )}
    </div>
  );
}

function Footer() {
  const legalLinks = [
    { label: "Privacy policy", href: "/privacy" },
    ...(SHOW_LEGAL_AND_FDA
      ? [
          { label: "Legal disclaimer", href: "/legal" },
          { label: "FDA notices", href: "/fda-notices" },
        ]
      : []),
  ];

  const columns = [
    {
      heading: "Navigation",
      links: [
        { label: "About", href: "/about" },
        { label: "Products", href: "/products" },
        { label: "News", href: "/news" },
        { label: "Partners & Contact", href: "/partners" },
        { label: "Partner Portal", href: "/login" },
      ],
    },
    { heading: "Legal", links: legalLinks },
  ];

  return (
    <footer className="sticky bottom-0 z-0 bg-[#0a0e17] border-t border-white/[0.08] px-6 md:px-12 pt-20 pb-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row justify-between gap-14">
          <div className="flex flex-col gap-8">
            <img
              src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386315/Elevation-Logo-ForAnimations_xlwquh.svg"
              alt="Elevation Spine"
              className="h-[46px] w-auto object-contain object-left brightness-0 invert opacity-90 self-start"
            />
            <NewsletterSignup />
          </div>

          <div className="flex flex-wrap gap-12 md:gap-[72px]">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-5">
                <p className="font-heading font-semibold text-white/40 text-[11px] uppercase tracking-[1.5px]">{col.heading}</p>
                <nav className="flex flex-col gap-3" aria-label={col.heading}>
                  {col.links.map((l) => (
                    <Link key={l.label} to={l.href} className="font-sans text-white/60 text-[15px] hover:text-[#2ac4f4] transition-colors duration-200">
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            <div className="flex flex-col gap-5">
              <p className="font-heading font-semibold text-white/40 text-[11px] uppercase tracking-[1.5px]">Contact</p>
              <div className="flex flex-col gap-1.5 font-sans text-white/60 text-[14px]">
                <a href="tel:8444150226" className="hover:text-[#2ac4f4]">(844) 415-0226</a>
                <a href="mailto:info@elevationspine.com" className="hover:text-[#2ac4f4]">info@elevationspine.com</a>
                <p className="mt-2">2511 Garden Road, Suite B125</p>
                <p>Monterey, California 93940</p>
              </div>
              <div className="flex gap-3 mt-1">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevation Spine on LinkedIn"
                  className="bg-white/10 border border-white/10 rounded-[5px] w-[44px] h-[44px] flex items-center justify-center hover:bg-white/20 hover:text-[#2ac4f4] transition-colors text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevation Spine on YouTube"
                  className="bg-white/10 border border-white/10 rounded-[5px] w-[44px] h-[44px] flex items-center justify-center hover:bg-white/20 hover:text-red-500 transition-colors text-white"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col gap-4">
          <p className="font-sans text-white/40 text-[12px] leading-relaxed max-w-[900px]">
            Please refer to the Instructions for Use for a complete list of indications, contraindications, precautions, and warnings. For further information on Elevation Spine products, please contact us. When Saber-C AVIA is used with spikes, supplemental fixation is required.
          </p>
          <p className="font-sans text-white/40 text-[13px]">© 2026 Elevation Spine. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/** Resources are portal only: anyone not signed in goes to the login page. */
function PortalOnly({ children }: { children: React.ReactNode }) {
  let signedIn = false;
  try {
    signedIn = localStorage.getItem("elevation_sales_auth") === "true";
  } catch {}
  return signedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/saber-c" element={<SaberCDetail />} />
      <Route path="/saber-xa" element={<SaberXADetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/news" element={<News />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/contact" element={<Navigate to="/partners?section=contact" replace />} />
      <Route path="/resources" element={<PortalOnly><Resources /></PortalOnly>} />
      <Route path="/resourcesadmin" element={<PortalOnly><ResourcesAdmin /></PortalOnly>} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/fda-notices" element={<FDANotices />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="bg-[#0a0e17] min-h-screen flex flex-col justify-between relative overflow-clip">
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 flex-1 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
