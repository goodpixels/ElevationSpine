import { motion } from "motion/react";
import { Link } from "react-router";
import { usePageMeta } from "../components/site.tsx";

export default function Legal() {
  usePageMeta("Legal Disclaimer | Elevation Spine", "Legal disclaimer for the Elevation Spine website.");
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[800px] mx-auto">
        <motion.div initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">Legal</p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[48px] leading-[1.1] tracking-tight mb-6">
            Legal Disclaimer
          </h1>
          <div className="prose prose-slate max-w-none text-[#4a5568] text-[15px] leading-relaxed space-y-6">
            <p>
              The information contained on this website is provided by Elevation Spine, Inc. for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Medical Device Information</h2>
            <p>
              Product information presented on this website is intended for healthcare professionals and authorized distributors. It is not intended as medical advice and should not be used as a substitute for the professional judgment of a qualified healthcare provider.
            </p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Product Usage</h2>
            <p>
              When Saber-C AVIA™ is used with spikes, supplemental fixation is required. Please refer to the Instructions for Use for a complete list of indications, contraindications, warnings, and precautions for all Elevation Spine products.
            </p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of Elevation Spine, Inc. and is protected by United States and international intellectual property laws.
            </p>
            <p className="text-sm text-[#94a3b8] mt-10">
              © 2026 Elevation Spine, Inc. All rights reserved.<br />
              2511 Garden Road, Suite B125, Monterey, California 93940
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
