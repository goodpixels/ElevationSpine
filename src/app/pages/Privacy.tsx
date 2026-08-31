import { motion } from "motion/react";
import { Link } from "react-router";

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">Legal</p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[48px] leading-[1.1] tracking-tight mb-6">
            Privacy Policy
          </h1>
          <div className="prose prose-slate max-w-none text-[#4a5568] text-[15px] leading-relaxed space-y-6">
            <p>
              Elevation Spine, Inc. ("Elevation Spine," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and disclose information when you visit our website or interact with our services.
            </p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Information We Collect</h2>
            <p>We may collect personal information you provide directly, including your name, email address, phone number, organization, and any messages you submit through our contact or inquiry forms.</p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, provide product information, process partnership or distribution requests, and improve our website and services.</p>
            <h2 className="font-heading font-bold text-[#1a2535] text-xl mt-8 mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:info@elevationspine.com" className="text-[#2ac4f4] hover:underline">info@elevationspine.com</a> or call <a href="tel:8444150226" className="text-[#2ac4f4] hover:underline">(844) 415-0226</a>.</p>
            <p className="text-sm text-[#94a3b8] mt-10">
              2511 Garden Road, Suite B125, Monterey, California 93940<br />
              Last updated: 2026
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
