import { motion } from "motion/react";
import { Link } from "react-router";

export default function FDANotices() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">Regulatory</p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[48px] leading-[1.1] tracking-tight mb-6">
            FDA Notices
          </h1>
          <div className="prose prose-slate max-w-none text-[#4a5568] text-[15px] leading-relaxed space-y-6">
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-4 mb-3">Saber-C AVIA™</h2>
            <p>
              Saber-C AVIA™ has received FDA 510(k) clearance as an anterior cervical interbody fusion device. The device is intended for use in skeletally mature patients for anterior cervical interbody fusion at one or two contiguous levels from C2 to T1.
            </p>
            <p>
              When Saber-C AVIA™ is used with spikes, supplemental fixation is required. Please refer to the Instructions for Use for a complete list of indications, contraindications, warnings, and precautions.
            </p>

            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Saber-XA™</h2>
            <p>
              Saber-XA™ has received FDA 510(k) clearance as an expandable anterior lumbar interbody fusion device. Please refer to the Instructions for Use for a complete list of indications, contraindications, warnings, and precautions.
            </p>

            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">General Notice</h2>
            <p>
              The products described on this website are FDA-cleared medical devices intended for use by trained healthcare professionals. Product performance claims are based on bench testing, preclinical studies, and/or clinical data as referenced. Individual patient results may vary.
            </p>
            <p className="text-sm text-[#94a3b8] mt-10">
              For complete regulatory and product information, please contact Elevation Spine at <a href="mailto:info@elevationspine.com" className="text-[#2ac4f4] hover:underline">info@elevationspine.com</a> or call <a href="tel:8444150226" className="text-[#2ac4f4] hover:underline">(844) 415-0226</a>.
            </p>
          </div>
          <div className="mt-10">
            <Link to="/" className="text-[#2ac4f4] font-heading font-semibold text-sm hover:underline">← Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
