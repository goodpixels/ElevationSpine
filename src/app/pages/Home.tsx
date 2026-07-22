import svgPaths from "@/imports/ElevationHome1/svg-podh48szuv";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll } from "motion/react";
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.currentTime = 7;
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.currentTime = 7;
    }
  };

  const handleTimeUpdate = () => {
    if (heroVideoRef.current && heroVideoRef.current.currentTime < 6.8) {
      heroVideoRef.current.currentTime = 7;
    }
  };

  return (
    <>
      {/* Outer section: page bg shows around the rounded card — navbar floats over the top */}
      <section className="relative w-full min-h-screen bg-white px-4 md:px-6 lg:px-8 pt-4 pb-6">
        {/* ── Rounded video card — fills viewport, navbar overlays from top ── */}
        <div className="relative w-full h-[calc(100vh-40px)] min-h-[580px] rounded-[24px] md:rounded-[32px] overflow-hidden">

          {/* Video background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0f1520] to-[#1a2535]" />
          <video
            ref={heroVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            poster="/img/hero-poster.jpg"
          >
            <source src="https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4#t=7" type="video/mp4" />
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

// ─── Mission Section (with Typing Effect) ──────────────────────────────────────

function TypingTitle({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 28); // Speed of typing
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <h2
      ref={ref}
      className="font-heading font-bold text-[#0a0e17] text-[28px] sm:text-[40px] md:text-[54px] lg:text-[60px] leading-[1.1] tracking-tight max-w-[1200px] text-left"
    >
      {displayedText}
      <span className="animate-pulse text-[#2ac4f4] ml-1">|</span>
    </h2>
  );
}

const missionImages = [
  {
    url: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783558935/El_Spine_products-7_s0qshq.jpg",
    title: "Zero-Profile Implant Architecture",
    caption: "Minimizes tissue disruption & eliminates secondary plates",
  },
  {
    url: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784759902/El_Spine_products-19_zvzhgl.jpg",
    title: "Slimline™ Precision Instrumentation",
    caption: "Streamlined single-tray surgical sequence for OR efficiency",
  },
  {
    url: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784759901/El_Spine_products-7_rp7ry0.jpg",
    title: "Integrated Spike Fixation",
    caption: "Pre-loaded in-line fixation providing rigid stability",
  },
];

function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v < 0.35) {
        setActiveIdx(0);
      } else if (v < 0.7) {
        setActiveIdx(1);
      } else {
        setActiveIdx(2);
      }
    });
  }, [scrollYProgress]);

  return (
    <section id="about" className="bg-white px-6 md:px-16 lg:px-24 py-20 border-b border-black/[0.04]">
      <div className="max-w-[1420px] mx-auto flex flex-col gap-12">
        {/* Title row */}
        <div className="min-h-[100px] sm:min-h-[140px] md:min-h-[160px]">
          <TypingTitle text="We engineer zero-profile spinal systems to elevate surgical control and patient recovery." />
        </div>
        
        {/* Separator line */}
        <div className="w-full h-px bg-black/[0.08]" />

        {/* Pinned scroll container */}
        <div ref={containerRef} className="relative min-h-[180vh] md:min-h-[220vh]">
          <div className="sticky top-[10vh] flex flex-col justify-center min-h-[calc(100vh-100px)] py-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column tag & interactive steps */}
              <div className="md:col-span-4 text-left flex flex-col gap-6">
                <span className="font-heading font-semibold text-[#64748b] text-[15px] tracking-wide uppercase">
                  Zero-profile, zero compromise.
                </span>

                {/* Step indicator */}
                <div className="hidden md:flex flex-col gap-4 mt-4 border-l-2 border-black/[0.08] pl-5">
                  {missionImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`text-left transition-all duration-300 cursor-pointer ${
                        activeIdx === i
                          ? "text-[#2ac4f4] font-semibold translate-x-1"
                          : "text-slate-400 hover:text-slate-600 font-normal"
                      }`}
                    >
                      <p className="font-heading text-sm">{img.title}</p>
                      <p className="font-sans text-xs text-slate-400 mt-0.5 line-clamp-1">{img.caption}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column details and animated image slide */}
              <div className="md:col-span-8 flex flex-col gap-6 text-left">
                <p className="font-heading font-semibold text-[#2ac4f4] text-[20px] md:text-[24px] leading-relaxed">
                  Our mission is to redefine spinal fusion surgery by delivering leading-edge zero-profile interbody systems that eliminate traditional secondary plating and accelerate recovery.
                </p>
                
                <p className="text-[#4a5568] text-[15px] md:text-[17px] leading-relaxed">
                  By integrating rigid fixation directly into the cage, our platform minimizes soft tissue disruption, optimizes sagittal balance, and reduces overall operating room time. Elevation Spine devices conform seamlessly to patient anatomy, locking securely in place to provide immediate rigid stability that supports long-term fusion.
                </p>

                {/* Pinned Image Container with Slide-in animation */}
                <div className="relative rounded-[24px] overflow-hidden border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.08)] aspect-[21/10] min-h-[260px] bg-slate-950 mt-2">
                  
                  {/* Subtle Scroll Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-white/70 text-[11px] font-sans tracking-wide">
                    <motion.span
                      animate={{ y: [0, 2.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[#2ac4f4] text-[12px]"
                    >
                      ↓
                    </motion.span>
                    <span>Scroll</span>
                  </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 70, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -70, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={missionImages[activeIdx].url}
                      alt={missionImages[activeIdx].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Caption badge */}
                    <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between z-10">
                      <div>
                        <p className="font-heading font-bold text-white text-lg md:text-xl drop-shadow">
                          {missionImages[activeIdx].title}
                        </p>
                        <p className="font-sans text-white/80 text-xs md:text-sm drop-shadow-sm">
                          {missionImages[activeIdx].caption}
                        </p>
                      </div>

                      {/* Step number badge */}
                      <div className="bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1 rounded-full font-mono text-white text-xs font-semibold shrink-0">
                        0{activeIdx + 1} / 03
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-20">
                  <motion.div
                    className="h-full bg-[#2ac4f4]"
                    animate={{ width: `${((activeIdx + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

// ─── Products ─────────────────────────────────────────────────────────────────

// ─── Products ─────────────────────────────────────────────────────────────────

const productsData = [
  {
    id: "saber-c",
    tag: "FDA 510(k) Cleared",
    tagColor: "text-[#0891b2] bg-[#2ac4f4]/10 border-[#2ac4f4]/20",
    title: "Saber-C™ Cervical Fusion System",
    description: "Zero-Profile Anterior Cervical Plate with Integrated Spike and Screw Fixation Options. Features a PorOss™ 3D-printed titanium porous interbody paired with in-line fixation for maximum stability.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568424/Saber-C_TECH-17-Spike_Deployment_Flush_ytsoeh.png",
    link: "/saber-c",
    cta: "View Device Details",
  },
  {
    id: "saber-xa",
    tag: "Pipeline development",
    tagColor: "text-[#64748b] bg-slate-100 border-slate-200",
    title: "SABER-XA™",
    description: "Next-generation lateral access fixation currently undergoing final validation and clinical advisory review.",
    visualType: "blueprint",
    visualUrl: "",
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
              ) : activeProduct.visualType === "image" ? (
                <img
                  src={activeProduct.visualUrl}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#0a101d] overflow-hidden">
                  {/* Blueprint Grid Lines */}
                  <div 
                    className="absolute inset-0 opacity-[0.07]" 
                    style={{
                      backgroundImage: 'radial-gradient(#2ac4f4 1.5px, transparent 1.5px), linear-gradient(rgba(42,196,244,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,196,244,0.1) 1px, transparent 1px)',
                      backgroundSize: '24px 24px, 24px 24px, 24px 24px',
                      backgroundPosition: '0 0, 12px 12px, 12px 12px'
                    }}
                  />
                  
                  {/* Pulsing Glow Rings */}
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.02, 0.15] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-32 h-32 rounded-full border border-[#2ac4f4]/25"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.05, 0.25] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-24 h-24 rounded-full border border-[#2ac4f4]/35"
                    />
                    
                    {/* Medical Icon Inner Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 flex items-center justify-center shadow-[0_0_24px_rgba(42,196,244,0.12)]">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-[#2ac4f4]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-6 text-center z-10 px-6">
                    <h4 className="font-mono text-[#2ac4f4] text-[12px] tracking-[2px] font-semibold uppercase mb-1.5">
                      {activeProduct.title}
                    </h4>
                    <p className="font-sans text-white/50 text-[12px] tracking-wider uppercase">
                      Product in Development
                    </p>
                  </div>
                </div>
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

// ─── Features (replaces Distributor) ─────────────────────────────────────────

const featureCards = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#2ac4f4]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "FDA 510(k) Cleared",
    desc: "SABER-C™ holds full FDA 510(k) clearance and is commercially distributed across leading US healthcare networks with proven safety and efficacy profiles.",
    link: "Learn More",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#2ac4f4]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Zero-Profile Fixation",
    desc: "Proprietary in-line screw deployment eliminates secondary anterior plating, reducing operative time, soft tissue disruption, and adjacence-segment complications.",
    link: "Learn More",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#2ac4f4]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Surgeon-Centric Design",
    desc: "Every instrument in the SABER system is engineered to reduce cognitive load in the OR — familiar ergonomics, single-step delivery, and intuitive locking mechanisms.",
    link: "Learn More",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="contact" className="bg-white px-6 md:px-16 lg:px-24 py-28 border-b border-black/[0.04]">
      <div className="max-w-[1420px] mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-4 uppercase"
          >
            Precision. Safety. Speed.
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold text-[#0a0e17] text-[36px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight max-w-[860px] mx-auto"
          >
            A leading platform for advanced cervical spine fixation
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 48px rgba(42,196,244,0.10)",
                borderColor: "rgba(42,196,244,0.35)",
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="group bg-[#f8fafc] border border-black/[0.06] rounded-[24px] p-8 flex flex-col gap-6 cursor-default"
            >
              {/* Icon box */}
              <div className="w-14 h-14 rounded-[16px] bg-[#f0f9ff] border border-[#2ac4f4]/20 flex items-center justify-center group-hover:bg-[#2ac4f4]/10 transition-colors duration-300">
                {card.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-heading font-bold text-[#0a0e17] text-[20px] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[#64748b] text-[15px] leading-relaxed flex-1">
                  {card.desc}
                </p>
              </div>

              {/* Link */}
              <motion.div
                className="flex items-center gap-2 text-[#0891b2] font-heading font-semibold text-[14px] w-fit"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span>→ {card.link}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note + CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6 text-center"
        >
          <p className="text-[#94a3b8] text-[15px] max-w-[560px] leading-relaxed">
            Our clinical and distribution teams collaborate with surgeons and healthcare networks across the US to ensure comprehensive adoption and outcomes tracking.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -3, boxShadow: "0 20px 50px rgba(42,196,244,0.35)", backgroundColor: "#6ecff4" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[15px] px-10 py-4 rounded-full flex items-center gap-3 shadow-[0_8px_28px_rgba(42,196,244,0.25)]"
          >
            → Explore All Products
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Portal ───────────────────────────────────────────────────────────────────

const BG_PORTAL = "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783571259/ChatGPT_Image_Jul_8_2026_11_27_26_PM_kiso5y.png";

function PortalSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  const resources = [
    { icon: svgPaths.p713f7c0, vb: "0 0 21.0468 26.6593", w: 21, h: 27, label: "Instructions for Use (IFU) Library" },
    { icon: svgPaths.p3db81d00, vb: "0 0 26.6593 21.0468", w: 27, h: 21, label: "Surgical Technique Animations" },
    { icon: svgPaths.p3e201828, vb: "0 0 23.9164 23.853", w: 24, h: 24, label: "Clinical Biomechanical Data" },
  ];

  return (
    <section
      id="login"
      ref={sectionRef}
      className="relative min-h-[680px] flex items-center overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_PORTAL})` }}
      />
      {/* Dark gradient overlay: heavy on left for text legibility, fades out on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      {/* Teal vignette tint at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e17]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1420px] mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* ── Left: Info card ──────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 flex flex-col gap-8"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "28px",
            padding: "44px 48px",
          }}
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-mono text-[#2ac4f4] text-[12px] tracking-widest uppercase font-semibold mb-3"
            >
              Secure Resource Access
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading font-bold text-white text-[34px] md:text-[46px] leading-[1.1] tracking-tight mb-4"
            >
              Technical<br />Resource Portal
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-[15px] md:text-[17px] leading-relaxed max-w-[420px]">
              Secure access to surgical techniques, IFU documentation, clinical data, and marketing assets for authorized distributors and surgical staff.
            </motion.p>
          </div>

          {/* Resource list */}
          <motion.div variants={stagger} className="flex flex-col gap-5">
            {resources.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-5 cursor-default group"
              >
                <div className="flex items-center justify-center w-[50px] h-[50px] shrink-0 rounded-full"
                  style={{ background: "rgba(42,196,244,0.12)", border: "1px solid rgba(42,196,244,0.25)" }}
                >
                  <svg fill="none" viewBox={item.vb} style={{ width: item.w * 0.75, height: item.h * 0.75 }}>
                    <path d={item.icon} fill="#2ac4f4" />
                  </svg>
                </div>
                <span className="font-heading font-medium text-white/80 group-hover:text-white text-[15px] transition-colors">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-row gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 20px 44px rgba(42,196,244,0.40)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-3.5 rounded-full flex items-center gap-2 shadow-[0_8px_24px_rgba(42,196,244,0.3)]"
            >
              → Request Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="border border-white/25 text-white font-heading font-medium text-[14px] px-8 py-3.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Right: Login form card ────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full max-w-[420px] shrink-0"
        >
          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
            }}
          >
            {/* Cyan top bar */}
            <div className="h-[4px] w-full bg-[#2ac4f4]" />

            <div className="p-10">
              <h3 className="font-heading font-bold text-white text-[28px] md:text-[32px] tracking-tight mb-1">
                Portal login
              </h3>
              <p className="text-white/50 text-[14px] mb-8">Authorized personnel only.</p>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="font-heading font-semibold text-white/60 text-[11px] tracking-widest uppercase">
                    Institution email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@hospital.org"
                    className="rounded-[12px] px-5 py-3.5 text-[15px] placeholder-white/25 text-white font-sans focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(42,196,244,0.6)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-heading font-semibold text-white/60 text-[11px] tracking-widest uppercase">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="rounded-[12px] px-5 py-3.5 text-[15px] placeholder-white/25 text-white font-sans focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(42,196,244,0.6)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }}
                  />
                </div>

                <div
                  className="flex items-center justify-between pt-4 mt-1"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <a
                    href="#"
                    className="font-heading text-white/50 hover:text-[#2ac4f4] text-[13px] font-medium transition-colors nav-underline"
                  >
                    Request access
                  </a>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 14px_36px rgba(42,196,244,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[13px] px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(42,196,244,0.4)] cursor-pointer"
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

const workflowSteps = [
  {
    step: "Step 01",
    title: "Trialing & Sizing",
    desc: "Use the low-profile trial instruments to determine height, footprint, and lordotic angle under fluoroscopy.",
    bgColor: "bg-slate-900 border border-slate-800 text-white shadow-[0_12px_40px_rgba(0,0,0,0.15)]",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#2ac4f4] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M9 9h3.75M16.5 12h.008v.008h-.008V12zm0 3h.008v.008h-.008V15zm0-6h.008v.008h-.008V9zM2.25 21h19.5M8.25 21v-3.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    step: "Step 02",
    title: "Implant Loading",
    desc: "Secure the SABER-C™ implant onto the unified inserter guide. Pre-pack the porous core with autologous bone graft.",
    bgColor: "bg-slate-950 border border-slate-900 text-white shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#2ac4f4] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "Step 03",
    title: "In-line Insertion",
    desc: "Deliver the implant into the disc space. The zero-profile configuration ensures no protrusion beyond the anterior cortex.",
    bgColor: "bg-sky-950 border border-sky-900 text-white shadow-[0_12px_40px_rgba(42,196,244,0.15)]",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#6ecff4] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>
    ),
  },
  {
    step: "Step 04",
    title: "Rigid Screw Fixation",
    desc: "Deploy screws through the integrated divergent guides. Engage the locking mechanism to prevent migration.",
    bgColor: "bg-[#2ac4f4] text-[#0a0e17] shadow-[0_20px_50px_rgba(42,196,244,0.3)]",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-[#0a0e17] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

function WorkflowSection() {
  return (
    <section id="about" className="bg-[#f8fafc] px-6 md:px-16 lg:px-24 py-24 border-b border-black/[0.04]">
      <div className="max-w-[1420px] mx-auto">
        
        {/* Title / Intro */}
        <div className="mb-20 text-left">
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Clinical Advantage
          </p>
          <h2 className="font-heading font-bold text-[#0a0e17] text-[36px] md:text-[48px] tracking-tight leading-[1.15] max-w-[800px]">
            Streamlined procedural workflow
          </h2>
          <p className="text-[#4a5568] text-[16px] md:text-[18px] mt-4 max-w-[700px] leading-relaxed">
            The Elevation Spine platform is engineered to reduce surgical time and minimize intraoperative complications. By integrating fixation directly into the interbody device, we remove the need for supplemental plating and secondary steps.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Column: Stacking Cards */}
          <div className="lg:col-span-6 flex flex-col gap-12 pb-32">
            {workflowSteps.map((s, idx) => (
              <div
                key={idx}
                className={`sticky rounded-[28px] p-8 md:p-12 min-h-[380px] flex flex-col justify-between transition-all duration-300 ${s.bgColor}`}
                style={{
                  top: `${140 + idx * 28}px`,
                  zIndex: idx + 10,
                }}
              >
                <div>
                  <span className="font-mono text-[12px] uppercase tracking-[2px] opacity-60 block mb-6">
                    {s.step}
                  </span>
                  {s.icon}
                  <h3 className="font-heading font-bold text-[24px] md:text-[32px] tracking-tight leading-none mb-4">
                    {s.title}
                  </h3>
                </div>
                <p className="text-[15px] md:text-[16px] leading-relaxed opacity-80 max-w-[440px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Image with stats overlays */}
          <div className="lg:col-span-6 sticky top-[140px] z-0 hidden lg:block">
            <div className="rounded-[28px] overflow-hidden border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)] bg-white relative">
              <img
                src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709740/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png"
                alt="Streamlined procedural workflow"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              
              {/* Bottom stats indicators overlaid exactly like the mockups */}
              <div className="absolute bottom-6 right-6 left-6 flex justify-end gap-3 pointer-events-none">
                <div className="bg-white/80 backdrop-blur-md border border-[rgba(42,196,244,0.3)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-[18px] px-6 py-4 flex flex-col items-center justify-center min-w-[120px]">
                  <span className="font-heading font-bold text-[#2ac4f4] text-[24px] leading-none">85%</span>
                  <span className="font-heading text-[#64748b] text-[10px] tracking-widest mt-1">Porosity</span>
                </div>
                
                <div className="bg-[#2ac4f4]/95 text-[#0a0e17] shadow-[0_8px_24px_rgba(42,196,244,0.2)] rounded-[18px] px-6 py-4 flex flex-col items-center justify-center min-w-[120px]">
                  <span className="font-heading font-bold text-[24px] leading-none">2-S</span>
                  <span className="font-heading text-[10px] tracking-widest mt-1 uppercase">Fixation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ProductsSection />
      <WorkflowSection />
      <FeaturesSection />
      <PortalSection />
    </>
  );
}
