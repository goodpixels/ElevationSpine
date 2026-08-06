import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll } from "motion/react";
import {
  ShieldAlert,
  Download,
  Send,
  Layers,
  Zap,
  Activity,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  FileText,
  PlayCircle,
  ClipboardList
} from "lucide-react";
import { TextRevealTitle } from "./App.tsx";

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
      triggerToast("Demo request received! An Elevation Spine specialist will contact you.");
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
            className="fixed top-24 right-6 z-50 bg-[#0a0e17] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2ac4f4]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Modal */}
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
              className="bg-[#0a0e17] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-heading font-bold mb-2">Request a Demo</h3>
              <p className="text-white/60 text-sm mb-6">See how SABER-C® AVIA™ can streamline your OR workflow.</p>
              
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="Dr. Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Hospital / Clinic</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="General Hospital" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="jane@hospital.com" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowDemoModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors font-medium text-sm">Cancel</button>
                  <button type="submit" disabled={demoSubmitted} className="flex-1 px-4 py-3 rounded-xl bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#1aafde] transition-colors font-bold text-sm flex items-center justify-center gap-2">
                    {demoSubmitted ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-[#0a0e17] border-t-transparent rounded-full" /> : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ac4f4]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center border border-[#2ac4f4]/30 rounded-full px-4 py-1.5 mb-8 bg-[#2ac4f4]/10">
              <span className="font-mono font-medium text-[12px] tracking-widest uppercase text-[#2ac4f4]">
                SABER-C® AVIA™
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-heading font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8">
              Complete. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">By Design.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Anterior cervical fixation shouldn't require multiple trays. Saber-C AVIA combines zero-profile plate stability with complete fixation flexibility—spike or screw options in one instrument set. Surgeons decide fixation in the OR, not before surgery.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#1aafde] transition-all hover:scale-105 flex items-center gap-2">
                Request Demo <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Problem It Solves & Section 2: The AVIA Solution */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] relative">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* The Problem */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-10 md:p-14"
            >
              <h3 className="font-heading text-3xl font-bold mb-6 text-white/90">The Problem</h3>
              <ul className="space-y-6">
                {[
                  "Anterior cervical fixation typically requires multiple instrument trays",
                  "Surgeons must choose fixation approach pre-op",
                  "Tray switching creates OR inefficiency"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span className="text-white/70 text-lg leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* The AVIA Solution */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#2ac4f4]/5 border border-[#2ac4f4]/20 rounded-[32px] p-10 md:p-14 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#2ac4f4]/10 rounded-full blur-3xl" />
              <h3 className="font-heading text-3xl font-bold mb-6 text-white">The AVIA Solution</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  "One tray with complete fixation options",
                  "Spike fixation pre-loaded and ready",
                  "Screw fixation instrumentation included",
                  "Decide fixation strategy in the OR based on anatomy"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#2ac4f4] shrink-0 mt-0.5" />
                    <span className="text-white/90 text-lg leading-snug font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: The Platform (3-Column Feature Blocks) */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">The Platform</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">A unified approach to anterior cervical fusion.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8 text-[#2ac4f4]" />,
                title: "Zero-Profile Construct",
                points: ["Anterior cervical plate with stability", "Supported biomechanical performance of traditional plating", "Streamlined zero-profile design"]
              },
              {
                icon: <Activity className="w-8 h-8 text-[#2ac4f4]" />,
                title: "Fixation Options",
                points: ["Pre-loaded in-line Saber spikes (standard and long)", "Straight and angled screw instrumentation", "Dedicated low-profile screw inserter", "Both available without tray switch"]
              },
              {
                icon: <Zap className="w-8 h-8 text-[#2ac4f4]" />,
                title: "Advanced Implant",
                points: ["3D-printed porous titanium body", "Lattice engineered to mirror trabecular bone", "Supports bone and marrow infiltration", "Peer-reviewed science behind material choice"]
              }
            ].map((col, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-[24px] p-8 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center mb-6">
                  {col.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-6">{col.title}</h3>
                <ul className="space-y-4">
                  {col.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4] mt-1.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: The Implant Built for Fusion */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] border-t border-white/5 overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2 w-full">
            <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <img src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568424/Saber-C_TECH-17-Spike_Deployment_Flush_ytsoeh.png" alt="Porous titanium lattice" className="w-[120%] h-[120%] object-contain opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Willis Render: Porous Titanium Lattice</p>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:w-1/2 w-full">
            <h2 className="font-heading text-4xl font-bold mb-6">The Implant Built for Fusion</h2>
            <p className="text-lg text-white/70 mb-8">
              Engineered from the ground up to support osseointegration, trabecular simulation, and optimal bone support.
            </p>
            <div className="space-y-6 mb-10">
              {['Osseointegration', 'Trabecular simulation', 'Bone support'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <CheckCircle2 className="text-[#2ac4f4] w-5 h-5" />
                  <span className="text-xl font-heading">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-sm text-white/50 italic">
                *Reference: Walsh et al., NASSJ 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Specifications Table */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 relative">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-[#94a3b8]">Precision engineered to fit patient anatomy.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/10">
                {[
                  { label: "Footprints", value: "12×15mm, 14×17mm" },
                  { label: "Heights", value: "5-9mm" },
                  { label: "Lordosis", value: "6° and 12°" },
                  { label: "Material", value: "3D-printed porous titanium" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <th className="py-6 px-8 font-heading text-white/60 font-medium w-1/3">{row.label}</th>
                    <td className="py-6 px-8 font-sans text-white text-lg">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: In-OR Workflow */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-16">In-OR Workflow Efficiency</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2ac4f4]/30 to-transparent -z-10" />
            
            {[
              { num: "01", title: "Single Tray Setup", desc: "One tray eliminates switching and streamlines instrumentation setup." },
              { num: "02", title: "Intra-operative Decision", desc: "Sequence showing fixation decision flexibility right in the OR." },
              { num: "03", title: "Time/Efficiency", desc: "No instrument switching means faster procedures and reduced time under anesthesia." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#0a0e17] border border-white/10 p-8 rounded-3xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#2ac4f4] text-[#0a0e17] font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(42,196,244,0.4)]">
                  {step.num}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Surgical Resources & Section 8: CTA */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2ac4f4]/5" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Section 7: Surgical Resources */}
            <div>
              <h2 className="font-heading text-4xl font-bold mb-8">Surgical Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <FileText />, title: "Technique Guide", subtitle: "Spike Fixation" },
                  { icon: <FileText />, title: "Technique Guide", subtitle: "Screw Fixation" },
                  { icon: <PlayCircle />, title: "Surgical Video", subtitle: "Full Walkthrough" },
                  { icon: <ClipboardList />, title: "Instrumentation", subtitle: "Checklist" },
                ].map((res, i) => (
                  <button key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-xl transition-all group text-left">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                      {res.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">{res.title}</h4>
                      <p className="text-xs text-white/50">{res.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 8: CTA */}
            <div className="bg-[#0a0e17] border border-white/10 rounded-[32px] p-10 flex flex-col justify-center text-center items-center shadow-2xl">
              <h2 className="font-heading text-3xl font-bold mb-4">Ready to Elevate Your Practice?</h2>
              <p className="text-white/60 mb-8 max-w-sm">Experience the SABER-C® AVIA™ difference with a comprehensive product demonstration.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-bold px-8 py-4 rounded-full hover:bg-[#1aafde] transition-colors flex items-center justify-center gap-2">
                  Request Demo
                </button>
                <Link to="/contact" className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  Contact Support
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
