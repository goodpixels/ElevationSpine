import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, Award, MapPin } from "lucide-react";

export default function Partners() {
  const [audience, setAudience] = useState<"Distributor" | "Surgeon" | "ASC">("Distributor");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#0a0e17] text-white overflow-hidden relative">
      {/* Background accents / radial glows matching the dark gradient aesthetic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2ac4f4] opacity-[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0284c7] opacity-[0.04] blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[840px] mb-16 text-left"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Distribution & Clinical Partnership
          </p>
          <h1 className="font-heading font-bold text-white text-[44px] md:text-[56px] leading-[1.1] tracking-tight mb-5">
            Partner with Elevation Spine
          </h1>
          <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed">
            We actively collaborate with specialized spine distributors, high-volume surgical teams, and ambulatory surgery centers nationwide to deliver zero-profile fixation innovations that elevate patient outcomes.
          </p>
        </motion.div>

        {/* 2-Column Grid: Value Proposition + Interactive Unified Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Commercial & Clinical Network Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white/[0.04] border border-white/10 rounded-[8px] p-8 md:p-10 backdrop-blur-md">
              <h3 className="font-heading font-bold text-2xl text-white mb-6">
                Why Partner with Elevation Spine?
              </h3>
              
              <ul className="flex flex-col gap-6">
                {[
                  {
                    icon: <Award className="w-5 h-5 text-[#2ac4f4]" />,
                    title: "Differentiated Zero-Profile Technology",
                    desc: "Proprietary in-line fixation that eliminates secondary plating and accelerates procedural workflow."
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-[#2ac4f4]" />,
                    title: "Robust FDA Clearances & IP",
                    desc: "Comprehensive 510(k) clearances and patented spike delivery mechanisms backed by peer-reviewed research."
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-[#2ac4f4]" />,
                    title: "High-Margin Commercial Structure",
                    desc: "Competitive compensation models and protected territory agreements for top-tier agency partners."
                  },
                  {
                    icon: <Users className="w-5 h-5 text-[#2ac4f4]" />,
                    title: "Dedicated Field Support & Training",
                    desc: "Hands-on clinical training, wet labs, and direct access to our executive engineering and leadership team."
                  }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[5px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-[16px] mb-1">{item.title}</h4>
                      <p className="text-white/60 text-[14px] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-[8px] p-6 md:p-8 backdrop-blur-sm">
              <h4 className="font-heading font-bold text-lg text-white mb-3">Corporate Headquarters</h4>
              <div className="flex flex-col gap-1 text-[14px] text-white/70">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2ac4f4]" />
                  <span>2511 Garden Road | Suite B125, Monterey, CA 93940</span>
                </p>
                <p className="mt-2">Direct Phone: <a href="tel:8444150226" className="text-white hover:text-[#2ac4f4] underline">(844) 415-0226</a></p>
                <p>Email: <a href="mailto:info@elevationspine.com" className="text-white hover:text-[#2ac4f4] underline">info@elevationspine.com</a></p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Unified Inquiry Form (No Top Image Crops) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7 bg-white rounded-[8px] p-8 md:p-12 text-[#0a0e17] shadow-2xl"
          >
            {/* Audience Switcher Tabs */}
            <div className="flex border-b border-black/[0.08] mb-8 pb-3 gap-2 overflow-x-auto">
              {(["Distributor", "Surgeon", "ASC"] as const).map((type) => {
                const isActive = audience === type;
                return (
                  <button
                    key={type}
                    onClick={() => setAudience(type)}
                    className={`relative py-2.5 px-4 font-heading text-[14px] font-semibold rounded-[4px] transition-all cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? "bg-[#0a0e17] text-white shadow-sm" 
                        : "text-[#64748b] hover:text-[#0a0e17] hover:bg-black/[0.04]"
                    }`}
                  >
                    <span>{type === "Distributor" ? "Distributor Agency" : type === "Surgeon" ? "Clinical / Surgeon" : "ASC Facility"}</span>
                  </button>
                );
              })}
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center bg-emerald-50 rounded-[6px] border border-emerald-200 p-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0a0e17]">Inquiry Received</h3>
                <p className="text-[#64748b] text-[15px] mt-2 max-w-md leading-relaxed">
                  Thank you for connecting with Elevation Spine. An executive team member will reach out within 24 hours to discuss territory availability, clinical evaluation, or contracting.
                </p>
              </motion.div>
            ) : (
              <div>
                <h3 className="font-heading font-bold text-[24px] text-[#0a0e17] mb-1.5">
                  {audience === "Distributor" && "Distributor Partnership Inquiry"}
                  {audience === "Surgeon" && "Clinical & Surgical Evaluation"}
                  {audience === "ASC" && "Ambulatory Surgery Center Program"}
                </h3>
                <p className="text-[#64748b] text-[14px] mb-8 leading-relaxed">
                  {audience === "Distributor" && "Inquire about exclusive territory availability, agency qualifications, and commercial product onboarding."}
                  {audience === "Surgeon" && "Connect directly with our medical affairs and engineering team to review surgical workflows, data, or request an in-service."}
                  {audience === "ASC" && "Learn about our streamlined single-tray supply chain efficiencies, value analysis packages, and contracting terms."}
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">First Name</label>
                      <input
                        type="text"
                        required
                        placeholder={audience === "Surgeon" ? "Dr. Sarah" : "Alex"}
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">Last Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jenkins"
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="contact@organization.com"
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">
                        {audience === "Distributor" ? "Agency Name" : audience === "Surgeon" ? "Hospital / Practice Name" : "ASC Facility Name"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={audience === "Distributor" ? "Spine MedTech Partners" : "Spine & Orthopedic Center"}
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">State / Territory</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. California / West Coast"
                        className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-semibold">Inquiry Details / Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please share specific territories of interest, clinical questions, or preferred meeting times..."
                      className="bg-[#f8fafc] border border-black/[0.1] rounded-[4px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2ac4f4] transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] py-4 rounded-[4px] mt-2 shadow-[0_6px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] hover:shadow-[0_8px_24px_rgba(42,196,244,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
