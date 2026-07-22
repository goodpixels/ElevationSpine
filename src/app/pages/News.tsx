import { motion } from "motion/react";

const newsItems = [
  {
    date: "October 15, 2024",
    title: "Elevation Spine Announces Full Commercial Launch of SABER-C™ System",
    excerpt: "Following a successful limited release, the SABER-C zero-profile cervical system is now available to surgical centers nationwide.",
    category: "Press Release"
  },
  {
    date: "September 02, 2024",
    title: "Clinical Data Shows 28% Reduction in OR Time with In-Line Fixation",
    excerpt: "A retrospective review of early clinical outcomes demonstrates significant procedural efficiencies using the SABER platform.",
    category: "Clinical Update"
  },
  {
    date: "August 18, 2024",
    title: "SABER-XA™ Lateral System Enters Final Validation Phase",
    excerpt: "The next-generation lateral access platform has exceeded biomechanical benchmarks and is preparing for clinical advisory review.",
    category: "Pipeline"
  }
];

export default function News() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-white">
      <div className="max-w-[1420px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Company Updates
          </p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[48px] md:text-[64px] leading-[1.1] tracking-tight">
            News & Press
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#f8fafc] border border-black/[0.06] rounded-[24px] p-8 flex flex-col justify-between hover:shadow-[0_20px_48px_rgba(42,196,244,0.1)] hover:border-[#2ac4f4]/35 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">{item.date}</span>
                  <span className="bg-[#2ac4f4]/10 text-[#0891b2] font-mono font-medium text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-heading font-bold text-[#0a0e17] text-[22px] leading-snug mb-4">
                  {item.title}
                </h3>
                <p className="text-[#4a5568] text-[15px] leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-8 text-[#2ac4f4] font-heading font-semibold text-[14px] flex items-center gap-2">
                Read full article <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
