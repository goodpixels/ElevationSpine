import { motion } from "motion/react";

export default function Partners() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#0a0e17] text-white overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2ac4f4] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1aafde] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1420px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px] mb-20"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Distribution Network
          </p>
          <h1 className="font-heading font-bold text-white text-[48px] md:text-[64px] leading-[1.1] tracking-tight mb-6">
            Partner with Elevation Spine
          </h1>
          <p className="text-white/70 text-[18px] leading-relaxed">
            We are actively expanding our distribution network across key territories. We partner with specialized spine distributors who demand innovative, differentiated technologies for their surgeons.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.03] border border-white/10 rounded-[24px] p-10 md:p-14 backdrop-blur-md"
          >
            <h3 className="font-heading font-bold text-[28px] mb-8">Why distribute our products?</h3>
            <ul className="flex flex-col gap-6">
              {[
                "Differentiated zero-profile technology that solves real clinical challenges.",
                "Robust intellectual property and comprehensive FDA 510(k) clearances.",
                "High-margin portfolio with competitive compensation structures.",
                "Dedicated field clinical support and comprehensive training programs.",
                "Exclusive territory agreements for top-performing partners."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#2ac4f4]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-[#2ac4f4]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-[16px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-[24px] p-10 md:p-14 text-[#0a0e17]"
          >
            <h3 className="font-heading font-bold text-[28px] mb-2">Become a Partner</h3>
            <p className="text-[#64748b] text-[15px] mb-8">Submit your agency profile to discuss territory availability.</p>
            
            <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="First Name" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
              </div>
              <input type="text" placeholder="Agency Name" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
              <input type="email" placeholder="Email Address" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="State/Territory" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
                <input type="text" placeholder="Years in Business" className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-[12px] px-5 py-3.5 focus:outline-none focus:border-[#2ac4f4] transition-colors" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#2ac4f4] text-white font-heading font-bold text-[15px] py-4 rounded-[12px] mt-4 shadow-[0_8px_24px_rgba(42,196,244,0.3)] hover:bg-[#1aafde] transition-colors"
              >
                Submit Inquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
