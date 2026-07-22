import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

// ─── Cloudinary Banner Image Placeholders (Replace with your Cloudinary URLs) ───
const BANNER_IMAGES: Record<"Surgeon" | "ASC" | "Distributor", string> = {
  Surgeon: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784764222/Surgeons_headw4.jpg",
  ASC: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784764223/ASCs_bozxt8.jpg",
  Distributor: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784764223/Distributor_olspz4.jpg",
};

import { TextRevealTitle } from "../App.tsx";

export default function Contact() {
  const [audience, setAudience] = useState<"Surgeon" | "ASC" | "Distributor">("Surgeon");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Get in touch
          </p>
          <TextRevealTitle
            as="h1"
            text="Contact Us"
            className="font-heading font-bold text-[#1a2535] text-[48px] md:text-[64px] leading-[1.1] tracking-tight justify-center"
          />
          <p className="text-[#64748b] text-base md:text-lg mt-2 max-w-xl mx-auto">
            Select your inquiry type below to route directly to our surgical, clinical, or commercial team.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[28px] overflow-hidden border border-black/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.04)]"
        >
          {/* Navigation Tabs */}
          <div className="flex border-b border-black/[0.06] bg-slate-50/50">
            {(["Surgeon", "ASC", "Distributor"] as const).map((type) => {
              const isActive = audience === type;
              return (
                <button
                  key={type}
                  onClick={() => setAudience(type)}
                  className={`relative flex-1 py-5 px-3 font-heading text-[14px] md:text-[15px] font-semibold transition-all duration-300 cursor-pointer text-center ${
                    isActive 
                      ? "text-[#0a0e17] font-bold" 
                      : "text-[#64748b] hover:text-[#0a0e17] hover:bg-black/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2ac4f4]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{type} Inquiry</span>
                </button>
              );
            })}
          </div>

          {/* SMALL IMAGE BANNER CONTAINER (Strict 150px height limit) */}
          <div className="w-full h-[150px] relative overflow-hidden bg-[#0a0e17] border-b border-black/[0.06]">
            <AnimatePresence mode="wait">
              <motion.img
                key={audience}
                src={BANNER_IMAGES[audience]}
                alt={`${audience} Inquiry Banner`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-[150px] object-cover ${audience === 'Distributor' ? 'object-[50%_20%]' : 'object-center'}`}
              />
            </AnimatePresence>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-200"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0a0e17]">Inquiry Received Successfully</h3>
                <p className="text-[#64748b] text-sm mt-2 max-w-md">
                  Thank you for connecting. An Elevation Spine {audience === "Surgeon" ? "Medical Affairs Specialist" : audience === "ASC" ? "ASC Account Director" : "Commercial VP"} will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div>
                <h3 className="font-heading font-bold text-[24px] text-[#0a0e17] mb-2">
                  {audience === "Surgeon" && "Clinical & Surgical Inquiry"}
                  {audience === "ASC" && "Ambulatory Surgery Center Inquiry"}
                  {audience === "Distributor" && "Distribution Partnership"}
                </h3>
                <p className="text-[#64748b] text-[15px] mb-8">
                  {audience === "Surgeon" && "Connect with our clinical team to discuss the SABER platform and clinical evidence."}
                  {audience === "ASC" && "Learn about our ASC programs, value analysis, and contracting."}
                  {audience === "Distributor" && "Inquire about territory availability and partnership opportunities."}
                </p>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">First Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Sarah"
                        className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">Last Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jenkins"
                        className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder={audience === "Surgeon" ? "surgeon@spinecenter.com" : audience === "ASC" ? "administrator@asc.com" : "partner@medtechsales.com"}
                      className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors"
                    />
                  </div>

                  {audience !== "Distributor" ? (
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">Facility / Hospital Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Spine & Orthopedic Center of Excellence"
                        className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">Agency / Distribution Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Spine Distributors Inc."
                        className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest font-medium">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please provide details regarding your inquiry, preferred schedule, or territory..."
                      className="bg-[#f8fafc] border border-black/[0.08] rounded-[14px] px-5 py-3 text-sm focus:outline-none focus:border-[#2ac4f4] transition-colors resize-none"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="self-start bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-10 py-4 rounded-[14px] mt-2 shadow-[0_8px_24px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
