import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Download,
  CheckCircle2,
  ChevronRight,
  FileText,
  PlayCircle,
  ClipboardList,
  ExternalLink,
  Lock,
  BookOpen,
  Wrench
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SaberCDetail() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setShowDemoModal(false);
      triggerToast("Request received. An Elevation Spine representative will contact you.");
    }, 1500);
  };

  return (
    <div className="bg-[#070b14] text-white min-h-screen font-sans selection:bg-[#2ac4f4] selection:text-[#070b14]">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#0a0e17] text-white px-6 py-3.5 rounded-[8px] shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2ac4f4]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo / Info Request Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0e17] border border-white/10 p-8 rounded-[12px] w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg" 
                  alt="Saber-C AVIA" 
                  className="h-6 w-auto object-contain opacity-90"
                />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">Request Product Information</h3>
              <p className="text-white/60 text-sm mb-6">Learn more about Saber-C AVIA™ for your practice.</p>
              
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1">First Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1">Last Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Organization</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="Hospital / Practice" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="jane@hospital.com" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowDemoModal(false)} className="flex-1 px-4 py-3 rounded-[4px] border border-white/10 text-white/70 hover:bg-white/5 transition-colors font-medium text-sm cursor-pointer">Cancel</button>
                  <button type="submit" disabled={demoSubmitted} className="flex-1 px-4 py-3 rounded-[4px] bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#1aafde] transition-colors font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
                    {demoSubmitted ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-[#0a0e17] border-t-transparent rounded-full" /> : "Submit Request"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ac4f4]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl flex flex-col items-center">
            
            {/* Product Logo Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-[6px] bg-white/[0.04] border border-[#2ac4f4]/30 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <img
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg"
                  alt="Saber-C AVIA™"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                />
              </div>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-heading font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              Zero profile. Zero compromises.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ac4f4] to-[#7fd0ff]">One tray.</span>
            </motion.h1>
            
            {/* Supporting copy */}
            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
              A complete anterior cervical fixation system combining porous 3D printed titanium, plate-level stability, and the choice of spike or screw fixation.
            </motion.p>

            {/* Key callout */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-[6px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/25">
                <span className="font-mono text-[#2ac4f4] text-xs sm:text-sm tracking-[2px] font-bold uppercase">
                  One System · Two Fixation Options · One Tray
                </span>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer">
                Request Product Information <ChevronRight className="w-4 h-4" />
              </button>
              <Link 
                to="/resources"
                className="bg-white/10 text-white font-heading font-semibold text-[14px] px-7 py-4 rounded-[4px] border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#2ac4f4]" />
                View Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: PLATFORM OVERVIEW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] relative border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Platform Overview</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Every case is different. Saber-C AVIA is built for that reality.
            </h2>
            <p className="text-[#94a3b8] text-lg md:text-xl leading-relaxed">
              Cervical anatomy, surgical preferences, and fusion goals vary. Saber-C AVIA brings meaningful flexibility into one platform through a zero-profile plate construct, spike or screw fixation, multiple lordotic options, and a porous titanium interbody engineered to support bone integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: ZERO-PROFILE CONSTRUCT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Zero-Profile Design</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-snug">
                Zero-profile construct with plate-level integrity.
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Saber-C AVIA combines an anterior cervical plate and interbody within a zero-profile construct designed to sit flush with the vertebral body.
              </p>
              <ul className="space-y-4">
                {[
                  "Implant sits flush with the vertebral body",
                  "Combines anterior cervical plate, interbody, and fixation",
                  "Low-profile design can help address difficult cervical levels and procedures involving adjacent hardware"
                ].map((pt, i) => (
                  <li key={i} className="flex gap-3 text-white/70 text-[15px] leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden border border-white/10 bg-black flex items-center justify-center p-8">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787014799/SaberXA_lyih36.png" 
                  alt="Saber-C AVIA™ Zero-Profile Construct" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-[10px] text-[#2ac4f4] uppercase tracking-widest font-semibold">Saber-C AVIA™ Zero-Profile Fixation Construct</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: FIXATION FLEXIBILITY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Fixation Flexibility</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto">
              Spike or screw. Choose what works for the case.
            </h2>
          </motion.div>

          {/* Spike & Screw side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Spike option */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white/[0.02] border border-white/10 rounded-[12px] p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2ac4f4] to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-[#2ac4f4]" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Spike Fixation</h3>
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed mb-4">
                Preloaded inline Saber spikes provide a streamlined, single step fixation workflow. Standard and long spike options are available.
              </p>
              {/* Spike disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-[6px] p-4 mt-4">
                <p className="text-amber-400/90 text-xs leading-relaxed font-medium flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  When Saber-C AVIA™ is used with spikes, supplemental fixation is required.
                </p>
              </div>
            </motion.div>

            {/* Screw option */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-[12px] p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-[#2ac4f4]" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-[#2ac4f4]" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Screw Fixation</h3>
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed">
                Straight and angled instrumentation supports screw fixation when screws better fit the surgeon's technique, surgical goals, or patient anatomy.
              </p>
            </motion.div>
          </div>

          {/* Closing line */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center text-[#2ac4f4] font-heading font-semibold text-lg mb-20">
            Both fixation options are supported within the AVIA system without changing platforms.
          </motion.p>

          {/* Fixation Corridor Comparison */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-white/[0.02] border border-white/10 rounded-[12px] p-10 md:p-14"
          >
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Fixation Corridor</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">A More Direct Fixation Corridor</h3>
            <p className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-2xl">
              Low-profile instrumentation and inline spike deployment are designed to support access through a smaller working corridor, including difficult to reach cervical levels.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                "Inline deployment",
                "Reduced instrument angulation",
                "Streamlined access to difficult levels"
              ].map((callout, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#2ac4f4]/5 border border-[#2ac4f4]/15 rounded-[6px] px-5 py-4">
                  <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{callout}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: POROUS TITANIUM ARCHITECTURE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative border-b border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Porous Titanium</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-snug">
                Engineered for osseointegration.
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                The Saber-C AVIA interbody features a 3D printed porous titanium lattice with 55% porosity. The architecture is engineered to support blood and marrow infiltration at the implant interface and provide pathways for bone ingrowth into the porous domains.
              </p>

              {/* Published preclinical evidence */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[8px] p-6 mb-6">
                <p className="font-mono text-[10px] text-[#2ac4f4] uppercase tracking-widest font-bold mb-3">Published Preclinical Evidence</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  A peer reviewed study by Walsh et al. in <em>NASSJ</em> evaluated porous titanium and 3D printed PEEK implants in a validated ovine interbody fusion model at 8 and 16 weeks.
                </p>
                <ul className="space-y-3">
                  {[
                    "Greater bone formation within the porous titanium walls compared with 3D printed PEEK at 8 and 16 weeks",
                    "Histologic evidence of bone ingrowth within the porous titanium domains",
                    "Continued fusion progression from 8 to 16 weeks"
                  ].map((finding, i) => (
                    <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4] mt-2 shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/15 rounded-[6px] p-4">
                <p className="text-amber-400/70 text-xs italic leading-relaxed">
                  These findings are based on preclinical (animal) data and may not be predictive of clinical outcomes in humans. Reference: Walsh et al., NASSJ 2025.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col gap-6">
              {/* Porous lattice visual */}
              <div className="relative aspect-square rounded-[12px] overflow-hidden border border-white/10 bg-black flex items-center justify-center p-8">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787014799/SaberXA_lyih36.png" 
                  alt="Saber-C AVIA™ Porous Titanium Architecture" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-[10px] text-[#2ac4f4] uppercase tracking-widest font-semibold">55% Porous Titanium Architecture</p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 rounded-[8px] p-5 text-center">
                  <span className="font-heading font-bold text-[#2ac4f4] text-3xl">55%</span>
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mt-1">Porosity</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-[8px] p-5 text-center">
                  <span className="font-heading font-bold text-white text-3xl">3D</span>
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mt-1">Printed Titanium</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: PRODUCT RANGE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Product Range</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Meaningful options in one complete platform.</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">
              Saber-C AVIA is designed to give surgeons greater flexibility without requiring a change in implant platform when anatomy, lordotic goals, or fixation preferences vary.
            </p>
          </motion.div>

          {/* Specifications Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="bg-white/[0.02] border border-white/10 rounded-[12px] overflow-hidden">
              <table className="w-full text-left">
                <tbody className="divide-y divide-white/10">
                  {[
                    { label: "Footprints", value: "12 × 15 mm  ·  14 × 17 mm" },
                    { label: "Heights", value: "5, 6, 7, 8, 9 mm" },
                    { label: "Lordosis", value: "6°  ·  12° (12° available in 6–9 mm heights only)" },
                    { label: "Spike Fixation", value: "Standard  ·  Long" },
                    { label: "Screw Lengths", value: "12, 14, 16, 18, 20 mm" },
                    { label: "Material", value: "3D printed porous titanium" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <th className="py-5 px-6 md:px-8 font-heading text-white/50 font-medium w-1/3 text-sm">{row.label}</th>
                      <td className="py-5 px-6 md:px-8 font-sans text-white text-[15px]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: REFINED INSTRUMENTATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Instrumentation</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Refined instrumentation. Streamlined workflow.</h2>
            <p className="text-[#94a3b8] text-lg leading-relaxed max-w-2xl">
              Saber-C AVIA introduces a redesigned, lower profile instrumentation set developed to support efficient implant delivery and both spike and screw fixation workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Lower profile instrumentation",
              "Preloaded inline spike deployment",
              "Straight and angled screw instrumentation",
              "Dedicated low-profile screw inserter",
              "Spike and screw options within one system"
            ].map((callout, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-[8px] px-6 py-5 hover:bg-white/[0.04] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0" />
                <span className="text-white/80 text-sm font-medium">{callout}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: RESOURCES & FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2ac4f4]/5" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Resources */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">Product Resources</h2>
              
              {/* Public Resources */}
              <p className="font-mono text-[#2ac4f4] text-[10px] tracking-[2px] font-bold uppercase mb-4">Public Resources</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { title: "Saber-C AVIA™ Brochure", icon: <FileText className="w-5 h-5" />, access: "Download" },
                  { title: "System Overview", icon: <BookOpen className="w-5 h-5" />, access: "Download" },
                  { title: "Published Porous Titanium Study", icon: <ExternalLink className="w-5 h-5" />, access: "View Publication" },
                  { title: "Product Animation", icon: <PlayCircle className="w-5 h-5" />, access: "Watch" },
                ].map((resource, i) => (
                  <button 
                    key={i}
                    onClick={() => triggerToast(`Accessing ${resource.title}...`)}
                    className="flex items-center gap-3 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 p-4 rounded-[6px] transition-all group text-left cursor-pointer hover:bg-[#2ac4f4]/20"
                  >
                    <div className="w-10 h-10 rounded-[4px] bg-[#2ac4f4]/15 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform shrink-0">
                      {resource.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs text-white truncate">{resource.title}</h4>
                      <p className="text-[10px] text-[#2ac4f4] font-mono font-semibold">{resource.access}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Professional Portal Resources */}
              <p className="font-mono text-white/40 text-[10px] tracking-[2px] font-bold uppercase mb-4">Professional Portal</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Surgical Technique Guide", icon: <ClipboardList className="w-5 h-5" /> },
                  { title: "Instructions for Use", icon: <Download className="w-5 h-5" /> },
                  { title: "Training Materials", icon: <BookOpen className="w-5 h-5" /> },
                  { title: "Tips and Tricks", icon: <FileText className="w-5 h-5" /> },
                ].map((resource, i) => (
                  <Link 
                    key={i}
                    to="/resources"
                    className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/40 p-4 rounded-[6px] transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-[4px] bg-white/5 flex items-center justify-center text-white/50 group-hover:scale-110 transition-transform shrink-0">
                      {resource.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs text-white truncate">{resource.title}</h4>
                      <p className="text-[10px] text-white/40 flex items-center gap-1"><Lock className="w-3 h-3" /> Portal Access</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-[#0a0e17] border border-white/10 rounded-[8px] p-10 flex flex-col justify-between shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg" 
                  alt="Saber-C AVIA™" 
                  className="h-8 md:h-10 w-auto object-contain mb-6 opacity-95 drop-shadow-[0_4px_12px_rgba(42,196,244,0.25)]"
                />
                <h2 className="font-heading text-3xl font-bold mb-4">Learn More About Saber-C AVIA</h2>
                <p className="text-white/60 mb-8 max-w-sm">Connect with our team to learn how Saber-C AVIA can support your practice.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
                  <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-bold px-8 py-3.5 rounded-[4px] hover:bg-[#6ecff4] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    Request Information
                  </button>
                  <Link to="/resources" className="bg-white/10 text-white border border-white/20 font-bold px-8 py-3.5 rounded-[4px] hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    Access Product Resources
                  </Link>
                </div>
              </div>

              {/* Required disclaimer */}
              <div className="border-t border-white/10 pt-6 mt-auto">
                <p className="text-white/30 text-[11px] leading-relaxed">
                  When Saber-C AVIA™ is used with spikes, supplemental fixation is required. Please refer to the Instructions for Use for a complete list of indications, contraindications, warnings, and precautions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
