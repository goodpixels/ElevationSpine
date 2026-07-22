import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ShieldAlert,
  Download,
  Send,
  Layers,
  Zap,
  Activity,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Feather,
  Sliders,
  Compass,
  Wrench,
  Mail,
  PhoneCall,
  X
} from "lucide-react";
import SaberCHotspotViewer from "./components/SaberCHotspotViewer";

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
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. HERO SECTION (Above the Fold) ── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#0a1122] via-[#080e1d] to-[#070b14]">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,rgba(42,196,244,0.18),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1420px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-6 flex flex-col gap-6">
            <motion.div variants={fadeUp} className="inline-flex self-start items-center gap-2 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2ac4f4]" />
              <span className="font-mono text-[#7fd0ff] text-xs font-semibold tracking-widest uppercase">FDA 510(k) Cleared System</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Saber-C™ <br />
              <span className="text-[#2ac4f4]">Cervical Fusion System</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-[560px]">
              Zero-Profile Anterior Cervical Plate with Integrated Spike and Screw Fixation Options.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => setShowDemoModal(true)}
                className="font-heading font-bold text-sm bg-[#2ac4f4] text-[#070b14] hover:bg-[#6ecff4] px-8 py-4 rounded-xl shadow-[0_8px_25px_rgba(42,196,244,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Request a Demo
              </button>
              <button
                onClick={() => triggerToast("Downloading Saber-C™ Surgical Technique Guide (PDF)...")}
                className="font-heading font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#2ac4f4]" />
                <span>Download Surgical Technique Guide</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Key Visual Hero 3D Render Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl bg-[#091020]/80 border border-white/10 p-6 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,196,244,0.15),transparent_65%)] pointer-events-none" />
              <img
                src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784688640/Saber-C_BEAUTY-01-Implant_Contruct_Spikes_ISO_dnjphd.png"
                alt="Saber-C Cervical Fusion System ISO View"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(42,196,244,0.25)]"
              />
              <div className="absolute bottom-4 right-4 bg-[#070b14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-white/60">
                Saber-C™ Construct
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SYSTEM OVERVIEW & CORE BENEFITS ── */}
      <section className="py-24 bg-[#050811] border-t border-b border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[760px] mb-16">
            <span className="font-mono text-xs font-semibold text-[#2ac4f4] tracking-[2px] uppercase block mb-3">System Overview</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Elevate Your ACDF Procedures
            </h2>
            <p className="text-[#bdc8d1] text-lg leading-relaxed">
              Saber-C offers a comprehensive cervical fusion solution featuring a porous 3D-printed titanium interbody paired with integrated spike or screw fixation and a zero-profile anterior cervical plate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-[#2ac4f4]" />,
                num: "01",
                title: "In-Line Spike Fixation",
                desc: "Pre-loaded, simultaneous spike deployment reduces operative steps and surgical complexity.",
              },
              {
                icon: <Layers className="w-6 h-6 text-[#38bdf8]" />,
                num: "02",
                title: "Zero-Profile Design",
                desc: "Minimizes anatomical disruption and lowers risk of adjacent-level tissue irritation.",
              },
              {
                icon: <Activity className="w-6 h-6 text-[#60a5fa]" />,
                num: "03",
                title: "Operative Versatility",
                desc: "Accommodates both spikes and screws in the same instrument tray for maximum flexibility.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 relative flex flex-col gap-5 hover:border-[#2ac4f4]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="font-mono text-2xl font-bold text-white/20">{card.num}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">{card.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE CONSTRUCT BREAKDOWN WIDGET ── */}
      <section id="interactive-breakdown" className="py-20 bg-[#070b14] border-b border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <SaberCHotspotViewer />
        </div>
      </section>

      {/* ── 4. POROSS™ 3D TITANIUM TECHNOLOGY ── */}
      <section className="py-24 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[760px] mb-16">
            <span className="font-mono text-xs font-semibold text-[#2ac4f4] tracking-[2px] uppercase block mb-3">Advanced Biomaterials</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              PorOss™ 3D-Printed Titanium Architecture
            </h2>
            <p className="text-[#bdc8d1] text-lg leading-relaxed">
              Engineered around Porosity, Surface Biology, and Imaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "55% Porous Lattice",
                desc: "Mimics trabecular bone structure to promote osteointegration.",
                tag: "BONY FUSION",
              },
              {
                title: "Surface Wicking",
                desc: "Micron-scale texturing engineered to enhance fluid absorption at the implant interface.",
                tag: "SURFACE BIOLOGY",
              },
              {
                title: "Imaging Friendly",
                desc: "Optimized lattice structure reduces image artifact under Fluoroscopy and CT.",
                tag: "RADIOGRAPHIC CLARITY",
              },
              {
                title: "Graft Window",
                desc: "Maximizes bone graft volume to support solid fusion.",
                tag: "GRAFT CONTAINMENT",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#2ac4f4]/50 transition-all duration-300"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#7fd0ff] bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 px-2.5 py-1 rounded-md uppercase block w-max mb-4">
                    {card.tag}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. IMPLANT SPECIFICATIONS MATRIX ── */}
      <section className="py-24 bg-[#070b14] border-b border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[700px] mb-12">
            <span className="font-mono text-xs font-semibold text-[#2ac4f4] tracking-[2px] uppercase block mb-3">Sizing & Options</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Implant Specifications & Sizing Options
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              Comprehensive footprint, height, and fixation parameters engineered for patient-matched cervical reconstruction.
            </p>
          </div>

          <div className="overflow-x-auto bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="py-5 px-6 font-heading text-xs font-bold text-[#2ac4f4] uppercase tracking-wider">Component</th>
                  <th className="py-5 px-6 font-heading text-xs font-bold text-[#2ac4f4] uppercase tracking-wider">Footprint Options</th>
                  <th className="py-5 px-6 font-heading text-xs font-bold text-[#2ac4f4] uppercase tracking-wider">Heights</th>
                  <th className="py-5 px-6 font-heading text-xs font-bold text-[#2ac4f4] uppercase tracking-wider">Lordosis</th>
                  <th className="py-5 px-6 font-heading text-xs font-bold text-[#2ac4f4] uppercase tracking-wider">Variation / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-sm">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-heading font-semibold text-white">Porous Interbody</td>
                  <td className="py-5 px-6 font-mono text-white/80">12x15mm, 14x17mm</td>
                  <td className="py-5 px-6 font-mono text-white/80">5mm – 9mm</td>
                  <td className="py-5 px-6 font-mono text-white/80">6° & 12°</td>
                  <td className="py-5 px-6 text-white/70">Large Central Graft Window</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-heading font-semibold text-white">Fixation Spikes</td>
                  <td className="py-5 px-6 font-mono text-white/80">Standard & Long</td>
                  <td className="py-5 px-6 font-mono text-white/50">N/A</td>
                  <td className="py-5 px-6 font-mono text-white/50">N/A</td>
                  <td className="py-5 px-6 text-white/70">Pre-loaded In-line Deployment</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-heading font-semibold text-white">Fixation Screws</td>
                  <td className="py-5 px-6 font-mono text-white/80">Self-Drilling</td>
                  <td className="py-5 px-6 font-mono text-white/50">N/A</td>
                  <td className="py-5 px-6 font-mono text-white/50">N/A</td>
                  <td className="py-5 px-6 text-white/70">12mm, 14mm, 16mm, 18mm, 20mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. INSTRUMENTATION & SURGICAL TECHNIQUE ── */}
      <section className="py-24 bg-[#050811] border-b border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[760px] mb-16">
            <span className="font-mono text-xs font-semibold text-[#2ac4f4] tracking-[2px] uppercase block mb-3">Surgical Workflow</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Slimline™ Inserter & Surgical Precision
            </h2>
            <p className="text-[#bdc8d1] text-lg leading-relaxed">
              Engineered for minimal tissue disruption, clear intraoperative visualization, and streamlined single-tray deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Feather className="w-5 h-5 text-[#2ac4f4]" />,
                title: "Ergonomic & Lightweight",
                desc: "Designed to improve visualization and reduce surgeon hand fatigue.",
              },
              {
                icon: <Sliders className="w-5 h-5 text-[#38bdf8]" />,
                title: "Depth Control",
                desc: "Features a 0–5mm adjustable depth stop for surgical precision.",
              },
              {
                icon: <Compass className="w-5 h-5 text-[#0ea5e9]" />,
                title: "Narrow Access Corridor",
                desc: "In-line fixation allows access through smaller incisions and challenging cervical levels compared to angled screw drivers.",
              },
              {
                icon: <Wrench className="w-5 h-5 text-[#60a5fa]" />,
                title: "Complete Set",
                desc: "Straight and angled Awls, Drills, and Drivers for tight surgical windows.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#2ac4f4]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MANDATORY REGULATORY CALLOUT ── */}
      <section className="py-12 bg-[#080d1a]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-6 flex items-start gap-4 shadow-[0_8px_30px_rgba(245,158,11,0.15)]">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Mandatory Regulatory Notice
              </span>
              <p className="text-white/90 font-heading text-sm md:text-base font-semibold leading-relaxed">
                Note: When Saber-C™ is used with spikes, supplemental fixation is required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER / CONVERSION SECTION ── */}
      <section className="py-24 bg-gradient-to-b from-[#070b14] to-[#04060b] border-t border-white/5">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-[#0b1428] to-[#091022] border border-[#2ac4f4]/30 rounded-[32px] p-8 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2ac4f4]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[640px]">
              <span className="font-mono text-xs font-semibold text-[#7fd0ff] tracking-[2px] uppercase block mb-3">
                Get Started
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Ready to learn more about Saber-C™?
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Connect with an Elevation Spine surgical specialist to evaluate instrumentation, request CAD models, or schedule an in-service demonstration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setShowDemoModal(true)}
                className="font-heading font-bold text-sm bg-[#2ac4f4] text-[#070b14] hover:bg-[#6ecff4] px-8 py-4 rounded-xl shadow-[0_8px_25px_rgba(42,196,244,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Elevation Representative</span>
              </button>
              
              <a
                href="mailto:info@elevationspine.com"
                className="font-heading font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#2ac4f4]" />
                <span>info@elevationspine.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDemoModal(false)}
              className="absolute inset-0 bg-[#070b14]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[500px] bg-[#0c1325] border border-[#2ac4f4]/40 rounded-[28px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />
              
              <div className="w-12 h-12 rounded-2xl bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-5">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                Request a Saber-C™ Demo
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Schedule a clinical demonstration or inquire about surgical instrumentation sets with Elevation Spine.
              </p>

              <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name / Surgeon Name"
                  className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                />
                <input
                  type="email"
                  required
                  placeholder="Institution Email"
                  className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                />
                <input
                  type="text"
                  placeholder="Hospital / Medical Facility"
                  className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                />
                <button
                  type="submit"
                  disabled={demoSubmitted}
                  className="bg-[#2ac4f4] text-[#070b14] font-heading font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-2"
                >
                  {demoSubmitted ? "Sending Request..." : "Submit Demo Request"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
