import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";

const productsData = [
  {
    id: "saber-c",
    shortTitle: "SABER-C™",
    dotColor: "bg-[#2ac4f4]",
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
    shortTitle: "SABER-XA™",
    dotColor: "bg-[#10b981]",
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
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Product Portfolio
          </p>
          <TextRevealTitle
            as="h1"
            text="Engineered for procedural simplicity"
            className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[56px] leading-[1.1] tracking-tight max-w-3xl"
          />
        </motion.div>

        {/* Product Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-start gap-4 mb-10"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-[16px] font-heading font-bold text-[14px] transition-all duration-300 ${
              activeTab === "all" 
                ? "bg-[#0a0e17] text-white shadow-[0_8px_20px_rgba(10,14,23,0.2)] scale-105" 
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:scale-105"
            }`}
          >
            All Products
          </button>
          {productsData.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveTab(product.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-[16px] font-heading font-bold text-[14px] transition-all duration-300 ${
                activeTab === product.id 
                  ? "bg-[#0a0e17] text-white shadow-[0_8px_20px_rgba(10,14,23,0.2)] scale-105" 
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:scale-105"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${product.dotColor}`} />
              {product.shortTitle}
            </button>
          ))}
        </motion.div>

        {/* Product Card Container */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {activeTab === "all" ? (
              <motion.div 
                key="all"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-12 w-full"
              >
                {productsData.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full"
              >
                <ProductCard product={productsData.find((p) => p.id === activeTab)!} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-black/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_80px_rgba(42,196,244,0.15)] transition-all duration-700 group hover:-translate-y-1 grid grid-cols-1 lg:grid-cols-2">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <div className={`inline-flex self-start items-center border rounded-full px-4 py-1.5 mb-6 ${product.tagColor}`}>
          <span className="font-mono font-medium text-[11px] tracking-wider uppercase">
            {product.tag}
          </span>
        </div>
        
        <h2 className="font-heading font-bold text-[#0a0e17] text-[32px] md:text-[36px] tracking-tight mb-4 group-hover:text-[#2ac4f4] transition-colors duration-500">
          {product.title}
        </h2>
        
        <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
          {product.description}
        </p>

        {product.link && (
          <Link to={product.link} className="inline-block self-start mt-auto">
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
           <div className="mt-6 bg-slate-50 border border-black/[0.04] rounded-[16px] p-6 text-left">
             <p className="font-mono font-semibold text-[#64748b] text-[11px] tracking-wider mb-2 uppercase">
               {product.statusUpdate.title}
             </p>
             <p className="italic text-[#475569] text-[14px] leading-relaxed">
               {product.statusUpdate.text}
             </p>
           </div>
        )}
      </div>

      <div className="bg-[#0a0e17] min-h-[360px] lg:min-h-0 flex items-center justify-center relative overflow-hidden">
        {product.visualType === "image" ? (
          <div className="absolute inset-0">
            <img 
              src={product.visualUrl} 
              alt={product.title} 
              className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-1000 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a101d] group-hover:bg-[#0c1424] transition-colors duration-700">
             <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#2ac4f4 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
             
             <div className="relative flex items-center justify-center z-10 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                <div className="w-24 h-24 rounded-full border border-[#2ac4f4]/35 flex items-center justify-center bg-[#2ac4f4]/10 shadow-[0_0_24px_rgba(42,196,244,0.12)]">
                   <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-[#2ac4f4]">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
                </div>
             </div>
             <div className="mt-6 text-center z-10 px-6">
                <h4 className="font-mono text-[#2ac4f4] text-[12px] tracking-[2px] font-semibold uppercase group-hover:tracking-[4px] transition-all duration-700">In Development</h4>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
