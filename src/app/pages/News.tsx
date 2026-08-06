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
    date: "June 25, 2026",
    title: "Elevation Spine Surpasses 5,000 Saber-C® Implantations",
    excerpt: "Announces the Saber-C® platform surpassing 5,000 implantations, highlights surgeon adoption, integrated fixation technology, and mentions a next-generation Saber-C update expected later in 2026. Quotes from CEO Charles Gilbride and Dr. Tien Le.",
    category: "Press Release",
    content: [
      "**Elevation Spine Surpasses 5,000 Saber-C® Implantations, Marking a Significant Milestone for Its Integrated Cervical Fixation Platform**",
      "MONTEREY, Calif.–(BUSINESS WIRE)–Elevation Spine announced today that its Saber-C Anterior Cervical Fusion System has surpassed 5,000 implantations, a milestone that reflects growing surgeon adoption of its proprietary integrated-fixation approach to anterior cervical discectomy and fusion (ACDF). The Saber-C system combines the stability of traditional anterior cervical plating with the streamlined workflow of a zero-profile interbody construct through its proprietary Saber™ in-line spike fixation technology.",
      "“Five thousand implantations is more than a number. It’s five thousand data points from surgeons in the OR telling us what works, what they need, and where to go next. That feedback has shaped every iteration of this platform. It’s the foundation we build on, and it’s what gives us confidence that what we’re bringing to market is exactly what spine surgeons have been asking for.”",
      "— Charlie Gilbride, CEO, Elevation Spine",
      "“I’ve used Saber-C across a range of cases and the consistency is what stands out. The spike fixation deploys predictably, the workflow is clean, and I’m not managing a separate plating step. Five thousand implantations speaks for itself, this system has earned its track record.”",
      "— Tien Le, MD, Total Spine & Brain Institute",
      "One of the few zero-profile ACDF systems cleared as an anterior cervical plate, Saber-C provides surgeons with a stronger foundation than standalone interbody classification alone. Its in-line spike fixation technology enables single-step simultaneous deployment at both endplates, reducing procedural complexity without compromising stability. The system supports both spike and screw fixation options and offers seven total points of fixation, a profile exclusive to the Saber-C platform.",
      "As the platform crosses the 5,000-implantation threshold, Elevation Spine looks ahead to the next chapter of the Saber-C system, with a next-generation update anticipated for commercial launch later this year.",
      "**About Elevation Spine**",
      "Elevation Spine is a Monterey, CA-based developer of integrated-fixation spinal technologies. The Saber platform integrates fixation and interbody support across the cervical and lumbar spine. elevationspine.com"
    ]
  },
  {
    date: "January 12, 2025",
    title: "Elevation Spine Receives FDA 510(k) Clearance for Saber-C AVIA™",
    excerpt: "A complete anterior cervical fixation system with a porous 3D-printed titanium interbody has been cleared by the FDA.",
    category: "Regulatory",
    content: [
      "MONTEREY, Calif.–(BUSINESS WIRE)–Elevation Spine today announced that the U.S. Food and Drug Administration (FDA) has granted 510(k) Clearance for Saber-C® AVIA™, the newest product line in the Saber platform. Saber-C AVIA is engineered as a zero-profile anterior cervical discectomy and fusion (ACDF) construct with the biomechanical stability historically associated with traditional plating and features a porous 3D-printed titanium interbody with both spike and screw fixation options.",
      "“Our dedicated Saber-C surgeon community gave us valuable feedback, and those conversations shaped what came next,” said Charlie Gilbride, CEO of Elevation Spine. “We focused on purposeful instrumentation, a porous 3D titanium implant supported by preclinical research, and thoughtful refinements that build on the strengths of the original platform. Our size is one of our greatest advantages. We stay close to our surgeon network, move quickly on their feedback, and remain focused on delivering meaningful innovation where it matters most.”",
      "The new system design provides a slim, lower-profile workflow, with additions and refinements across multiple instruments. The majority of the core Saber-C spike instruments have been updated for more precise spike delivery, while new Saber-C screw instruments have been added, including a very low-profile screw inserter. Saber-C AVIA ships with both spike and screw instrumentation in a single tray for every case, offering maximum versatility in the operating room. The result is a system that can help support a full range of ACDF cases, all in one kit.",
      "The porous 3D-printed titanium interbody has a 55% porosity lattice architecture engineered to mimic trabecular bone. The porous structure of Saber-C AVIA is associated with bone ingrowth in preclinical data¹. The implant is available in 6° lordotic and 12° hyperlordotic options with a large central graft window.",
      "Saber-C AVIA is available immediately for surgical use in the United States.",
      "¹ Data on file",
      "**About Elevation Spine**",
      "Elevation Spine, headquartered in Monterey, CA, is the leading spinal medical device developer of integrated-fixation technologies. The Saber Technology platform integrates zero-profile, anterior cervical plate fixation with interbody support in the cervical spine. Saber systems are designed to simplify surgical workflow while improving patient outcomes. elevationspine.com"
    ]
  },
  {
    date: "March 15, 2025",
    title: "Preclinical Data on Saber-C® Porous Titanium Architecture Published in NASSJ",
    excerpt: "New preclinical research authored by Walsh et al. highlights the osseointegration and superior bone formation capabilities of Elevation Spine's proprietary 3D-printed porous titanium interbody architecture.",
    category: "Clinical Research",
    link: "#"
  },
  {
    date: "September 05, 2024",
    title: "Elevation Spine to Showcase Saber Platform at Annual Spine Society Meetings",
    excerpt: "CEO Charlie Gilbride and the Elevation Spine team will be actively engaging with the surgical community and showcasing the latest advancements in integrated fixation technology at upcoming major spine conferences.",
    category: "Events",
    link: "#"
  },
  {
    date: "May 10, 2024",
    title: "Elevation Spine Appoints Jim Steinkotter as Vice President of Operations",
    excerpt: "Medical device industry veteran Jim Steinkotter joins Elevation Spine to lead operations, supply chain, and strategic business initiatives as the company prepares for its next phase of commercial growth.",
    category: "Leadership",
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
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-white relative">
      
      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#1a2535]" />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[#64748b] text-[12px] uppercase tracking-widest">{selectedArticle.date}</span>
                  <span className="bg-[#2ac4f4]/10 text-[#0891b2] font-mono font-medium text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">{selectedArticle.category}</span>
                </div>
                
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0a0e17] leading-tight mb-8 pb-8 border-b border-black/10">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex flex-col gap-6 text-[#4a5568] text-lg leading-relaxed">
                  {selectedArticle.content?.map((paragraph, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            <motion.a
              href={item.link || "#"}
              target={item.link && item.link !== "#" && !item.content ? "_blank" : undefined}
              rel={item.link && item.link !== "#" && !item.content ? "noopener noreferrer" : undefined}
              onClick={(e) => handleArticleClick(item, e)}
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#f8fafc] border border-black/[0.06] rounded-[24px] p-8 flex flex-col justify-between hover:shadow-[0_20px_48px_rgba(42,196,244,0.1)] hover:border-[#2ac4f4]/35 hover:-translate-y-1 transition-all duration-300 cursor-pointer block group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest">{item.date}</span>
                  <span className="bg-[#2ac4f4]/10 text-[#0891b2] font-mono font-medium text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-heading font-bold text-[#0a0e17] text-[22px] leading-snug mb-4 group-hover:text-[#2ac4f4] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#4a5568] text-[15px] leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-8 text-[#2ac4f4] font-heading font-semibold text-[14px] flex items-center gap-2">
                {item.content ? "Read full press release" : "Read full article"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
