import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Download,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  FileText,
  PlayCircle,
  ClipboardList,
  Crosshair,
  Layers,
  Settings,
  Activity,
  Box
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SaberXADetail() {
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
            className="fixed top-24 right-6 z-50 bg-[#0a0e17] text-white px-6 py-3.5 rounded-[8px] shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
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
              className="bg-[#0a0e17] border border-white/10 p-8 rounded-[12px] w-full max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-heading font-bold mb-2">Request a Demo</h3>
              <p className="text-white/60 text-sm mb-6">See how SABER-XA™ can streamline your ALIF workflow.</p>
              
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="Dr. Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Hospital / Clinic</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="General Hospital" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-1">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white outline-none focus:border-[#2ac4f4] transition-colors" placeholder="jane@hospital.com" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowDemoModal(false)} className="flex-1 px-4 py-3 rounded-[4px] border border-white/10 text-white/70 hover:bg-white/5 transition-colors font-medium text-sm">Cancel</button>
                  <button type="submit" disabled={demoSubmitted} className="flex-1 px-4 py-3 rounded-[4px] bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#6ecff4] transition-colors font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(42,196,244,0.35)]">
                    {demoSubmitted ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-[#0a0e17] border-t-transparent rounded-full" /> : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: Hero Statement & Problem */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ac4f4]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center border border-[#2ac4f4]/30 rounded-[3px] px-3.5 py-1 mb-8 bg-[#2ac4f4]/10">
              <span className="font-mono font-medium text-[12px] tracking-widest uppercase text-[#7fd0ff]">
                Saber-XA™
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8">
              First and only 3D-printed titanium expandable ALIF with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ac4f4] to-[#7fd0ff]">true intra-operative customization</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
              Intra-operative customization of height and lordosis with integrated plating and fixation flexibility—all in one implant system.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer">
                Request Clinical Demo <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => triggerToast("Downloading Saber-XA™ Official Instructions for Use (IFU)...")}
                className="bg-white/10 text-white font-heading font-semibold text-[14px] px-7 py-4 rounded-[4px] border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#2ac4f4]" />
                Download Public IFU
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Copy */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="font-heading text-3xl font-bold mb-6 text-white/90">The Problem</h3>
              <p className="text-white/60 mb-6">Traditional anterior lumbar interbody fusion requires surgeons to:</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Pre-select static implant size before opening the patient",
                  "Stock multiple implant heights and lordosis angles",
                  "Make repeated disc space passes if anatomy doesn't match pre-op sizing",
                  "Choose between separate interbody and plating systems",
                  "Manage multiple fixation instruments"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 text-base leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#2ac4f4] font-semibold text-lg">Saber-XA™ solves this by enabling true patient-specific customization in the OR.</p>
            </motion.div>
            
             <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative aspect-[4/3] rounded-[8px] overflow-hidden border border-white/10 bg-black/50">
                <img src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787015670/SABER_X-A_ylfzww.png" alt="Saber-XA Expandable ALIF" className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2ac4f4]/5 to-transparent pointer-events-none" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: The Solution – Three Strategic Pillars */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#0a0e17]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">The Solution</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">Three strategic pillars of the Saber-XA platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intra-operative Customization",
                copy: "Optimize anatomy in real-time, not pre-op",
                points: ["Adjust ceiling height based on actual disc space", "Select lordosis angle intra-operatively", "Minimize vessel passes—critical for anterior approach safety", "One implant, infinite customization options"]
              },
              {
                icon: <Layers className="w-8 h-8 text-[#2ac4f4]" />,
                title: "Integrated Plating & Fixation",
                copy: "Complete fixation system—no tray switching",
                points: ["FDA-cleared integrated anterior lumbar plate", "Inline spike fixation (pre-loaded, ready-to-deploy)", "Self-drilling screw options (straight and angled)", "Comprehensive fixation without multiple instruments"]
              }
            ].map((col, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#050811] border border-white/10 rounded-[12px] p-8 hover:border-[#2ac4f4]/30 transition-colors group"
              >
                <div className="w-16 h-16 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center mb-6 group-hover:bg-[#2ac4f4]/20 transition-colors">
                  {col.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">{col.title}</h3>
                <p className="text-[#2ac4f4] text-sm font-semibold mb-6">{col.copy}</p>
                <ul className="space-y-4">
                  {col.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#2ac4f4] mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Competitive Differentiation Matrix */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 relative bg-[#050811]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Competitive Differentiation</h2>
            <p className="text-[#94a3b8]">What makes Saber-XA different from every other ALIF system.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-5 px-8 font-heading text-white/60 font-semibold w-2/5">Feature</th>
                    <th className="py-5 px-8 font-heading text-[#2ac4f4] font-bold w-1/4">Saber-XA</th>
                    <th className="py-5 px-8 font-heading text-white/50 font-semibold w-1/4">Competitors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { feature: "3D-Printed Titanium Expandable", saber: "Only Saber-XA", comp: "Static designs or non-titanium" },
                    { feature: "Independent CC + Lordotic Expansion", saber: "True dual customization", comp: "Limited or static lordosis" },
                    { feature: "FDA-Cleared Anterior Lumbar Plate", saber: "Integrated design", comp: "Separate plate systems" },
                    { feature: "Inline Spike Fixation", saber: "Built-in, no tray switch", comp: "Screw-only or separate fixation" },
                    { feature: "3D-Printed Endplates", saber: "Lattice engineered", comp: "Solid or traditional surfaces" },
                    { feature: "Comprehensive Fixation Options", saber: "Spikes + screws together", comp: "Limited options, more trays" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <th className="py-5 px-8 font-sans text-white font-medium">{row.feature}</th>
                      <td className="py-5 px-8 font-sans text-white text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2ac4f4]" /> {row.saber}
                      </td>
                      <td className="py-5 px-8 font-sans text-white/50 text-sm">{row.comp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Technical Specifications */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 bg-[#0a0e17]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-10">Technical Specifications</h2>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xl font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Available Footprints</h4>
                  <ul className="grid grid-cols-2 gap-2 text-white/60">
                    <li>26×34mm</li>
                    <li>28×37mm</li>
                    <li>30×40mm</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Height & Lordosis Configurations</h4>
                  <p className="text-[#2ac4f4] font-mono text-xs mb-3">11AH-7.7PH-6°L through 19AH-9.6PH-25°L</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4]"/> Adjustable ceiling heights with multiple lordosis angles per footprint</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4]"/> Expandable options enable intra-operative fine-tuning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Fixation Options</h4>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4]"/> Pre-loaded inline spike fixation (5.0mm)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4]"/> Self-drilling anterior screws (5.0mm & 5.5mm)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#2ac4f4]"/> Straight and angled screw instrumentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Anterior Plate Options</h4>
                  <p className="text-white/60 text-sm">Matching footprints for complete system compatibility</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              {/* Decorative visual for specs */}
              <div className="relative w-full aspect-square rounded-full border border-white/5 flex items-center justify-center">
                <div className="absolute inset-10 rounded-full border border-dashed border-[#2ac4f4]/30 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-20 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                  <Crosshair className="w-16 h-16 text-[#2ac4f4]/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Workflow Advantage */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">The Workflow Advantage</h2>
          <p className="text-[#2ac4f4] text-xl mb-16 font-semibold">"One implant. One approach. Infinite customization."</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0e17] rounded-[12px] p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Workflow Sequence</h3>
              <ol className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {[
                  "Single implant size selected based on initial disc space assessment",
                  "Position and deploy inline spike fixation or select screw approach",
                  "Expand to patient-specific height and lordosis intra-operatively",
                  "Anterior plate provides integrated construct stability",
                  "No tray switching. No additional passes. Complete in one approach."
                ].map((step, i) => (
                  <li key={i} className="relative flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#2ac4f4] text-[#0a0e17] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 z-10 shadow-[0_0_10px_rgba(42,196,244,0.35)]">{i+1}</div>
                    <span className="text-white/80">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#0a0e17] rounded-[12px] p-8 border border-[#2ac4f4]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#2ac4f4]/10">
                <Activity className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">OR Efficiency Benefits</h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Reduces pre-op inventory management",
                  "Eliminates multiple implant selections",
                  "Minimizes disc space exposure time",
                  "Streamlines instrumentation setup",
                  "True patient-specific optimization"
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0" />
                    <span className="text-white/80">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: The Implant Science */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#0a0e17]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">The Implant Science</h2>
          <p className="text-[#7fd0ff] mb-16 font-mono text-sm tracking-wider uppercase">3D-printed lattice engineered for fusion success</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              "Titanium lattice structure designed to mirror trabecular bone geometry",
              "Enhanced surface area for bone and marrow cell infiltration",
              "Supports accelerated osseointegration",
              "Biomechanically validated construct with integrated plating"
            ].map((sci, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[6px] hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-[4px] bg-[#2ac4f4]/15 text-[#2ac4f4] flex items-center justify-center mb-4 border border-[#2ac4f4]/30">
                  <Activity className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{sci}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Surgical Resources & CTAs */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 relative overflow-hidden bg-[#050811]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#2ac4f4]/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="font-heading text-4xl font-bold mb-8">Surgical Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => triggerToast("Downloading Saber-XA™ Instructions for Use (IFU)...")}
                className="flex items-center gap-4 bg-[#2ac4f4]/15 border border-[#2ac4f4]/40 p-4 rounded-[6px] transition-all group text-left cursor-pointer hover:bg-[#2ac4f4]/25"
              >
                <div className="w-12 h-12 rounded-[4px] bg-[#2ac4f4]/20 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">Instructions for Use (IFU)</h4>
                  <p className="text-xs text-[#2ac4f4] font-mono font-semibold">Public Download</p>
                </div>
              </button>

              <Link 
                to="/resources"
                className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-[6px] transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">Technique Guide</h4>
                  <p className="text-xs text-white/50">Portal Access Only</p>
                </div>
              </Link>

              <Link 
                to="/resources"
                className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-[6px] transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">Surgical Video</h4>
                  <p className="text-xs text-white/50">Portal Access Only</p>
                </div>
              </Link>

              <Link 
                to="/resources"
                className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-[6px] transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">Checklist</h4>
                  <p className="text-xs text-white/50">Portal Access Only</p>
                </div>
              </Link>

              <Link 
                to="/resources"
                className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-[6px] transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">Sizing Guide</h4>
                  <p className="text-xs text-white/50">Portal Access Only</p>
                </div>
              </Link>

              <Link 
                to="/resources"
                className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#2ac4f4]/50 p-4 rounded-[6px] transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center text-[#2ac4f4] group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">OR Setup</h4>
                  <p className="text-xs text-white/50">Portal Access Only</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0e17] border border-white/10 rounded-[8px] p-10 shadow-2xl flex flex-col gap-4">
             <h2 className="font-heading text-3xl font-bold mb-2">Connect With Us</h2>
             <p className="text-white/60 mb-6 text-sm">Experience the Saber-XA™ difference.</p>
             
             <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-bold px-6 py-3.5 rounded-[4px] hover:bg-[#6ecff4] transition-colors w-full text-left flex justify-between items-center cursor-pointer shadow-[0_4px_16px_rgba(42,196,244,0.35)]">
               Request Demo <ChevronRight className="w-5 h-5" />
             </button>
             <button 
               onClick={() => triggerToast("Downloading Saber-XA™ Official Instructions for Use (IFU)...")}
               className="bg-white/5 text-white border border-white/10 font-bold px-6 py-3.5 rounded-[4px] hover:bg-white/10 transition-colors w-full text-left flex justify-between items-center cursor-pointer"
             >
               Download Public IFU <Download className="w-5 h-5" />
             </button>
             <Link to="/partners" className="bg-white/5 text-white border border-white/10 font-bold px-6 py-3.5 rounded-[4px] hover:bg-white/10 transition-colors w-full text-left flex justify-between items-center">
               Partner / Distributor Inquiry <ChevronRight className="w-5 h-5" />
             </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
