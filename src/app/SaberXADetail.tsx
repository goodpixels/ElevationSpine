import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  CheckCircle2,
  ChevronRight,
  FileText,
  ClipboardList,
  Lock,
  BookOpen
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

      {/* Info Request Modal */}
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
              <h3 className="text-2xl font-heading font-bold mb-2">Request Product Information</h3>
              <p className="text-white/60 text-sm mb-6">Learn more about Saber-XA™ for your practice.</p>
              
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl flex flex-col items-center">
            
            <motion.div variants={fadeUp} className="inline-flex items-center border border-[#2ac4f4]/30 rounded-[6px] px-5 py-2.5 mb-8 bg-[#2ac4f4]/5 backdrop-blur-md">
              <span className="font-mono font-bold text-[13px] tracking-widest uppercase text-[#7fd0ff]">
                Saber-XA™
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-heading font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              Expandable ALIF.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ac4f4] to-[#7fd0ff]">Intraoperative control.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              An expandable anterior lumbar interbody system designed to provide intraoperative control of implant height and lordosis with integrated fixation options.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-8 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer">
                Request Product Information <ChevronRight className="w-4 h-4" />
              </button>
              <Link 
                to="/resources"
                className="bg-white/10 text-white font-heading font-semibold text-[14px] px-7 py-4 rounded-[4px] border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#2ac4f4]" />
                Access Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: PLATFORM OVERVIEW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Platform Overview</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-snug">
                Designed to adapt to patient anatomy during the procedure.
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Saber-XA is designed to help surgeons adapt the implant to patient anatomy during the procedure. The expandable platform combines height and lordotic adjustment with integrated anterior fixation options.
              </p>

              <div className="space-y-4">
                {[
                  "Expandable anterior lumbar interbody design",
                  "Intraoperative height and lordotic adjustment",
                  "Integrated anterior plate",
                  "Spike and screw fixation options",
                  "3D printed titanium architecture"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0" />
                    <span className="text-white/80 text-[15px]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center p-8">
                <img 
                  src="https://res.cloudinary.com/mrjnagvc/image/upload/v1787015670/SABER_X-A_ylfzww.png" 
                  alt="Saber-XA™ Expandable ALIF" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2ac4f4]/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: FIXATION OPTIONS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Fixation Options</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Multiple fixation approaches within one platform.</h2>
            <p className="text-[#94a3b8] text-lg leading-relaxed max-w-2xl">
              Saber-XA supports multiple fixation approaches within the platform, including inline spike fixation and anterior screw fixation with straight and angled instrumentation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white/[0.02] border border-white/10 rounded-[12px] p-8 hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-xl font-heading font-bold mb-3">Inline Spike Fixation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Preloaded spike fixation within the platform for a streamlined fixation workflow.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-[12px] p-8 hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-xl font-heading font-bold mb-3">Anterior Screw Fixation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Straight and angled screw instrumentation for versatile fixation approaches.
              </p>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-white/40 text-xs mt-6 italic">
            Please verify all fixation dimensions and configurations against the final technique guide before use.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: SPECIFICATIONS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="font-mono text-[#2ac4f4] text-[11px] tracking-[2px] font-bold uppercase mb-5">Specifications</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-[#94a3b8]">Please verify all specifications against approved product documentation.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="bg-white/[0.02] border border-white/10 rounded-[12px] overflow-hidden">
              <table className="w-full text-left">
                <tbody className="divide-y divide-white/10">
                  {[
                    { label: "Footprints", value: "26 × 34 mm  ·  28 × 37 mm  ·  30 × 40 mm" },
                    { label: "Height", value: "Expandable — multiple configurations available" },
                    { label: "Lordosis", value: "Adjustable — multiple angles available" },
                    { label: "Fixation", value: "Inline spike fixation  ·  Anterior screw fixation" },
                    { label: "Material", value: "3D printed titanium" },
                    { label: "Plate", value: "Integrated anterior plate" },
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
          SECTION 4: RESOURCES & CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#2ac4f4]/5 to-transparent" />
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Resources */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">Product Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Product Overview", icon: <FileText className="w-5 h-5" />, access: "Download", action: () => triggerToast("Accessing Saber-XA™ Product Overview...") },
                { title: "Instructions for Use", icon: <Download className="w-5 h-5" />, access: "Download", action: () => triggerToast("Downloading Saber-XA™ Instructions for Use...") },
                { title: "Surgical Technique Guide", icon: <ClipboardList className="w-5 h-5" />, access: "Portal Access", gated: true },
                { title: "Request a Demonstration", icon: <BookOpen className="w-5 h-5" />, access: "Contact", action: () => setShowDemoModal(true) },
              ].map((resource, i) => (
                resource.gated ? (
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
                      <p className="text-[10px] text-white/40 flex items-center gap-1"><Lock className="w-3 h-3" /> {resource.access}</p>
                    </div>
                  </Link>
                ) : (
                  <button 
                    key={i}
                    onClick={resource.action}
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
                )
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0a0e17] border border-white/10 rounded-[8px] p-10 shadow-2xl flex flex-col gap-6">
            <h2 className="font-heading text-3xl font-bold mb-2">Learn More About Saber-XA</h2>
            <p className="text-white/60 text-sm">Connect with our team to learn how Saber-XA can support your ALIF procedures.</p>
            
            <button onClick={() => setShowDemoModal(true)} className="bg-[#2ac4f4] text-[#0a0e17] font-bold px-6 py-3.5 rounded-[4px] hover:bg-[#6ecff4] transition-colors w-full text-left flex justify-between items-center cursor-pointer shadow-[0_4px_16px_rgba(42,196,244,0.35)]">
              Request Information <ChevronRight className="w-5 h-5" />
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
