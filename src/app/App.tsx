import svgPaths from "@/imports/ElevationHome1/svg-podh48szuv";
import { Linkedin, Youtube } from "lucide-react";
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
import About from './pages/About.tsx';
import SaberXADetail from './SaberXADetail.tsx';
import Privacy from './pages/Privacy.tsx';
import Legal from './pages/Legal.tsx';
import FDANotices from './pages/FDANotices.tsx';

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
  const inView = useInView(ref, { once: true, margin: "-20px 0px" });
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
  const isInView = useInView(ref, { once: true, margin: "-10px 0px" });

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
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
  { label: "Partners & Contact", href: "/partners" },
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
      {/* ── Navbar: Angular unified bar with reduced border radius ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed z-50 inset-x-0 top-5 px-4 md:px-8 pointer-events-none"
      >
        <div className="flex items-center justify-between gap-3 max-w-[1400px] mx-auto pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[5px] px-4 md:px-5 py-2.5">

          {/* ── Combined Logo ── */}
          <Link
            to="/"
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-3 shrink-0 py-1 px-1 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
              alt="Elevation Spine"
              className="h-[42px] md:h-[48px] w-auto object-contain"
              style={{ maxWidth: 230 }}
            />
          </Link>

          {/* ── Nav links & Action button ── */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
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
                  className={`relative font-heading text-[14px] font-medium transition-all duration-200 px-3.5 py-2 rounded-[4px] whitespace-nowrap ${
                    isActive
                      ? "text-[#0a0e17] font-semibold bg-black/[0.04]"
                      : "text-[#475569] hover:text-[#2ac4f4] hover:bg-black/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-2 h-[2px] bg-[#2ac4f4]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            <div className="w-px h-5 bg-black/[0.1] mx-1" />

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-5 py-2 rounded-[4px] bg-[#2ac4f4] text-[#0a0e17] font-heading text-[13px] font-bold shadow-[0_4px_16px_rgba(42,196,244,0.35)] transition-all duration-200 hover:bg-[#6ecff4] hover:shadow-[0_6px_20px_rgba(42,196,244,0.45)] whitespace-nowrap ml-1"
            >
              <span>→</span> Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#1a2535] p-2 flex flex-col gap-1.5 rounded-[4px] border border-black/[0.08] bg-black/[0.02] h-[44px] w-[44px] items-center justify-center cursor-pointer"
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[84px] inset-x-4 z-40 overflow-hidden rounded-[6px] bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.15)]"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="font-heading text-[15px] font-medium text-[#1a2535] px-4 py-3 rounded-[4px] hover:bg-black/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-heading text-[14px] font-bold text-center text-[#0a0e17] bg-[#2ac4f4] hover:bg-[#6ecff4] px-4 py-3 rounded-[4px] mt-2 block transition-all shadow-sm"
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
        className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16"
      >
        <div className="max-w-[660px] flex flex-col gap-8">
          <div>
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
              alt="Elevation Spine"
              className="h-[46px] w-auto object-contain brightness-0 invert opacity-90 mb-4"
            />
            <p className="font-mono text-[#2ac4f4] text-[12px] uppercase tracking-widest font-semibold">
              Integrated Fixation Spinal Technologies
            </p>
          </div>
          <p className="font-sans text-white/60 text-[15px] md:text-[16px] leading-[1.6]">
            Developing differentiated spinal fusion technologies through the proprietary Saber platform. Integrated fixation, implant innovation, and streamlined instrumentation for cervical and lumbar procedures.
          </p>
          <div className="flex flex-col gap-1.5 font-sans text-white/70 text-[14px]">
            <p>Phone: (844) 415-0226</p>
            <p>Email: info@elevationspine.com</p>
            <p className="mt-2">2511 Garden Road | Suite B125</p>
            <p>Monterey, California 93940</p>
          </div>
          <p className="font-sans text-white/40 text-[13px]">
            © 2026 Elevation Spine. All rights reserved.
          </p>
          <p className="font-sans text-white/30 text-[11px] leading-relaxed mt-3 max-w-[560px]">
            When Saber-C AVIA™ is used with spikes, supplemental fixation is required. Please refer to the Instructions for Use for a complete list of indications, contraindications, warnings, and precautions.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-[72px]">
          {[
            { heading: "Navigation", links: [{ label: "About us", href: "/about" }, { label: "Products", href: "/products" }, { label: "News", href: "/news" }, { label: "Partners & Contact", href: "/partners" }, { label: "Resources", href: "/resources" }] },
            { heading: "Legal", links: [{ label: "Privacy policy", href: "/privacy" }, { label: "Legal disclaimer", href: "/legal" }, { label: "FDA notices", href: "/fda-notices" }] },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-6">
              <p className="font-heading font-semibold text-white/40 text-[11px] tracking-[1.5px]">
                {col.heading}
              </p>
              <nav className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link key={l.label} to={l.href} className="font-sans text-white/60 text-[15px] hover:text-[#2ac4f4] transition-colors duration-200">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div className="flex flex-col gap-6">
            <p className="font-heading font-semibold text-white/40 text-[11px] tracking-[1.5px]">Connect</p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/elevation-spine/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="bg-white/10 border border-white/10 rounded-[5px] w-[48px] h-[48px] flex items-center justify-center hover:bg-white/20 hover:text-[#2ac4f4] transition-colors text-white"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@ElevationSpine-i9z"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="bg-white/10 border border-white/10 rounded-[5px] w-[48px] h-[48px] flex items-center justify-center hover:bg-white/20 hover:text-red-500 transition-colors text-white"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
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
          <Route path="/about" element={<About />} />
          <Route path="/saber-c" element={<SaberCDetail />} />
          <Route path="/saber-xa" element={<SaberXADetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Partners />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resourcesadmin" element={<ResourcesAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/fda-notices" element={<FDANotices />} />
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