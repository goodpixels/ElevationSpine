import { motion } from "motion/react";
import { Link } from "react-router";

const productsData = [
  {
    id: "saber-c",
    tag: "FDA 510(k) Cleared",
    tagColor: "text-[#0891b2] bg-[#2ac4f4]/10 border-[#2ac4f4]/20",
    title: "Saber-C™ Cervical Fusion System",
    description: "Zero-Profile Anterior Cervical Plate with Integrated Spike and Screw Fixation Options. Features a PorOss™ 3D-printed titanium porous interbody paired with in-line fixation.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568424/Saber-C_TECH-17-Spike_Deployment_Flush_ytsoeh.png",
    link: "/saber-c",
    cta: "View Device Details",
  },
  {
    id: "saber-xa",
    tag: "Pipeline development",
    tagColor: "text-[#64748b] bg-slate-100 border-slate-200",
    title: "SABER-XA™",
    description: "Next-generation lateral access fixation currently undergoing final validation and clinical advisory review.",
    visualType: "blueprint",
    visualUrl: "",
    statusUpdate: {
      title: "Status update",
      text: `"Validation phases for the XA series are exceeding biomechanical benchmarks. Enrollment for initial clinical evaluation begins Q4."`,
    },
  },
];

import { TextRevealTitle } from "../App.tsx";

export default function Products() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1420px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Product Portfolio
          </p>
          <TextRevealTitle
            as="h1"
            text="Engineered for procedural simplicity"
            className="font-heading font-bold text-[#1a2535] text-[48px] md:text-[64px] leading-[1.1] tracking-tight max-w-3xl"
          />
        </motion.div>

        <div className="flex flex-col gap-12">
          {productsData.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className={`inline-flex self-start items-center border rounded-full px-4 py-1.5 mb-6 ${product.tagColor}`}>
                  <span className="font-mono font-medium text-[11px] tracking-wider uppercase">
                    {product.tag}
                  </span>
                </div>
                
                <h2 className="font-heading font-bold text-[#0a0e17] text-[40px] tracking-tight mb-4">
                  {product.title}
                </h2>
                
                <p className="text-[#4a5568] text-[18px] leading-relaxed mb-8">
                  {product.description}
                </p>

                {product.link && (
                  <Link to={product.link} className="inline-block self-start">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-[#2ac4f4] text-white font-heading font-semibold text-[14px] px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(42,196,244,0.3)] transition-colors duration-300 hover:bg-[#1aafde]"
                    >
                      {product.cta}
                    </motion.button>
                  </Link>
                )}

                {product.statusUpdate && (
                   <div className="mt-8 bg-slate-50 border border-black/[0.04] rounded-[16px] p-6 text-left">
                     <p className="font-mono font-semibold text-[#64748b] text-[11px] tracking-wider mb-2 uppercase">
                       {product.statusUpdate.title}
                     </p>
                     <p className="italic text-[#475569] text-[14px] leading-relaxed">
                       {product.statusUpdate.text}
                     </p>
                   </div>
                )}
              </div>

              <div className="bg-[#0a0e17] min-h-[400px] flex items-center justify-center relative overflow-hidden">
                {product.visualType === "image" ? (
                  <img src={product.visualUrl} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a101d]">
                     <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#2ac4f4 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
                     
                     <div className="relative flex items-center justify-center z-10">
                        <div className="w-24 h-24 rounded-full border border-[#2ac4f4]/35 flex items-center justify-center bg-[#2ac4f4]/10 shadow-[0_0_24px_rgba(42,196,244,0.12)]">
                           <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-[#2ac4f4]">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                           </svg>
                        </div>
                     </div>
                     <div className="mt-6 text-center z-10 px-6">
                        <h4 className="font-mono text-[#2ac4f4] text-[12px] tracking-[2px] font-semibold uppercase">In Development</h4>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
