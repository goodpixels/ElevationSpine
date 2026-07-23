import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Maximize2
} from "lucide-react";

export interface Hotspot {
  id: string;
  number: string;
  title: string;
  tag: string;
  badge: string;
  x: number; // percentage
  y: number; // percentage
  shortDesc: string;
  description: string;
  specs: { label: string; value: string }[];
  highlightColor: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "spikes",
    number: "01",
    title: "Spikes or Screws",
    tag: "PRIMARY ANCHORING",
    badge: "Ti-6Al-4V ELI Grade 23",
    x: 37,
    y: 42,
    shortDesc: "Offers in-line fixation via pre-loaded titanium spikes or self-drilling screws.",
    description:
      "Offers in-line fixation via pre-loaded titanium spikes or self-drilling screws. Designed to secure into cortical endplates without requiring standard anterior plate overhang.",
    specs: [
      { label: "Material", value: "Ti-6Al-4V ELI Grade 23" },
      { label: "Fixation Options", value: "Standard/Long Spikes | Screws (12–20mm)" },
      { label: "Deployment", value: "In-line single-step deployment" },
    ],
    highlightColor: "#2ac4f4",
  },
  {
    id: "spacer",
    number: "02",
    title: "PorOss™ 3D Titanium Interbody",
    tag: "BIO-FUSION MATRIX",
    badge: "55% Porous Lattice",
    x: 50,
    y: 48,
    shortDesc: "3D-printed titanium structure featuring a 55% porous lattice for osteointegration.",
    description:
      "3D-printed titanium structure featuring a 55% porous lattice designed to mimic trabecular bone structure, supporting fluid wicking and osteointegration while maintaining imaging transparency.",
    specs: [
      { label: "Porosity", value: "55% Interconnected Lattice" },
      { label: "Modulus", value: "Engineered to match cancellous bone" },
      { label: "Imaging", value: "Reduced artifact under Fluoroscopy & CT" },
    ],
    highlightColor: "#38bdf8",
  },
  {
    id: "fins",
    number: "03",
    title: "Anti-Migration Surface Geometry",
    tag: "PRIMARY STABILITY",
    badge: "Dual Endplate Contact",
    x: 66,
    y: 54,
    shortDesc: "Textured surface geometry providing immediate mechanical friction upon insertion.",
    description:
      "Textured surface geometry and lateral stabilization features provide immediate mechanical friction upon insertion, resisting rotational displacement prior to fusion.",
    specs: [
      { label: "Engagement", value: "Dual Endplate Contact" },
      { label: "Resistance", value: "High Shear & Torsional Stability" },
      { label: "Footprints", value: "12x15mm & 14x17mm" },
    ],
    highlightColor: "#0ea5e9",
  },
  {
    id: "plate",
    number: "04",
    title: "Anterior Cervical Plate",
    tag: "ZERO-PROFILE FRAME",
    badge: "0.0mm Anterior Protrusion",
    x: 34,
    y: 62,
    shortDesc: "Integrated structural faceplate engineered to sit completely flush with vertebral wall.",
    description:
      "Integrated structural faceplate engineered to sit completely flush with the anterior cervical vertebral wall, minimizing esophageal contact and reducing post-op dysphagia risk.",
    specs: [
      { label: "Profile", value: "0.0mm Anterior Protrusion" },
      { label: "Lordosis", value: "6° & 12° options" },
      { label: "Heights", value: "5mm to 9mm" },
    ],
    highlightColor: "#60a5fa",
  },
  {
    id: "locking",
    number: "05",
    title: "Integrated Locking Plate",
    tag: "ANTI-BACKOUT RETENTION",
    badge: "Tactile Anti-Backout Lock",
    x: 62,
    y: 65,
    shortDesc: "Central locking tab system providing tactile and visual confirmation when engaged.",
    description:
      "Central locking tab system providing tactile and visual confirmation when engaged. Prevents post-operative screw or spike backout.",
    specs: [
      { label: "Mechanism", value: "Tactile Anti-Backout Lock" },
      { label: "Feedback", value: "Visual & Tactile Engagement" },
      { label: "Revision", value: "Intraoperatively Revision-Ready" },
    ],
    highlightColor: "#3b82f6",
  },
];

export default function SaberCHotspotViewer() {
  const [activeId, setActiveId] = useState<string>("spikes");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(true);

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];
  const displayedHotspot = HOTSPOTS.find((h) => h.id === (hoveredId || activeId)) || activeHotspot;

  // Auto-tour timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = HOTSPOTS.findIndex((h) => h.id === prev);
        const nextIndex = (currentIndex + 1) % HOTSPOTS.length;
        return HOTSPOTS[nextIndex].id;
      });
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full bg-gradient-to-b from-[#080d1a] via-[#0b1329] to-[#080d1a] rounded-[32px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden text-white my-8 p-6 md:p-10 font-sans relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2ac4f4]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#0ea5e9]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 rounded-full px-3.5 py-1 text-xs font-mono text-[#7fd0ff] mb-2 uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#2ac4f4]" />
            Interactive Engineering Inspection
          </div>
          <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            SABER-C™ <span className="text-[#2ac4f4]">Construct Breakdown</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base mt-1 max-w-2xl">
            Click or hover over the highlighted points on the construct image to inspect key anatomical features, biomaterial specs, and fixation mechanics.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 self-start md:self-center shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-300 border ${
              isPlaying
                ? "bg-[#2ac4f4] text-[#0a0e17] border-[#2ac4f4] shadow-[0_0_20px_rgba(42,196,244,0.4)]"
                : "bg-white/5 hover:bg-white/10 text-white border-white/15"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Pause Tour" : "Auto Tour"}
          </button>

          <button
            onClick={() => setShowAllLabels(!showAllLabels)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all duration-300"
          >
            <Activity className="w-3.5 h-3.5 text-[#2ac4f4]" />
            {showAllLabels ? "Hide Pins" : "Show Pins"}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Detailed Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left / Top: Interactive Image Viewport */}
        <div className="lg:col-span-7 relative group rounded-2xl bg-[#050811]/70 border border-white/10 p-4 md:p-8 md:pb-24 flex items-center justify-center overflow-hidden min-h-[320px] md:min-h-[460px]">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Main Image Container - Size precisely to the image to ensure accurate point placement */}
          <div className="relative w-full max-w-[640px] select-none flex items-center justify-center scale-[1.38] md:scale-[1.45] transition-transform duration-500 origin-center -mt-6 md:-mt-28">
            <motion.img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784688640/Saber-C_BEAUTY-01-Implant_Contruct_Spikes_ISO_dnjphd.png"
              alt="Saber-C Implant Construct ISO View"
              className="w-full h-auto block filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />

            {/* Hotspot Points Overlay */}
            {showAllLabels &&
              HOTSPOTS.map((spot) => {
                const highlightedId = hoveredId || activeId;
                const isFocused = highlightedId === spot.id;

                return (
                  <div
                    key={spot.id}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group/pin"
                    onMouseEnter={() => {
                      setHoveredId(spot.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null);
                    }}
                    onClick={() => {
                      setActiveId(spot.id);
                      setIsPlaying(false);
                    }}
                  >
                    {/* Concentric Pulsing Ring */}
                    <div className="relative flex items-center justify-center">
                      {isFocused && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
                          className="absolute w-8 h-8 rounded-full border-2 border-[#2ac4f4] pointer-events-none"
                        />
                      )}

                      {/* Interactive Pin Core */}
                      <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          scale: isFocused ? 1.2 : 1,
                          boxShadow: isFocused
                            ? "0 0 25px rgba(42,196,244,0.9), 0 0 10px rgba(255,255,255,0.8)"
                            : "0 0 12px rgba(42,196,244,0.4)",
                        }}
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border ${
                          isFocused
                            ? "bg-[#2ac4f4] text-[#0a0e17] border-white font-extrabold"
                            : "bg-[#0a0e17]/90 text-white border-[#2ac4f4]/70 hover:bg-[#2ac4f4] hover:text-[#0a0e17]"
                        }`}
                      >
                        {/* 20px plus icon for better centering */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </motion.button>

                      {/* Tooltip Label Tag on Focus */}
                      <AnimatePresence>
                        {isFocused && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-40 pointer-events-none"
                          >
                            <div className="bg-[#0a0e17]/95 backdrop-blur-xl border border-[#2ac4f4]/50 shadow-[0_10px_25px_rgba(0,0,0,0.7)] px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#2ac4f4] animate-pulse" />
                              <span className="font-heading text-xs font-bold text-white tracking-wide">
                                {spot.title}
                              </span>
                            </div>
                            {/* Down arrow */}
                            <div className="w-2 h-2 bg-[#0a0e17] border-r border-b border-[#2ac4f4]/50 rotate-45 mx-auto -mt-1" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Quick Hotspot Chips below canvas */}
          <div className="hidden md:flex absolute bottom-6 md:bottom-8 left-4 right-4 items-center justify-center flex-wrap gap-2 z-20">
            {HOTSPOTS.map((spot) => {
              const highlightedId = hoveredId || activeId;
              const isHighlighted = highlightedId === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => {
                    setActiveId(spot.id);
                    setIsPlaying(false);
                  }}
                  onMouseEnter={() => setHoveredId(spot.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-300 border flex items-center gap-1.5 ${
                    isHighlighted
                      ? "bg-[#2ac4f4] text-[#0a0e17] border-[#2ac4f4] font-bold shadow-[0_0_15px_rgba(42,196,244,0.4)]"
                      : "bg-[#0a0e17]/80 hover:bg-white/10 text-white/70 border-white/10"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{spot.number}</span>
                  <span>{spot.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / Bottom: Detailed Feature Info Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayedHotspot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            >
              {/* Highlight accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2ac4f4] via-[#60a5fa] to-[#38bdf8]" />

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#2ac4f4] text-xs font-bold bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 px-2.5 py-1 rounded-lg">
                      POINT {displayedHotspot.number}
                    </span>
                    <span className="text-xs font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      {displayedHotspot.badge}
                    </span>
                  </div>
                  <span className="text-xs font-heading font-semibold text-[#7fd0ff] tracking-wider uppercase">
                    {displayedHotspot.tag}
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                  {displayedHotspot.title}
                </h3>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                  {displayedHotspot.description}
                </p>

                {/* Specs List */}
                <div className="space-y-3 bg-black/30 border border-white/5 rounded-xl p-4 mb-6">
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 font-semibold">
                    Technical Specifications
                  </div>
                  {displayedHotspot.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-xs md:text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
                      <span className="text-white/60 font-heading">{spec.label}</span>
                      <span className="font-mono font-semibold text-[#2ac4f4]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="w-4 h-4 text-[#2ac4f4]" />
                  <span>FDA 510(k) Cleared Fixation System</span>
                </div>
                <button
                  onClick={() => alert(`Inquiring about ${displayedHotspot.title} technology...`)}
                  className="font-heading text-xs font-semibold text-[#2ac4f4] hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Tech Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
