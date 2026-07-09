import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import svgPaths from "@/imports/ElevationHome1/svg-podh48szuv";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function SaberCDetail() {
  const [activeTab, setActiveTab] = useState("materials");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specifications = {
    materials: [
      { name: "Core Material", value: "PEEK-OPTIMA® Natural (medical-grade polyetheretherketone)" },
      { name: "Endplates", value: "Pure Titanium Plasma Spray coating (for superior osteointegration)" },
      { name: "Radiopaque Markers", value: "Tantalum pins (positioned for precise intraoperative visualization)" },
      { name: "Fixation Screws", value: "Ti-6Al-4V ELI (high-grade biocompatible titanium alloy)" },
    ],
    fixation: [
      { name: "Screw Configurations", value: "2-Screw Integrated Zero-Profile Fixation" },
      { name: "Divergent Angles", value: "35° Cephalad/Caudal divergence, 10° Medial/Lateral angle" },
      { name: "Self-Drilling & Self-Tapping", value: "Yes, eliminating secondary tapping workflows" },
      { name: "Screw Diameters", value: "3.5mm, 4.0mm options available" },
      { name: "Screw Lengths", value: "12mm to 16mm range" },
    ],
    sizing: [
      { name: "Lordotic Angles", value: "7° Standard, 12° Hyperlordotic options" },
      { name: "Footprint Sizes", value: "Small (12x14mm), Medium (14x16mm), Large (15x18mm)" },
      { name: "Heights Available", value: "5mm to 12mm in 1mm increments" },
      { name: "Implant Porosity", value: "85% interconnected porous structure" },
    ],
  };

  const steps = [
    {
      num: "01",
      title: "Trialing & Sizing",
      desc: "Use the low-profile trial instruments to determine height, footprint, and lordotic angle under fluoroscopy.",
    },
    {
      num: "02",
      title: "Implant Loading",
      desc: "Secure the SABER-C™ implant onto the unified inserter guide. Pre-pack the porous core with autologous bone graft.",
    },
    {
      num: "03",
      title: "In-line Insertion",
      desc: "Deliver the implant into the disc space. The zero-profile configuration ensures no protrusion beyond the anterior cortex.",
    },
    {
      num: "04",
      title: "Rigid Screw Fixation",
      desc: "Deploy screws through the integrated divergent guides. Engage the locking mechanism to prevent migration.",
    },
  ];

  return (
    <div className="bg-[#0a0e17] text-white min-h-screen font-sans">
      {/* Top Navbar */}
      <nav className="fixed z-50 inset-x-0 top-5 flex justify-center">
        <div className="flex items-center justify-between w-full max-w-[1420px] mx-5 md:mx-10 px-6 md:px-8 h-[64px] rounded-[28px] bg-white/20 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
          <Link to="/" className="h-[38px] relative shrink-0 w-[88px] flex items-center">
            {/* Elevation Logo */}
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 61">
              <g clipPath="url(#clip0_logo)">
                <path d={svgPaths.p1d12dd00} fill="white" />
                <path d={svgPaths.p76c7900} fill="white" />
                <path d={svgPaths.p18758900} fill="white" />
                <path d={svgPaths.p29274500} fill="white" />
                <path d={svgPaths.paa30600} fill="white" />
                <path d={svgPaths.p3eec2600} fill="white" />
                <path d={svgPaths.p36eeca00} fill="white" />
                <path d={svgPaths.p29b4e6f0} fill="white" />
                <path d={svgPaths.p30363300} fill="white" />
                <path d={svgPaths.pca8ce00} fill="white" />
                <path d={svgPaths.p1454f000} fill="white" />
                <path d={svgPaths.pcead00} fill="white" />
                <path d={svgPaths.p329b0500} fill="white" />
                <path d={svgPaths.p30086700} fill="white" />
                <path d={svgPaths.p39a63500} fill="white" />
                <path d={svgPaths.p2995ec00} fill="#6ECFF4" />
                <path d={svgPaths.p1cdf870} fill="#6ECFF4" />
                <path d={svgPaths.p24905580} fill="#2AC4F4" />
                <path d={svgPaths.p26146280} fill="#6ECFF4" />
                <path d={svgPaths.p151b6d00} fill="#2AC4F4" />
                <path d={svgPaths.p16dd1f00} fill="black" />
                <path d={svgPaths.p1031cc00} fill="#6ECFF4" />
                <path d={svgPaths.p2cb33600} fill="#2AC4F4" />
                <path d={svgPaths.p2db91e00} fill="#6ECFF4" />
                <path d={svgPaths.p13a9a400} fill="#6ECFF4" />
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect fill="white" height="61" width="142" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            to="/"
            className="font-heading text-[13px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-6 py-2 transition-all duration-300"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:py-48 overflow-hidden bg-gradient-to-b from-[#0e1626] to-[#0a0e17]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(42,196,244,0.15),transparent_70%)]" />
        <div className="max-w-[1420px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-6">
            <motion.div variants={fadeUp} className="inline-flex self-start items-center bg-[rgba(42,196,244,0.1)] border border-[rgba(42,196,244,0.25)] rounded-full px-4 py-1.5">
              <span className="font-mono text-[#7fd0ff] text-xs font-semibold tracking-widest">FDA 510(k) Cleared</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
              SABER-C™ <br />
              <span className="text-[#2ac4f4]">Cervical Interbody</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#bdc8d1] text-lg md:text-xl leading-relaxed max-w-[540px]">
              SABER-C™ integrates zero-profile spinal fixation directly into a PEEK cervical cage. Designed to eliminate secondary plating, minimizing soft tissue disruption and reducing overall operating room times.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => alert("Downloading surgical technique guide...")}
                className="font-heading font-semibold bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#6ecff4] px-8 py-4 rounded-[15px] shadow-[0_8px_20px_rgba(42,196,244,0.25)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Surgical Technique Guide (PDF)
              </button>
              <button
                onClick={() => alert("Downloading technical brochure...")}
                className="font-heading font-semibold bg-white/5 hover:bg-white/10 border border-white/15 px-8 py-4 rounded-[15px] transition-all duration-300"
              >
                Download Brochure
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,196,244,0.1),transparent_60%)]" />
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782709515/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png"
              alt="SABER-C Cervical Implant"
              className="w-full max-w-[500px] object-contain drop-shadow-[0_10px_35px_rgba(42,196,244,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-24 bg-[#070a10] border-y border-white/[0.05]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[700px] mb-16">
            <p className="font-heading text-xs font-semibold text-[#7fd0ff] tracking-[1.5px] mb-3">Engineering Rigor</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-5">Technical Specifications</h2>
            <p className="text-[#bdc8d1] leading-relaxed">
              Explore the exact sizing parameters, divergent fixation mechanics, and biomaterial composition underlying the SABER-C™ system design.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Tab Controls */}
            <div className="flex flex-col gap-3">
              {[
                { id: "materials", label: "Biomaterials & Coatings" },
                { id: "fixation", label: "Fixation & Screws" },
                { id: "sizing", label: "Lordosis & Dimensions" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-heading text-left px-6 py-4 rounded-[12px] text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#2ac4f4]/15 border-l-4 border-[#2ac4f4] text-white"
                      : "bg-white/[0.02] border-l-4 border-transparent text-[#bdc8d1] hover:bg-white/[0.05]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Spec Table */}
            <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-6 md:p-8 backdrop-blur-md">
              <table className="w-full text-left">
                <tbody>
                  {specifications[activeTab as keyof typeof specifications].map((spec, i) => (
                    <tr key={i} className="border-b border-white/[0.06] last:border-b-0">
                      <td className="py-5 font-semibold text-white/70 w-1/3 text-sm pr-4 align-top font-heading">
                        {spec.name}
                      </td>
                      <td className="py-5 text-white text-sm leading-relaxed align-top">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Procedural Steps Section */}
      <section className="py-24 bg-[#0a0e17]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="max-w-[700px] mb-16">
            <p className="font-heading text-xs font-semibold text-[#7fd0ff] tracking-[1.5px] mb-3">Clinical Application</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-5">Surgical Workflow</h2>
            <p className="text-[#bdc8d1] leading-relaxed">
              A simplified visual breakdown of the instrumentation steps required for zero-profile SABER-C™ cervical fusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-8 relative flex flex-col gap-6"
              >
                <div className="absolute top-6 right-8 text-5xl font-bold text-white/[0.03] select-none font-heading">
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-[10px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 flex items-center justify-center">
                  <span className="font-mono text-[#2ac4f4] text-xs font-bold">{step.num}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#bdc8d1] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Portal Callout */}
      <section className="py-24 bg-[#06080d] border-t border-white/[0.05]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/[0.08] rounded-[30px] p-8 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="max-w-[600px]">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Request Surgeon Access</h2>
              <p className="text-[#bdc8d1] leading-relaxed text-sm md:text-base">
                For detailed biomechanical reports, CAD layouts, and clinical studies regarding SABER-C™, log in or request verified surgeon access to our secure resource portal.
              </p>
            </div>
            <Link
              to="/"
              className="font-heading font-semibold bg-white text-[#0a0e17] hover:bg-[#2ac4f4] hover:text-[#0a0e17] px-8 py-4 rounded-[15px] transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Surgeon Portal Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#04060a] border-t border-white/[0.05] py-12 text-center text-sm text-white/40">
        <p>© 2024 Elevation Spine. All rights reserved. Zero-profile spinal fixation technology.</p>
      </footer>
    </div>
  );
}
