import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  link?: string;
  content?: string[];
};

const newsItems: NewsItem[] = [
  {
    date: "August 10, 2026",
    title: "Elevation Spine Receives FDA 510(k) Clearance for Saber-XA™",
    excerpt: "An Expandable Anterior Lumbar Interbody Fusion (ALIF) System with integrated plating and true intra-operative customization.",
    category: "Regulatory",
    link: "https://www.businesswire.com/news/home/20260810424617/en/Elevation-Spine-Receives-FDA-510k-Clearance-for-Saber-XA-an-Expandable-Anterior-Lumbar-Interbody-Fusion-ALIF-System",
    content: [
      "**Elevation Spine Receives FDA 510(k) Clearance for Saber-XA™, an Expandable Anterior Lumbar Interbody Fusion (ALIF) System**",
      "MONTEREY, Calif.–(BUSINESS WIRE)–Elevation Spine today announced that the U.S. Food and Drug Administration (FDA) has granted 510(k) Clearance for Saber-XA™, its first-in-class 3D-printed titanium expandable ALIF platform.",
      "Saber-XA™ represents a major technological leap for anterior lumbar surgery, offering true intra-operative customization of both implant height (9–16mm) and lordosis (up to 20°), paired with integrated anterior plate fixation and dual spike/screw flexibility.",
      "“We engineered Saber-XA to eliminate the compromises of traditional static ALIF sizing,” said Charlie Gilbride, Founder, President & CEO of Elevation Spine. “Surgeons can now dial in patient-specific height and lordosis right inside the disc space while reducing vessel retract time and multiple instrument passes.”",
      "Featuring a 70% porous PorOss™ 3D-printed titanium lattice architecture with 300–600μm interconnected pore sizing, Saber-XA accelerates biological bone ingrowth and construct stability.",
      "Commercial rollout of the Saber-XA™ platform is scheduled to commence across select US spine centers in Q4 2026.",
      "**About Elevation Spine**",
      "Elevation Spine develops cutting-edge integrated-fixation spinal systems designed to streamline operating room workflow and improve patient outcomes. elevationspine.com"
    ]
  },
  {
    date: "July 28, 2026",
    title: "Elevation Spine Receives FDA 510(k) Clearance for Saber-C AVIA™",
    excerpt: "A complete anterior cervical fixation system with a porous 3D-printed titanium interbody has been cleared by the FDA.",
    category: "Regulatory",
    link: "https://www.businesswire.com/news/home/20260728765422/en/Elevation-Spine-Receives-FDA-510k-Clearance-for-Saber-C-AVIA-A-Complete-Anterior-Cervical-Fixation-System-with-a-Porous-3D-Printed-Titanium-Interbody",
    content: [
      "**Elevation Spine Receives FDA 510(k) Clearance for Saber-C AVIA™, a Complete Anterior Cervical Fixation System with a Porous 3D-Printed Titanium Interbody**",
      "MONTEREY, Calif.–(BUSINESS WIRE)–Elevation Spine today announced that the U.S. Food and Drug Administration (FDA) has granted 510(k) Clearance for Saber-C AVIA™, the flagship anterior cervical platform in the Saber product family.",
      "Saber-C AVIA™ is engineered as a zero-profile anterior cervical discectomy and fusion (ACDF) construct with the biomechanical stability historically associated with traditional plating, featuring a porous 3D-printed titanium interbody with both spike and screw fixation options.",
      "“Our dedicated Saber-C surgeon community gave us valuable feedback, and those conversations shaped what came next,” said Charlie Gilbride, Founder, President & CEO of Elevation Spine. “We focused on purposeful instrumentation, a porous 3D titanium implant supported by preclinical research, and thoughtful refinements that build on the strengths of the original platform.”",
      "Saber-C AVIA™ ships with both spike and screw instrumentation in a single tray for every case, offering maximum versatility in the operating room without instrument switching.",
      "Saber-C AVIA™ is available immediately for surgical use in the United States.",
      "**About Elevation Spine**",
      "Elevation Spine, headquartered in Monterey, CA, is the leading spinal medical device developer of integrated-fixation technologies. elevationspine.com"
    ]
  },
  {
    date: "June 22, 2026",
    title: "Elevation Spine Surpasses 5,000 Saber-C AVIA™ Implantations",
    excerpt: "Marking a significant milestone for its integrated cervical fixation platform, highlighting surgeon adoption and next-generation advancements.",
    category: "Press Release",
    link: "https://www.businesswire.com/news/home/20260622253536/en/Elevation-Spine-Surpasses-5000-Saber-C-Implantations-Marking-a-Significant-Milestone-for-Its-Integrated-Cervical-Fixation-Platform",
    content: [
      "**Elevation Spine Surpasses 5,000 Saber-C AVIA™ Implantations, Marking a Significant Milestone for Its Integrated Cervical Fixation Platform**",
      "MONTEREY, Calif.–(BUSINESS WIRE)–Elevation Spine announced today that its Saber-C AVIA™ Anterior Cervical Fusion System has surpassed 5,000 implantations, a milestone that reflects growing surgeon adoption of its proprietary integrated-fixation approach to anterior cervical discectomy and fusion (ACDF).",
      "“Five thousand implantations is more than a number. It’s five thousand data points from surgeons in the OR telling us what works, what they need, and where to go next,” said Charlie Gilbride, Founder, President & CEO of Elevation Spine.",
      "“I’ve used Saber-C AVIA™ across a range of cases and the consistency is what stands out. The spike fixation deploys predictably, the workflow is clean, and I’m not managing a separate plating step,” noted Dr. Tien Le, MD, Total Spine & Brain Institute.",
      "**About Elevation Spine**",
      "Elevation Spine is a Monterey, CA-based developer of integrated-fixation spinal technologies. elevationspine.com"
    ]
  },
  {
    date: "March 15, 2025",
    title: "Preclinical Data on Saber-C AVIA™ Porous Titanium Architecture Published in NASSJ",
    excerpt: "New preclinical research authored by Walsh et al. highlights the osseointegration and superior bone formation capabilities of Elevation Spine's proprietary 3D-printed porous titanium interbody architecture.",
    category: "Clinical Research",
    link: "https://www.nassjournal.org"
  },
  {
    date: "September 05, 2024",
    title: "Elevation Spine to Showcase Saber Platform at Annual Spine Society Meetings",
    excerpt: "CEO Charlie Gilbride and the Elevation Spine team will be actively engaging with the surgical community and showcasing the latest advancements in integrated fixation technology at upcoming major spine conferences.",
    category: "Events",
    link: "#"
  },
  {
    date: "September 19, 2022",
    title: "Elevation Spine, Inc. Closes $11 Million Series B Financing",
    excerpt: "Financing led by Technology Venture Partners with participation from Mutual Capital Partners. Funds earmarked for commercial expansion of Saber-C and future Saber platform development.",
    category: "Press Release",
    link: "#"
  }
];

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedArticle]);

  const handleArticleClick = (item: NewsItem, e: React.MouseEvent) => {
    if (item.content) {
      e.preventDefault();
      setSelectedArticle(item);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-white relative">
      
      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-[10px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#1a2535]" />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[#64748b] text-[12px] uppercase tracking-widest">{selectedArticle.date}</span>
                  <span className="bg-[#2ac4f4]/10 text-[#0891b2] font-mono font-medium text-[11px] px-3 py-1 rounded-[3px] uppercase tracking-wider">{selectedArticle.category}</span>
                </div>
                
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0a0e17] leading-tight mb-6 pb-6 border-b border-black/10">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex flex-col gap-5 text-[#4a5568] text-[15px] md:text-[16px] leading-relaxed">
                  {selectedArticle.content?.map((paragraph, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Company Updates
          </p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[44px] md:text-[56px] leading-[1.1] tracking-tight mb-4">
            News & Press
          </h1>
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed max-w-2xl">
            Recent announcements, clinical publications, regulatory clearances, and milestones from Elevation Spine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, idx) => (
            <motion.a
              href={item.link || "#"}
              target={item.link && item.link !== "#" && !item.content ? "_blank" : undefined}
              rel={item.link && item.link !== "#" && !item.content ? "noopener noreferrer" : undefined}
              onClick={(e) => handleArticleClick(item, e)}
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#f8fafc] border border-black/[0.06] rounded-[8px] p-7 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(42,196,244,0.12)] hover:border-[#2ac4f4]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer block group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">{item.date}</span>
                  <span className="bg-[#2ac4f4]/10 text-[#0891b2] font-mono font-medium text-[10px] px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-heading font-bold text-[#0a0e17] text-[20px] leading-snug mb-3 group-hover:text-[#0891b2] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-[14px] leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/[0.04] text-[#0891b2] font-heading font-semibold text-[13px] flex items-center gap-2">
                {item.content ? "Read full press release" : "Read full article"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
