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
      src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386315/Elevation-Logo-ForAnimations_xlwquh.svg"
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
              src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386315/Elevation-Logo-ForAnimations_xlwquh.svg"
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
    id: "saberc-animation",
    title: "Saber-C AVIA™ — Final Animation Walkthrough",
    desc: "Engineered for movement, designed for comfort",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787016076/SaberC-FinalAnimation_na701a.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
  },
  {
    id: "company-trailer",
    title: "Elevation Spine — Company Vision & Technology Trailer",
    desc: "Single-tray simplicity, zero-profile procedural stability",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787015467/Trailer_v2B-HD_doraqy.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
  },
  {
    id: "insertion",
    title: "Saber-C AVIA™ — In-Line Insertion Demo",
    desc: "Single-step delivery into the disc space",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386320/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png",
  },
  {
    id: "screw",
    title: "Saber-C AVIA™ — Divergent Screw Fixation",
    desc: "Zero-profile integrated fixation system",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
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
        className="w-full max-w-[960px] bg-[#0c111e] border border-white/10 rounded-[14px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08]">
          <div>
            <p className="font-mono text-[#7fd0ff] text-[11px] tracking-[2px] mb-1">Saber-C AVIA™ Video Library</p>
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
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-[7px] border transition-all duration-200 text-left ${
                activeVideo.id === vid.id
                  ? "bg-[#2ac4f4]/15 border-[#2ac4f4]/40"
                  : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07]"
              }`}
            >
              <div className="w-14 h-9 rounded-[4px] overflow-hidden shrink-0">
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
      {/* ── Outer section: Edge-to-edge straight-edge background video ── */}
      <section className="relative w-full min-h-[75vh] md:min-h-screen bg-[#0a0e17] overflow-hidden">
        {/* Full bleed video background without curved border crops */}
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
          <source src="https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4#t=7" type="video/mp4" />
        </video>

        {/* Overlay gradients for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/90 via-[#0a0e17]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/75 via-[#0a0e17]/20 to-transparent" />

        {/* ── Left content — aligned to bottom on mobile, centered on desktop ── */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pb-28 min-h-[75vh] md:min-h-screen">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-[620px]"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#2ac4f4]/15 border border-[#2ac4f4]/35 rounded-[3px] px-3.5 py-1 text-xs font-mono text-[#2ac4f4] mb-6 uppercase tracking-widest font-semibold">
              Zero-Profile Integrated Fixation
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading font-bold text-[40px] md:text-[56px] lg:text-[62px] text-white leading-[1.05] mb-5 tracking-tight"
            >
              SABER Systems: <br /><span className="text-[#2ac4f4]">One Tray. Every Case.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-sans font-normal text-[15px] md:text-[17px] text-white/80 leading-relaxed mb-8 max-w-[540px]"
            >
              Complete anterior cervical and lumbar fixation systems combining zero-profile anterior plating stability with the flexibility to choose spike or screw fixation.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              {/* Primary CTA — teal filled */}
              <a href="#products">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1, boxShadow: "0 10px 28px rgba(42,196,244,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] cursor-pointer flex items-center gap-2 shadow-[0_6px_20px_rgba(42,196,244,0.3)]"
                >
                  <span className="text-[14px]">→</span> Explore Products
                </motion.button>
              </a>

              {/* Secondary CTA — white ghost */}
              <a href="#about">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white/10 text-white font-heading font-semibold text-[14px] px-7 py-3.5 rounded-[4px] cursor-pointer border border-white/25 backdrop-blur-sm"
                >
                  Clinical Mission
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom-right floating Play Video card ── */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex absolute bottom-8 right-8 lg:right-16 z-20 items-end gap-3"
        >
          {/* Glass card */}
          <motion.button
            onClick={() => setVideoOpen(true)}
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-[5px] px-5 py-4 text-left flex flex-col gap-2 shadow-[0_12px_32px_rgba(0,0,0,0.4)] min-w-[210px] cursor-pointer"
          >
            <p className="font-sans text-[13px] font-medium text-white leading-snug">
              Engineered for movement,<br />designed for comfort
            </p>
            <div className="flex items-center gap-2.5 mt-1">
              <div className="w-6 h-6 rounded-[3px] bg-[#2ac4f4] text-[#0a0e17] flex items-center justify-center font-bold">
                <svg fill="none" viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-current">
                  <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
                </svg>
              </div>
              <span className="font-heading text-[#7fd0ff] text-[12px] font-bold">Play Video Walkthrough</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-transparent via-[#2ac4f4] to-transparent"
          />
        </motion.div>
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
    url: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386322/El_Spine_products-7_s0qshq.jpg",
    title: "Zero-Profile Implant Architecture",
    caption: "Minimizes tissue disruption & eliminates secondary plates",
  },
  {
    url: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386330/El_Spine_products-19_zvzhgl.jpg",
    title: "Slimline™ Precision Instrumentation",
    caption: "Streamlined single-tray surgical sequence for OR efficiency",
  },
  {
    url: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386322/El_Spine_products-7_s0qshq.jpg",
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
                  Our mission is to redefine spinal fusion surgery by delivering differentiated zero-profile interbody systems that simplify procedural workflow and give surgeons meaningful fixation options.
                </p>
                
                <p className="text-[#4a5568] text-[15px] md:text-[17px] leading-relaxed">
                  By integrating fixation directly into the interbody construct, our platform is designed to streamline the surgical workflow, reduce instrument complexity, and support versatile fixation approaches across cervical and lumbar procedures.
                </p>

                {/* Pinned Image Container with Slide-in animation */}
                <div className="relative rounded-[12px] overflow-hidden border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.08)] aspect-[21/10] min-h-[260px] bg-slate-100 mt-2">
                  
                  {/* Subtle Scroll Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-[4px] text-white/70 text-[11px] font-sans tracking-wide">
                    <motion.span
                      animate={{ y: [0, 2.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[#2ac4f4] text-[12px]"
                    >
                      ↓
                    </motion.span>
                    <span>Scroll</span>
                  </div>
                <AnimatePresence>
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
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
                      <div className="bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1 rounded-[4px] font-mono text-white text-xs font-semibold shrink-0">
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
    title: "Saber-C AVIA™",
    description: "Complete anterior cervical fixation system combining a zero-profile plate construct and porous 3D printed titanium interbody with the choice of spike or screw fixation.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787014799/SaberXA_lyih36.png",
    imageClassName: "w-full h-full object-contain p-8 md:p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
    link: "/saber-c",
    cta: "Explore Saber-C AVIA",
  },
  {
    id: "saber-xa",
    tag: "FDA 510(k) Cleared",
    tagColor: "text-[#0891b2] bg-[#2ac4f4]/10 border-[#2ac4f4]/20",
    title: "Saber-XA™",
    description: "Expandable anterior lumbar interbody technology designed to provide intraoperative control of height and lordosis with integrated fixation options.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787015670/SABER_X-A_ylfzww.png",
    imageClassName: "w-full h-full object-contain p-8 md:p-16 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
    link: "/saber-xa",
    cta: "Explore Saber-XA",
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

        {/* Product Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 md:mt-10 flex items-center gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide sticky top-[80px] md:static z-40 md:z-auto bg-[#f8fafc] md:bg-transparent -mx-6 px-6 md:mx-0 md:px-0"
        >
          <button 
            onClick={() => handleSelect(0)}
            className={`shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-heading text-[14px] font-bold transition-colors shadow-sm ${activeIndex === 0 ? 'bg-[#0a0e17] text-white border-transparent' : 'bg-white border border-black/10 text-slate-500 hover:text-slate-800'}`}
          >
            <span className={`w-2 h-2 rounded-full bg-[#2ac4f4]`} />
            SABER-C™
          </button>
          
          <button 
            onClick={() => handleSelect(1)}
            className={`shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-heading text-[14px] font-bold transition-colors shadow-sm ${activeIndex === 1 ? 'bg-[#0a0e17] text-white border-transparent' : 'bg-white border border-black/10 text-slate-500 hover:text-slate-800'}`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            SABER-XA™
          </button>
        </motion.div>
      </div>

      <div className="max-w-[1420px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Content Card */}
        <div className="lg:col-span-5 bg-white border border-black/[0.06] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          {/* Progress Bars Indicators */}
          <div className="flex gap-3 mb-8 w-[180px] self-start">
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

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-5 text-left"
              >
                <div className={`inline-flex self-start items-center border rounded-[3px] px-3.5 py-1 ${activeProduct.tagColor}`}>
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
                        className="bg-[#2ac4f4]/10 border border-[#2ac4f4]/35 rounded-[4px] flex items-center gap-4 px-6 py-4 text-[#0a0e17] cursor-pointer"
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
                  <div className="mt-6 bg-slate-50 border border-black/[0.04] rounded-[8px] p-6 text-left">
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

        </div>

        {/* Right Visual Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2f6] rounded-[12px] overflow-hidden relative min-h-[340px] lg:min-h-[480px] flex items-center justify-center border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center relative"
            >
              {activeProduct.visualType === "video" ? (
                <video
                  className="w-full h-full object-cover rounded-[8px]"
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
                  className="max-h-[280px] sm:max-h-[340px] md:max-h-[390px] w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white/70 rounded-[8px] p-8 border border-dashed border-slate-300">
                  <div className="relative flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-[6px] border border-[#2ac4f4]/40 flex items-center justify-center bg-[#2ac4f4]/10 shadow-[0_0_24px_rgba(42,196,244,0.15)]">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-[#0891b2]">
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

// ─── Comparison ──────────────────────────────────────────────────────────────

function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px 0px" });

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-16 md:py-20 border-y border-black/[0.04]">
      <div className="max-w-[1280px] mx-auto">
        <RevealSection className="text-center mb-12">
          <h2 className="font-heading font-bold text-[#1a2535] text-[28px] md:text-[38px] leading-[1.15] tracking-tight max-w-[800px] mx-auto mb-4">
            <span className="text-[#2ac4f4]">Saber-C AVIA™</span> Fixation Corridor Compared To Traditional Screw Fixation
          </h2>
          <p className="font-sans text-[#64748b] text-[15px] md:text-[17px] leading-relaxed max-w-[740px] mx-auto">
            Low-profile instrumentation combined with in-line spike fixation allows Saber-C AVIA™ to be used through a small incision while allowing easier access to hard-to-reach levels of the cervical spine.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Saber-C Side */}
          <RevealSection delay={0.1} className="relative group">
            <div className="absolute inset-0 bg-[#2ac4f4]/5 rounded-[12px] scale-[1.03] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="font-heading font-bold text-[#0a0e17] text-[18px] md:text-[20px] mb-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2ac4f4]" />
                Saber-C AVIA™ In-Line Spike Fixation
              </h3>
              
              {/* Image Container with precise cropping */}
              <div className="rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 relative aspect-[16/10] sm:aspect-[16/9] mb-5 flex items-center justify-center bg-white">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386332/Saber-C-Fixation_go5mcv.png" 
                  alt="Saber-C Fixation" 
                  className="absolute w-full h-full object-cover object-center scale-[1.15] group-hover:scale-[1.20] transition-transform duration-700 ease-out" 
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-center font-heading font-bold text-[#0891b2] text-[12px]">
                <div className="flex items-center gap-1.5 bg-[#2ac4f4]/10 px-3 py-1.5 rounded-[4px]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Minimized surgical exposure
                </div>
                <div className="flex items-center gap-1.5 bg-[#2ac4f4]/10 px-3 py-1.5 rounded-[4px]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Reduced surgical steps
                </div>
                <div className="flex items-center gap-1.5 bg-[#2ac4f4]/10 px-3 py-1.5 rounded-[4px]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Less challenging
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Traditional Side */}
          <RevealSection delay={0.2} className="relative group">
            <div className="relative z-10 flex flex-col h-full opacity-80 grayscale-[0.4] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
              <h3 className="font-heading font-bold text-slate-400 group-hover:text-slate-700 text-[18px] md:text-[20px] mb-4 flex items-center justify-center gap-2 transition-colors duration-500">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                Traditional Screw Fixation
              </h3>
              
              {/* Image Container with precise cropping */}
              <div className="rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 relative aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-white">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1790386333/Traditional-Fixation_o0nuww.png" 
                  alt="Traditional Screw Fixation" 
                  className="absolute w-full h-full object-cover object-center scale-[1.15] group-hover:scale-[1.20] transition-transform duration-700 ease-out" 
                />
              </div>
            </div>
          </RevealSection>
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
    desc: "Saber-C AVIA™ and Saber-XA™ hold full FDA 510(k) clearances and are commercially available across US healthcare networks.",
    link: "Learn More",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#2ac4f4]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Zero-Profile Fixation",
    desc: "Proprietary in-line fixation integrates plate architecture directly within the interbody construct, designed to streamline the surgical workflow.",
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
              className="group bg-[#f8fafc] border border-black/[0.06] rounded-[12px] p-8 flex flex-col gap-6 cursor-default"
            >
              {/* Icon box */}
              <div className="w-14 h-14 rounded-[8px] bg-[#f0f9ff] border border-[#2ac4f4]/20 flex items-center justify-center group-hover:bg-[#2ac4f4]/10 transition-colors duration-300">
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
            className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[15px] px-10 py-4 rounded-[4px] flex items-center gap-3 shadow-[0_8px_28px_rgba(42,196,244,0.25)]"
          >
            → Explore All Products
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Portal ───────────────────────────────────────────────────────────────────

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
      className="relative min-h-[640px] flex items-center overflow-hidden bg-[#0a0e17] py-20 md:py-28"
    >
      {/* Dark gradient radial glow accents matching Partners page */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#2ac4f4] opacity-[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0284c7] opacity-[0.05] blur-[130px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

        {/* ── Left: Info card ──────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 flex flex-col justify-between gap-8 bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-[8px] p-8 md:p-12 shadow-2xl"
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
              className="font-heading font-bold text-white text-[32px] md:text-[44px] leading-[1.1] tracking-tight mb-4"
            >
              Technical & Clinical<br />Resource Portal
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-[15px] md:text-[16px] leading-relaxed max-w-[480px]">
              Authorized distributors, sales representatives, and surgical staff can access verified IFUs, surgical technique guides, clinical trial data, and marketing collateral.
            </motion.p>
          </div>

          {/* Resource list */}
          <motion.div variants={stagger} className="flex flex-col gap-4">
            {resources.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 cursor-default group"
              >
                <div className="flex items-center justify-center w-[44px] h-[44px] shrink-0 rounded-[4px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30">
                  <svg fill="none" viewBox={item.vb} style={{ width: item.w * 0.7, height: item.h * 0.7 }}>
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
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/resources"
              className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-3.5 rounded-[4px] flex items-center gap-2 shadow-[0_6px_20px_rgba(42,196,244,0.3)] hover:bg-[#6ecff4] transition-all"
            >
              → Browse Resource Library
            </Link>
            <Link
              to="/login"
              className="border border-white/20 text-white font-heading font-semibold text-[14px] px-7 py-3.5 rounded-[4px] bg-white/5 hover:bg-white/10 transition-colors"
            >
              Portal Login
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right: Login form card ────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full lg:max-w-[440px] shrink-0 flex flex-col justify-center"
        >
          <div className="relative overflow-hidden rounded-[8px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-2xl p-8 md:p-10">
            {/* Top Cyan Accent */}
            <div className="h-[3px] absolute top-0 left-0 right-0 bg-[#2ac4f4]" />

            <h3 className="font-heading font-bold text-white text-[26px] md:text-[28px] tracking-tight mb-1">
              Portal Access
            </h3>
            <p className="text-white/60 text-[14px] mb-8">Sign in with your verified credentials.</p>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-white/60 text-[11px] tracking-widest uppercase font-semibold">
                  Institution or Rep Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@hospital.org"
                  className="rounded-[4px] px-4 py-3 text-[14px] placeholder-white/30 text-white font-sans bg-white/5 border border-white/15 focus:outline-none focus:border-[#2ac4f4] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-white/60 text-[11px] tracking-widest uppercase font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="rounded-[4px] px-4 py-3 text-[14px] placeholder-white/30 text-white font-sans bg-white/5 border border-white/15 focus:outline-none focus:border-[#2ac4f4] transition-colors"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-1">
                <Link
                  to="/partners"
                  className="font-heading text-white/60 hover:text-[#2ac4f4] text-[13px] font-medium transition-colors"
                >
                  Request access →
                </Link>
                <Link
                  to="/login"
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[13px] px-6 py-2.5 rounded-[4px] shadow-[0_4px_16px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer"
                >
                  Sign In
                </Link>
              </div>
            </form>
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
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386335/Trailing_teg7cn.png",
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
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386337/Implant-Loading_clhza9.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#2ac4f4] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "Step 03",
    title: "In-line Insertion",
    desc: "Deliver the implant into the disc space using a direct anterior approach. The low-profile inserter allows maximum visibility.",
    bgColor: "bg-[#0f2847] text-white shadow-[0_20px_50px_rgba(15,40,71,0.4)]",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386338/In-Line-Insertion_tiklge.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#6ecff4] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>
    ),
  },
  {
    step: "Step 04",
    title: "Rigid Screw Fixation",
    desc: "Secure the zero-profile implant onto the inserter. The integrated fixation elements remain shielded during delivery.",
    bgColor: "bg-[#060c18] text-[#e2e8f0] shadow-[0_20px_50px_rgba(6,12,24,0.4)]",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386341/Rigid-Screw-Fixation_syjyn0.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-[#0a0e17] mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v < 0.25) setActiveIdx(0);
      else if (v < 0.5) setActiveIdx(1);
      else if (v < 0.75) setActiveIdx(2);
      else setActiveIdx(3);
    });
  }, [scrollYProgress]);

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
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Column: Stacking Cards */}
          <div className="lg:col-span-6 flex flex-col gap-8 lg:gap-12 pb-16 lg:pb-32">
            {workflowSteps.map((s, idx) => (
              <div
                key={idx}
                className={`relative lg:sticky rounded-[12px] lg:rounded-[14px] p-6 sm:p-8 md:p-12 min-h-[auto] lg:min-h-[380px] flex flex-col justify-between transition-all duration-300 lg:top-[var(--top-offset)] ${s.bgColor}`}
                style={{
                  '--top-offset': `${140 + idx * 28}px`,
                  zIndex: idx + 10,
                } as any}
              >
                <div>
                  <span className="font-mono text-[12px] uppercase tracking-[2px] opacity-60 block mb-6">
                    {s.step}
                  </span>
                  {s.icon}

                  {/* MOBILE IMAGE - Hidden on Desktop */}
                  <div className="block lg:hidden w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-8 shadow-lg">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>

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
            <div className="rounded-[14px] overflow-hidden border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)] bg-white aspect-[4/3] relative flex items-center justify-center">
              <AnimatePresence>
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={workflowSteps[activeIdx].image}
                    alt={workflowSteps[activeIdx].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Bottom stats indicators placed below the video */}
            <div className="flex flex-wrap justify-end gap-3 mt-6 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-md border border-[rgba(42,196,244,0.3)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-[9px] px-5 py-3.5 flex flex-col items-center justify-center min-w-[105px]">
                <span className="font-heading font-bold text-[#2ac4f4] text-[22px] leading-none">55%</span>
                <span className="font-heading text-[#64748b] text-[9px] tracking-widest mt-1">Porous Architecture</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-[rgba(42,196,244,0.3)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-[9px] px-5 py-3.5 flex flex-col items-center justify-center min-w-[105px]">
                <span className="font-heading font-bold text-[#2ac4f4] text-[22px] leading-none">2</span>
                <span className="font-heading text-[#64748b] text-[9px] tracking-widest mt-1">Fixation Options</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-[rgba(42,196,244,0.3)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-[9px] px-5 py-3.5 flex flex-col items-center justify-center min-w-[105px]">
                <span className="font-heading font-bold text-[#2ac4f4] text-[22px] leading-none">2</span>
                <span className="font-heading text-[#64748b] text-[9px] tracking-widest mt-1">Footprints</span>
              </div>
              <div className="bg-[#2ac4f4]/95 text-[#0a0e17] shadow-[0_8px_24px_rgba(42,196,244,0.2)] rounded-[9px] px-5 py-3.5 flex flex-col items-center justify-center min-w-[105px]">
                <span className="font-heading font-bold text-[22px] leading-none">6°/12°</span>
                <span className="font-heading text-[9px] tracking-widest mt-1 uppercase">Lordotic Options</span>
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
      <ComparisonSection />
      <WorkflowSection />
      <FeaturesSection />
      <PortalSection />
    </>
  );
}
