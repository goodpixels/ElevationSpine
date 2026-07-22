import svgPaths from "@/imports/ElevationHome1/svg-podh48szuv";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Link, Routes, Route } from "react-router";
import SaberCDetail from "./SaberCDetail.tsx";

// ─── Shared animation presets ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function RevealSection({
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

// ─── Logo ─────────────────────────────────────────────────────────────────────

function ElevationLogo() {
  return (
    <img
      src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
      alt="Elevation Spine"
      className="h-[38px] w-auto object-contain"
      style={{ maxWidth: 170 }}
    />
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Navbar: 3 pills grouped tightly together ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed z-50 inset-x-0 top-6 px-4 md:px-8 pointer-events-none"
      >
        <div className="flex items-center justify-center gap-[1px] max-w-[1600px] mx-auto">

          {/* ── Logo pill ── */}
          <Link
            to="/"
            className="pointer-events-auto flex items-center h-[64px] px-5 rounded-[22px] bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-black/[0.06] shrink-0"
          >
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
              alt="Elevation Spine"
              className="h-[44px] w-auto object-contain"
              style={{ maxWidth: 200 }}
            />
          </Link>

          {/* ── Nav links pill ── */}
          <div className="pointer-events-auto hidden md:flex items-center gap-1 px-6 h-[64px] rounded-[22px] bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-black/[0.06]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-heading text-[14px] font-medium text-[#1a2535] transition-colors duration-200 hover:text-[#2ac4f4] px-4 py-1.5 rounded-[12px] hover:bg-black/[0.04] whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Login pill ── */}
          <Link
            to="/login"
            className="pointer-events-auto hidden md:flex items-center h-[64px] px-8 gap-2 rounded-[22px] bg-[#2ac4f4] text-white font-heading text-[14px] font-semibold shadow-[0_4px_20px_rgba(42,196,244,0.35)] transition-colors duration-300 hover:bg-[#1aafde] shrink-0 whitespace-nowrap"
          >
            <span>→</span> Login
          </Link>

          {/* Mobile hamburger (only visible on mobile, so it stays grouped with logo) */}
          <button
            className="pointer-events-auto md:hidden text-[#1a2535] p-3 flex flex-col gap-1.5 bg-white/95 rounded-[22px] border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.10)] h-[64px] w-[64px] items-center justify-center ml-auto"
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
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-[80px] inset-x-4 z-40 overflow-hidden rounded-[20px] bg-white/95 backdrop-blur-2xl border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[14px] font-medium text-[#1a2535] px-4 py-3 rounded-[12px] hover:bg-black/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="font-heading text-[14px] font-semibold text-center text-white bg-[#2ac4f4] hover:bg-[#1aafde] px-4 py-3 rounded-[14px] mt-2 block transition-all"
          >
            → Login
          </Link>
        </div>
      </motion.div>
    </>
  );
}

import Home from './pages/Home.tsx';
import Products from './pages/Products.tsx';
import News from './pages/News.tsx';
import Partners from './pages/Partners.tsx';
import Contact from './pages/Contact.tsx';
import Resources from './pages/Resources.tsx';
import Login from './pages/Login.tsx';

function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.footer
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-[#0a0e17] border-t border-white/[0.08] px-9 pt-24 pb-24"
    >
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between gap-16">
        <div className="max-w-[660px] flex flex-col gap-9">
          <h3 className="font-heading font-bold text-white text-[36px] tracking-[-0.9px]">
            Elevation Spine
          </h3>
          <p className="font-sans text-white/50 text-[18px] md:text-[21px] leading-[1.45]">
            Leading the industry in zero-profile spinal fixation solutions. Our mission is to simplify complex surgical procedures through elegant mechanical engineering.
          </p>
          <p className="font-sans text-white/60 text-[16px]">
            © 2024 Elevation Spine. All rights reserved.
          </p>
        </div>

        <div className="flex gap-16 md:gap-[72px]">
          {[
            { heading: "Navigation", links: ["About us", "Products", "Contact"] },
            { heading: "Legal", links: ["Privacy policy", "Legal disclaimer", "FDA notices"] },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-6">
              <p className="font-heading font-semibold text-white/40 text-[11px] tracking-[1.5px]">
                {col.heading}
              </p>
              <nav className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <a key={l} href="#" className="font-sans text-white/60 text-[16px] hover:text-[#2ac4f4] transition-colors duration-200">
                    {l}
                  </a>
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
      </div>
    </motion.footer>
  );
}
export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saber-c" element={<SaberCDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}