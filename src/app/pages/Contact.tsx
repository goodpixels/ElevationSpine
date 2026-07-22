import { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [audience, setAudience] = useState("Surgeon");

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Get in touch
          </p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[48px] md:text-[64px] leading-[1.1] tracking-tight">
            Contact Us
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[24px] overflow-hidden border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
        >
          <div className="flex border-b border-black/[0.06]">
            {["Surgeon", "ASC", "Distributor"].map((type) => (
              <button
                key={type}
                onClick={() => setAudience(type)}
                className={`flex-1 py-5 font-heading text-[15px] font-semibold transition-colors ${
                  audience === type 
                    ? "bg-[#2ac4f4]/5 text-[#0891b2] border-b-2 border-[#0891b2]" 
                    : "text-[#64748b] hover:bg-black/[0.02]"
                }`}
              >
                {type} Inquiry
              </button>
            ))}
          </div>

          <div className="p-10 md:p-14">
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

            <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">First Name</label>
                  <input type="text" className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">Last Name</label>
                  <input type="text" className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                 <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">Email Address</label>
                 <input type="email" className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
              </div>

              {audience !== "Distributor" && (
                <div className="flex flex-col gap-2">
                   <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">Facility / Hospital Name</label>
                   <input type="text" className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                </div>
              )}
              {audience === "Distributor" && (
                <div className="flex flex-col gap-2">
                   <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">Agency Name</label>
                   <input type="text" className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                 <label className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">Message</label>
                 <textarea rows={4} className="bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[#2ac4f4] transition-colors resize-none"></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-start bg-[#2ac4f4] text-white font-heading font-semibold text-[14px] px-10 py-4 rounded-[12px] mt-2 shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#1aafde] transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
