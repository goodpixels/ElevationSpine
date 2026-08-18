import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { TextRevealTitle } from "../App.tsx";

const productsData = [
  {
    id: "saber-c",
    shortTitle: "Saber-C | AVIA™",
    dotColor: "bg-[#2ac4f4]",
    title: "Saber-C | AVIA™",
    logoUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg",
    description: "Complete anterior cervical fixation system combining zero-profile stability with the flexibility to choose spike or screw fixation—no instrument switching required.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787014799/SaberXA_lyih36.png",
    link: "/saber-c",
    cta: "View Device Details",
  },
  {
    id: "saber-xa",
    shortTitle: "Saber-XA™",
    dotColor: "bg-[#0891b2]",
    title: "Saber-XA™",
    description: "The first and only 3D-printed titanium expandable ALIF implant with true intra-operative customization of height and lordosis, integrated anterior plating, and comprehensive fixation options.",
    visualType: "image",
    visualUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787015670/SABER_X-A_ylfzww.png",
    link: "/saber-xa",
    cta: "View Device Details",
  },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-left"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Product Portfolio
          </p>
          <TextRevealTitle
            as="h1"
            text="Engineered for procedural simplicity"
            className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[56px] leading-[1.1] tracking-tight max-w-3xl"
          />
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed mt-4 max-w-2xl">
            Streamlined spinal implants engineered to reduce operating room steps, eliminate secondary plating, and optimize biological fusion.
          </p>
        </motion.div>

        {/* Product Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-start gap-3 mb-10"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[8px] font-heading font-bold text-[14px] transition-all duration-200 cursor-pointer ${
              activeTab === "all" 
                ? "bg-[#0a0e17] text-white shadow-sm" 
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            All Systems
          </button>
          {productsData.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveTab(product.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[4px] font-heading font-bold text-[14px] transition-all duration-200 cursor-pointer ${
                activeTab === product.id 
                  ? "bg-[#0a0e17] text-white shadow-sm" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${product.dotColor}`} />
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-10 w-full"
              >
                {productsData.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
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
  const CardWrapper = product.link ? Link : "div";

  return (
    <CardWrapper
      to={product.link}
      className="block relative bg-white rounded-[8px] overflow-hidden border border-black/[0.08] hover:border-[#2ac4f4]/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(42,196,244,0.16)] hover:-translate-y-1.5 transition-all duration-300 ease-out group grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
    >
      {/* Subtle top cyan line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ac4f4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Left Content */}
      <div className="p-8 md:p-12 lg:col-span-6 flex flex-col justify-center relative z-10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${product.dotColor} shadow-sm group-hover:scale-125 transition-transform duration-300`} />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {product.shortTitle} Platform
            </span>
          </div>
          {product.logoUrl && (
            <div className="bg-[#0a0e17] px-3 py-1.5 rounded-[5px] border border-black/10 shadow-sm flex items-center shrink-0">
              <img 
                src={product.logoUrl} 
                alt={`${product.title} Logo`} 
                className="h-4 sm:h-5 w-auto object-contain"
              />
            </div>
          )}
        </div>

        <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[36px] tracking-tight mb-4 group-hover:text-[#0891b2] transition-colors duration-300 flex items-center justify-between">
          <span>{product.title}</span>
        </h2>
        
        <p className="text-[#4a5568] text-[15px] md:text-[16px] leading-relaxed mb-8">
          {product.description}
        </p>

        {product.link && (
          <div className="inline-flex self-start mt-auto">
            <span className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-7 py-3 rounded-[4px] shadow-[0_4px_16px_rgba(42,196,244,0.3)] group-hover:shadow-[0_6px_22px_rgba(42,196,244,0.45)] group-hover:bg-[#6ecff4] transition-all duration-200 flex items-center gap-2">
              <span>{product.cta}</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
            </span>
          </div>
        )}
      </div>

      {/* Right Image Container */}
      <div className="bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2f6] min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] lg:col-span-6 flex items-center justify-center relative overflow-hidden p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-200/70">
        {product.visualType === "image" ? (
          <div className="w-full h-full flex items-center justify-center relative">
            <img 
              src={product.visualUrl} 
              alt={product.title} 
              className="max-h-[260px] sm:max-h-[320px] md:max-h-[360px] w-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_22px_45px_rgba(0,0,0,0.18)] group-hover:scale-[1.04] group-hover:-translate-y-1 transition-all duration-400 ease-out" 
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/60 rounded-[6px] p-8 border border-dashed border-slate-300">
            <div className="relative flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-[6px] border border-[#2ac4f4]/40 flex items-center justify-center bg-[#2ac4f4]/10 shadow-[0_0_24px_rgba(42,196,244,0.15)] group-hover:scale-110 transition-transform duration-300">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-[#0891b2]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-center z-10 px-4">
              <h4 className="font-mono text-[#0891b2] text-[12px] tracking-[2px] font-bold uppercase">In Development</h4>
            </div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
