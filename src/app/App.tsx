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
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "News", href: "/#news" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" }
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
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ color: "#2ac4f4" }}
                transition={{ duration: 0.15 }}
                className="font-heading text-[14px] font-medium text-[#1a2535] transition-colors duration-200 hover:text-[#2ac4f4] px-4 py-1.5 rounded-[12px] hover:bg-black/[0.04] whitespace-nowrap"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* ── Login pill ── */}
          <motion.a
            href="/#login"
            whileHover={{ scale: 1.03, backgroundColor: "#1aafde" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto hidden md:flex items-center h-[64px] px-8 gap-2 rounded-[22px] bg-[#2ac4f4] text-white font-heading text-[14px] font-semibold shadow-[0_4px_20px_rgba(42,196,244,0.35)] transition-colors duration-300 shrink-0 whitespace-nowrap"
          >
            <span>→</span> Login
          </motion.a>

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
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[14px] font-medium text-[#1a2535] px-4 py-3 rounded-[12px] hover:bg-black/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#login"
            onClick={() => setMobileOpen(false)}
            className="font-heading text-[14px] font-semibold text-center text-white bg-[#2ac4f4] hover:bg-[#1aafde] px-4 py-3 rounded-[14px] mt-2 block transition-all"
          >
            → Login
          </a>
        </div>
      </motion.div>
    </>
  );
}

// ─── Video Gallery Modal ───────────────────────────────────────────────────────


const saberCVideos = [
  {
    id: "hero",
    title: "SABER-C™ — Porous Structure Loop",
    desc: "Engineered for movement, designed for comfort",
    url: "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709515/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
  },
  {
    id: "insertion",
    title: "SABER-C™ — In-Line Insertion Demo",
    desc: "Single-step delivery into the disc space",
    url: "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709740/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png",
  },
  {
    id: "screw",
    title: "SABER-C™ — Divergent Screw Fixation",
    desc: "Zero-profile integrated fixation system",
    url: "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709515/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
  },
];

function VideoGalleryModal({ onClose }: { onClose: () => void }) {
  const [activeVideo, setActiveVideo] = useState(saberCVideos[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[960px] bg-[#0c111e] border border-white/10 rounded-[28px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08]">
          <div>
            <p className="font-mono text-[#7fd0ff] text-[11px] tracking-[2px] mb-1">SABER-C™ Video Library</p>
            <h3 className="font-heading font-bold text-white text-[18px]">{activeVideo.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/90 transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Main video */}
        <div className="relative aspect-video bg-black">
          <video
            key={activeVideo.id}
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
          >
            <source src={activeVideo.url} type="video/mp4" />
          </video>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 p-5 bg-[#080c18] border-t border-white/[0.06] overflow-x-auto">
          {saberCVideos.map((vid) => (
            <button
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-[14px] border transition-all duration-200 text-left ${
                activeVideo.id === vid.id
                  ? "bg-[#2ac4f4]/15 border-[#2ac4f4]/40"
                  : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07]"
              }`}
            >
              <div className="w-14 h-9 rounded-[8px] overflow-hidden shrink-0">
                <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className={`font-heading text-[11px] font-semibold truncate max-w-[160px] ${
                  activeVideo.id === vid.id ? "text-[#7fd0ff]" : "text-white/70"
                }`}>{vid.title}</p>
                <p className="font-sans text-[10px] text-white/40 truncate max-w-[160px]">{vid.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Outer section: page bg shows around the rounded card — navbar floats over the top */}
      <section className="relative w-full min-h-screen bg-white px-4 md:px-6 lg:px-8 pt-4 pb-6">
        {/* ── Rounded video card — fills viewport, navbar overlays from top ── */}
        <div className="relative w-full h-[calc(100vh-40px)] min-h-[580px] rounded-[24px] md:rounded-[32px] overflow-hidden">

          {/* Video background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0f1520] to-[#1a2535]" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/img/hero-poster.jpg"
          >
            <source src="https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4" type="video/mp4" />
          </video>

          {/* Overlay gradients for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/85 via-[#0a0e17]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/65 via-[#0a0e17]/10 to-transparent" />

          {/* ── Left content — centered vertically ── */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-[60px] lg:px-[80px] pt-8 pb-28">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-[580px]"
            >
              <motion.h1
                variants={fadeUp}
                className="font-heading font-bold text-[46px] md:text-[64px] lg:text-[74px] text-white leading-[1.04] mb-5"
              >
                Traditional fusion <span className="text-[#2ac4f4]">redefined</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-sans font-normal text-[14px] md:text-[16px] text-white/80 leading-relaxed mb-8 max-w-[370px]"
              >
                Through proprietary Saber technology, Elevation Spine enables surgeons to perform spinal fusion more efficiently.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                {/* Primary CTA — teal filled */}
                <a href="#products">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2, boxShadow: "0 14px 36px rgba(42,196,244,0.42)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-semibold text-[13px] px-7 py-[13px] rounded-full cursor-pointer flex items-center gap-2 shadow-[0_8px_24px_rgba(42,196,244,0.3)]"
                  >
                    <span className="text-[14px]">→</span> Explore products
                  </motion.button>
                </a>

                {/* Secondary CTA — white ghost */}
                <a href="#about">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-white/10 text-white font-heading font-semibold text-[13px] px-7 py-[13px] rounded-full cursor-pointer border border-white/30 backdrop-blur-sm"
                  >
                    Learn more
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Bottom-right floating Play Video card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-7 md:bottom-9 right-6 md:right-9 z-20 flex items-end gap-3"
          >
            {/* Thumbnail chip */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.25 }}
              className="hidden sm:block w-[84px] h-[64px] rounded-[12px] overflow-hidden border border-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.5)]"
            >
              <img
                src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709515/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png"
                alt="SABER-C device thumbnail"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Glass card */}
            <motion.button
              onClick={() => setVideoOpen(true)}
              whileHover={{ y: -3, boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(42,196,244,0.25)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group bg-white/[0.09] backdrop-blur-2xl border border-white/15 rounded-[18px] px-5 py-4 text-left flex flex-col gap-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] min-w-[200px] cursor-pointer"
            >
              <p className="font-sans text-[13px] font-medium text-white leading-snug max-w-[175px]">
                Engineered for movement,<br />designed for comfort
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 flex items-center justify-center group-hover:bg-[#2ac4f4]/35 transition-colors">
                  <svg fill="none" viewBox="0 0 16 16" className="w-2.5 h-2.5">
                    <path d="M5 3.5l8 4.5-8 4.5V3.5z" fill="#7fd0ff" />
                  </svg>
                </div>
                <span className="font-heading text-[#7fd0ff] text-[11px] font-semibold">Play video</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Modal */}
      <AnimatePresence>
        {videoOpen && <VideoGalleryModal onClose={() => setVideoOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Glass Ribbon ─────────────────────────────────────────────────────────────

function GlassRibbonSection() {
  const items = [
    {
      icon: svgPaths.p13774060,
      iconVB: "0 0 528 31.5",
      tag: "FDA 510(k) Cleared",
      desc: "Commercially distributed across strategic US healthcare networks with proven safety profiles.",
    },
    {
      icon: svgPaths.p1104fd00,
      iconVB: "0 0 454.5 28.575",
      tag: "Proprietary Fixation",
      desc: "Low-profile instrumentation designed for minimally invasive approaches and reduced operative time.",
    },
    {
      icon: svgPaths.p12df5c00,
      iconVB: "0 0 454.5 30",
      tag: "Single-Step In-Line Insertion",
      desc: "Eliminates multi-stage deployment workflows, enhancing precision in high-stakes spinal procedures.",
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="partners" className="relative bg-white border-y border-black/[0.07]">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-[1800px] mx-auto px-8 md:px-24 py-12 md:py-[50px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[72px]"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`flex flex-col gap-3 ${i > 0 ? "md:border-l md:border-black/10 md:pl-[73.5px]" : ""}`}
          >
            <div className="pb-3 overflow-hidden" style={{ maxHeight: "32px" }}>
              <svg fill="none" viewBox={item.iconVB} className="h-[32px]" style={{ width: "auto", maxWidth: "100%" }}>
                <path d={item.icon} fill="#2ac4f4" />
              </svg>
            </div>
            <p className="font-mono font-medium text-[#2ac4f4] text-[14px] tracking-[1px]">
              {item.tag}
            </p>
            <p className="font-sans font-normal text-[#4a5568] text-[16px] md:text-[18px] leading-[1.5]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

// ─── Products ─────────────────────────────────────────────────────────────────

const productsData = [
  {
    id: "saber-c",
    tag: "Available now",
    tagColor: "text-[#0891b2] bg-[#2ac4f4]/10 border-[#2ac4f4]/20",
    title: "SABER-C™",
    description: "Integrated cervical interbody fusion system designed for maximum stability with minimal anatomic disruption.",
    visualType: "video",
    visualUrl: "https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    link: "/saber-c",
    cta: "View device details",
  },
  {
    id: "saber-xa",
    tag: "Pipeline development",
    tagColor: "text-[#64748b] bg-slate-100 border-slate-200",
    title: "SABER-XA™",
    description: "Next-generation lateral access fixation currently undergoing final validation and clinical advisory review.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709740/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png",
    statusUpdate: {
      title: "Status update",
      text: `"Validation phases for the XA series are exceeding biomechanical benchmarks. Enrollment for initial clinical evaluation begins Q4."`,
    },
  },
];

function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const duration = 6000; // 6 seconds per product slide

  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        setActiveIndex((prev) => (prev + 1) % productsData.length);
        setProgress(0);
      } else {
        timerRef.current = requestAnimationFrame(updateProgress);
      }
    };

    timerRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setActiveIndex(index);
    setProgress(0);
  };

  const activeProduct = productsData[activeIndex];

  return (
    <section id="products" className="bg-[#f8fafc] px-6 md:px-16 lg:px-24 py-24 border-y border-black/[0.04]">
      <div className="max-w-[1420px] mx-auto mb-12">
        <RevealSection>
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Spine Solutions
          </p>
          <h2 className="font-heading font-bold text-[#1a2535] text-[36px] md:text-[48px] leading-[1.15] tracking-tight max-w-[800px]">
            Innovative platforms engineered for precision and procedural simplicity.
          </h2>
        </RevealSection>
      </div>

      <div className="max-w-[1420px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Content Card */}
        <div className="lg:col-span-5 bg-white border border-black/[0.06] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-5 text-left"
              >
                <div className={`inline-flex self-start items-center border rounded-full px-4 py-1.5 ${activeProduct.tagColor}`}>
                  <span className="font-mono font-medium text-[11px] tracking-wider uppercase">
                    {activeProduct.tag}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-[#0a0e17] text-[40px] md:text-[52px] tracking-tight leading-none">
                  {activeProduct.title}
                </h3>
                
                <p className="text-[#4a5568] text-[16px] md:text-[18px] leading-relaxed">
                  {activeProduct.description}
                </p>

                {activeProduct.id === "saber-c" && activeProduct.link && (
                  <div className="mt-6">
                    <Link to={activeProduct.link} className="inline-block">
                      <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(42,196,244,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#2ac4f4]/10 border border-[#2ac4f4]/35 rounded-[16px] flex items-center gap-4 px-6 py-4 text-[#0a0e17] cursor-pointer"
                      >
                        <svg fill="none" viewBox="0 0 24 30" className="w-4 h-5 shrink-0">
                          <path d={svgPaths.pc679c40} fill="#0891b2" />
                        </svg>
                        <span className="font-heading font-bold text-[#0891b2] text-[14px]">
                          {activeProduct.cta}
                        </span>
                        <svg fill="none" viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
                          <path d={svgPaths.p358da480} fill="#0891b2" />
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                )}

                {activeProduct.statusUpdate && (
                  <div className="mt-6 bg-slate-50 border border-black/[0.04] rounded-[16px] p-6 text-left">
                    <p className="font-mono font-semibold text-[#64748b] text-[11px] tracking-wider mb-2 uppercase">
                      {activeProduct.statusUpdate.title}
                    </p>
                    <p className="italic text-[#475569] text-[14px] md:text-[15px] leading-relaxed">
                      {activeProduct.statusUpdate.text}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bars Indicators */}
          <div className="flex gap-3 mt-12 w-[180px] self-start">
            {productsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="flex-1 h-[3px] bg-black/[0.07] hover:bg-black/[0.15] rounded-full overflow-hidden relative cursor-pointer focus:outline-none transition-colors"
                aria-label={`Go to product ${idx + 1}`}
              >
                {activeIndex === idx && (
                  <div
                    className="h-full bg-[#2ac4f4] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {activeIndex > idx && (
                  <div className="h-full bg-black/40" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Visual Card */}
        <div className="lg:col-span-7 bg-[#0a0e17] rounded-[24px] overflow-hidden relative min-h-[360px] lg:min-h-[520px] flex items-center justify-center border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {activeProduct.visualType === "video" ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={activeProduct.visualUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={activeProduct.visualUrl}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Subtle overlay for styling integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── Distributor ──────────────────────────────────────────────────────────────

function DistributorSection() {
  const benefits = ["Exclusive Territory Rights", "Comprehensive Sales Training", "Direct Surgeon Support Channel"];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="contact" className="bg-[#f8fafc] px-8 md:px-[106px] pb-24 pt-24">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          ref={ref}
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-white border border-[#2ac4f4]/30 border-l-[4.5px] rounded-[18px] px-10 md:px-[52px] py-[50px] shadow-[0_4px_24px_rgba(42,196,244,0.08)]"
        >
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex-1 flex flex-col gap-9"
            >
              <div>
                <motion.h2 variants={fadeUp} className="font-heading font-bold text-[#0a0e17] text-[40px] md:text-[64px] tracking-[-1.44px] leading-[1.15] mb-6">
                  For distributors:<br />Ready to scale?
                </motion.h2>
                <p className="text-[#4a5568] text-[18px] md:text-[22px] leading-[1.55]">
                  We are actively expanding our national footprint. Gain access to the Elevation Spine platform, technical training assets, and territory-specific analytics.
                </p>
              </div>
              <motion.ul variants={stagger} className="flex flex-col gap-4">
                {benefits.map((b, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-4">
                    <svg fill="none" viewBox="0 0 25 25" className="w-5 h-5 shrink-0">
                      <path d={svgPaths.p6e98980} fill="#2ac4f4" />
                    </svg>
                    <span className="font-heading font-semibold text-[#0a0e17] text-[18px] md:text-[22px]">{b}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeUp} className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.04, y: -3, boxShadow: "0 20px 50px rgba(42,196,244,0.3)", backgroundColor: "#6ecff4" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-semibold text-[15px] md:text-[18px] px-12 md:px-16 py-6 rounded-full flex items-center justify-center gap-3 shadow-[0px_20px_50px_-10px_rgba(42,196,244,0.25)]"
              >
                Request territory data
                <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d={svgPaths.p2648c0c0} fill="#0a0e17" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Portal ───────────────────────────────────────────────────────────────────

function PortalSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px 0px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px 0px" });

  const resources = [
    { icon: svgPaths.p713f7c0, vb: "0 0 21.0468 26.6593", w: 21, h: 27, label: "Instructions for Use (IFU) Library" },
    { icon: svgPaths.p3db81d00, vb: "0 0 26.6593 21.0468", w: 27, h: 21, label: "Surgical Technique Animations" },
    { icon: svgPaths.p3e201828, vb: "0 0 23.9164 23.853", w: 24, h: 24, label: "Clinical Biomechanical Data" },
  ];

  return (
    <section id="login" className="bg-white px-8 md:px-[130px] py-24 md:py-[168px]">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16 md:gap-[134px] items-center">
        <motion.div
          ref={leftRef}
          variants={stagger}
          initial="hidden"
          animate={leftInView ? "visible" : "hidden"}
          className="flex-1 flex flex-col gap-10"
        >
          <div>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-[#2ac4f4] text-[48px] md:text-[67px] tracking-[-1.68px] leading-[1.0] mb-6">
              Technical resource portal
            </motion.h2>
            <p className="text-[#4a5568] text-[18px] md:text-[22px] leading-[1.6]">
              Secure access to detailed surgical techniques, Instructions for Use (IFU), clinical data, and marketing assets for authorized distributors and surgical staff.
            </p>
          </div>
          <motion.div variants={stagger} className="flex flex-col gap-8">
            {resources.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-8 cursor-default"
              >
                <div className="flex items-center justify-center w-[67px] h-[67px] shrink-0 bg-[#f0f9ff] border border-[#2ac4f4]/20 rounded-full">
                  <svg fill="none" viewBox={item.vb} style={{ width: item.w, height: item.h }}>
                    <path d={item.icon} fill="#2ac4f4" />
                  </svg>
                </div>
                <span className="font-heading font-medium text-[#0a0e17] text-[16px] md:text-[18px]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={rightRef}
          variants={fadeUp}
          initial="hidden"
          animate={rightInView ? "visible" : "hidden"}
          className="flex-1 w-full max-w-[520px]"
        >
          <div className="bg-white border border-black/[0.07] rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-[#2ac4f4]" />
            <div className="p-[48px] md:p-[67px] pt-[70px]">
              <h3 className="font-heading font-bold text-[#2ac4f4] text-[36px] md:text-[42px] tracking-[-1.05px] leading-[1.2] mb-2">
                Portal login
              </h3>
              <p className="text-[#64748b] text-[16px] md:text-[18px] mb-10">
                Authorized personnel only.
              </p>
              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-4">
                  <label className="font-heading font-semibold text-[#0a0e17] text-[12px] tracking-wide">
                    Institution email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@hospital.org"
                    className="bg-[#f8fafc] border border-black/10 rounded-[12px] px-6 py-5 font-sans text-[#0a0e17] text-[16px] placeholder-[#94a3b8] focus:outline-none focus:border-[#2ac4f4]/60 transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <label className="font-heading font-semibold text-[#0a0e17] text-[12px] tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-[#f8fafc] border border-black/10 rounded-[12px] px-6 py-5 font-sans text-[#0a0e17] text-[16px] placeholder-[#94a3b8] focus:outline-none focus:border-[#2ac4f4]/60 transition-colors"
                  />
                </div>

                <div className="border-t border-black/[0.07] pt-10 flex items-center justify-between">
                  <a href="#" className="font-heading text-[#64748b] text-[16px] hover:text-[#2ac4f4] transition-colors font-medium">
                    Request access
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2, backgroundColor: "#6ecff4" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-semibold text-[13px] px-10 py-4 rounded-full shadow-[0_4px_14px_rgba(42,196,244,0.3)] cursor-pointer"
                  >
                    Secure login
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

function WorkflowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="about" className="bg-[#f8fafc] px-8 md:px-[35px] py-24 md:py-[118px] overflow-hidden">
      <div ref={ref} className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16 md:gap-[118px] items-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-1 relative"
        >
          <div className="rounded-[18px] border border-black/[0.07] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709740/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png"
              alt="Streamlined procedural workflow"
              className="w-full object-cover"
              style={{ minHeight: "400px", maxHeight: "718px" }}
            />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-white border border-[rgba(42,196,244,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[18px] w-[140px] h-[140px] flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-[#2ac4f4] text-[32px] leading-none">85%</span>
            <span className="font-heading text-[#64748b] text-[10px] tracking-widest mt-1">Porosity</span>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 flex flex-col gap-16"
        >
          <div className="flex flex-col gap-9">
            <motion.p variants={fadeUp} className="font-heading font-semibold text-[#2ac4f4] text-[13px] tracking-wider">
              Clinical advantage
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-[#0a0e17] text-[36px] md:text-[47px] tracking-[-0.945px] leading-[1.2]">
              Streamlined procedural workflow
            </motion.h2>
            <p className="text-[#4a5568] text-[18px] md:text-[22px] leading-[1.65]">
              The Elevation Spine platform is engineered to reduce surgical time and minimize intraoperative complications. By integrating fixation directly into the interbody device, we remove the need for supplemental plating and secondary steps.
            </p>
          </div>

          <motion.div variants={stagger} className="flex flex-col gap-9">
            {[
              { title: "Reduced fluoroscopy", desc: "Fewer tool changes result in decreased radiation exposure." },
              { title: "Optimized stability", desc: "Immediate rigid fixation through divergent screw paths." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-9 items-start">
                <svg fill="none" viewBox="0 0 29.5312 35.4375" className="w-7 h-8 shrink-0 mt-0.5">
                  <path d={svgPaths.p24f65700} fill="#2ac4f4" />
                </svg>
                <div>
                  <p className="font-heading font-bold text-[#0a0e17] text-[16px] mb-1">{item.title}</p>
                  <p className="text-[#4a5568] text-[16px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

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

// ─── App ──────────────────────────────────────────────────────────────────────

function HomeView() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GlassRibbonSection />
      <ProductsSection />
      <WorkflowSection />
      <DistributorSection />
      <PortalSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/saber-c" element={<SaberCDetail />} />
      </Routes>
    </div>
  );
}
