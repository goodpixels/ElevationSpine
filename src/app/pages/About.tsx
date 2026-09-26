import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Linkedin } from "lucide-react";
import { ClickToPlayVideo, cldPoster, cldVideo, usePageMeta } from "../components/site.tsx";

// Charlie's company video. This is the only place it appears on the site.
const CEO_VIDEO = "Trailer_v2B-HD_doraqy";

const teamMembers = [
  {
    name: "Charlie Gilbride",
    role: "Founder, President & Chief Executive Officer",
    linkedin: "https://www.linkedin.com/in/charles-gilbride-3a027a2/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/f_auto,q_auto,w_800/v1785982841/Charlie_uxl45h.jpg",
    shortBio: "Founder, President, and CEO with 30+ years of medical device experience bringing the Saber® Technology platform to market.",
    sections: [
      {
        title: "Executive Profile",
        content: "Charlie Gilbride is the Founder, President, and Chief Executive Officer of Elevation Spine. He brings more than 30 years of medical device experience to the company, the majority of it in the spine field. Prior to founding Elevation Spine, Charlie held leadership roles at LDR Spine, ATEC Spine, and Spinal Motion, where he guided commercial organizations through numerous successful product launches as well as complex turnaround situations, building a reputation for driving growth in competitive markets. He founded Elevation Spine to bring the Saber® Technology platform to market — a streamlined, integrated approach to spinal fixation designed to reduce procedural steps and improve patient outcomes."
      },
      {
        title: "Industry Leadership",
        content: "Throughout his career in spine surgery, Charlie has developed deep insights into the gaps between what surgeons need in the operating room and what traditional implant systems deliver. He has held leadership roles at premier spine companies where he gained firsthand understanding of surgical workflow, implant biomechanics, and the critical importance of clinical evidence."
      },
      {
        title: "Vision for the Saber® Platform",
        content: "Charlie believes that spine surgery innovation should be grounded in three core principles: (1) Rigorous clinical evidence, not marketing hype; (2) Surgeon simplicity in the operating room; and (3) Direct engagement with the surgical community. Under his leadership, Elevation Spine has secured strategic funding, built a talented team of engineers and surgeons, and developed the Saber-C and Saber-XA platforms."
      }
    ]
  },
  {
    name: "John Kirwan",
    role: "Vice President, Research & Development",
    linkedin: "https://www.linkedin.com/in/john-kirwan-16744310/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/f_auto,q_auto,w_800/v1785982843/John_kbdj0n.jpg",
    shortBio: "Engineering leader overseeing product design, biomechanical testing, and clinical validation with 30+ years of experience.",
    sections: [
      {
        title: "Background",
        content: "John Kirwan is Vice President of R&D at Elevation Spine, bringing more than 30 years of comprehensive experience in the medical device industry, with more than 15 years focused specifically on the spine market. As the engineering and innovation leader for Elevation Spine, John oversees all research and development initiatives, from initial concept through commercial launch. His expertise spans product design, biomechanical testing, manufacturing partnerships, regulatory strategy, and clinical validation—ensuring that every Elevation Spine implant is backed by rigorous science and proven efficacy."
      },
      {
        title: "Professional Background",
        content: "John has held senior leadership positions at Blackstone Medical, a leading innovator in spinal technologies. He also served as founder and president of Incite Innovation, where he developed innovative spinal technologies, including an anchored cervical interbody device implant system. Throughout his career, John has successfully led the development and commercialization of medical devices from concept through manufacturing and full-scale launch. His deep expertise spans product engineering, quality systems, regulatory pathway strategy, manufacturing operations, and business development."
      },
      {
        title: "Key Expertise at Elevation",
        content: "At Elevation Spine, John has been instrumental in the development of the Saber-C AVIA platform, specifically overseeing the engineering of the proprietary 3D-printed porous titanium interbody architecture."
      },
      {
        title: "Education",
        content: "John holds a Master of Science in Materials Science and Engineering and a Bachelor of Science in Mechanical Engineering with a biomedical focus from Worcester Polytechnic Institute (WPI), one of the nation's premier engineering institutions."
      }
    ]
  },
  {
    name: "Zeke Isaacs",
    role: "Vice President, Sales & Distribution",
    linkedin: "https://www.linkedin.com/in/zeke-isaacs-2ab70942/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/f_auto,q_auto,w_800/v1785982840/Zeke_sbavfj.jpg",
    shortBio: "Commercial leader scaling national device distribution networks through clinical evidence and authentic surgeon relationships.",
    sections: [
      {
        title: "Background",
        content: "Zeke Isaacs is Vice President of Sales & Distribution at Elevation Spine, leading all commercial operations, distributor relationships, and market expansion initiatives. With extensive experience in spine device sales and distribution management, Zeke understands the dynamics of surgeon adoption, distributor incentives, and the critical role that product training and clinical support play in successful device launches. He is responsible for recruiting, training, and supporting the surgeon and distributor network that brings Elevation Spine's innovative implant systems to operating rooms across the country."
      },
      {
        title: "Professional Background",
        content: "Zeke brings a track record of building high-performing sales teams and scaling device distribution networks from regional to national scope. His experience spans both startup environments and established market leaders, giving him deep insight into what drives surgeon adoption in a competitive landscape. He understands that successful commercial launches require three elements: clear clinical differentiation, expert sales training, and authentic surgeon engagement."
      },
      {
        title: "Commercial Strategy at Elevation",
        content: "Zeke is focused on three strategic priorities for Elevation Spine: (1) Surgeon Education—building awareness of Elevation's clinical differentiation among high-volume ACDF surgeons; (2) Distributor Excellence—recruiting and retaining top-tier distributors who share Elevation's commitment to surgeon success; and (3) Early Adoption—identifying and supporting surgeon innovators."
      }
    ]
  },
  {
    name: "Jim Steinkotter",
    role: "Vice President, Operations (COO)",
    linkedin: "https://www.linkedin.com/in/jimsteinkoetter/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/f_auto,q_auto,w_800/v1785982845/Jim_rkea1f.jpg",
    shortBio: "Operational expert scaling supply chain and manufacturing operations with nearly 20 years of medical device experience.",
    sections: [
      {
        title: "Background",
        content: "Jim Steinkotter serves as Vice President of Operations for Elevation Spine, providing executive leadership across operations, supply chain, IT, human resources, sales operations, and strategic business initiatives. He is responsible for building the operational capabilities that support the company's continued growth while ensuring the highest standards of quality, compliance, and customer service. With nearly 20 years of leadership experience in the medical device industry, Jim brings a proven track record of scaling operations in high-growth environments."
      },
      {
        title: "Professional Background",
        content: "Jim's career spans high-growth startups through publicly traded global organizations. He has held leadership positions with respected spine companies including Surgalign, ConMed, NuVasive, and B. Braun/Aesculap—companies known for operational excellence and clinical innovation. Throughout his career, Jim has successfully led complex operational transformations, developed scalable supply chain organizations, and implemented enterprise ERP systems."
      },
      {
        title: "Education",
        content: "Jim holds a Bachelor of Science degree in Engineering Management from the Missouri University of Science & Technology, giving him a deep understanding of both engineering principles and business operations."
      }
    ]
  }
];


export default function About() {
  usePageMeta(
    "About | Elevation Spine",
    "Meet the leadership team at Elevation Spine, a Monterey, California spinal fusion company."
  );
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  // Prevent background scrolling when the bio modal is open
  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.97, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedMember.name}
              className="relative w-full max-w-5xl bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#1a2535]" />
              </button>

              <div className="relative w-full md:w-2/5 p-8 md:p-10 flex flex-col shrink-0 overflow-hidden text-white bg-[#0a0e17]">
                <div className="rounded-[8px] overflow-hidden mb-6 border border-white/20 shadow-2xl bg-white">
                  <img src={selectedMember.image} alt={selectedMember.name} decoding="async" className="w-full h-auto block object-contain" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-1">{selectedMember.name}</h3>
                <p className="font-mono text-[#2ac4f4] text-xs uppercase tracking-wider mb-6 font-semibold">{selectedMember.role}</p>
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-3 bg-[#0077b5] text-white px-5 py-3 rounded-[5px] hover:bg-[#006097] transition-colors font-bold text-[14px] w-full border border-white/10"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {selectedMember.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="font-heading font-bold text-[#1a2535] text-lg mb-2">{section.title}</h4>
                      <p className="text-[#4a5568] text-[15px] leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header. TODO: swap in the team/office photo from Martin when it arrives. */}
      <header className="bg-[#0a0e17] text-white px-6 md:px-12 lg:px-16 pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-heading font-bold text-[44px] md:text-[60px] leading-[1.05] tracking-tight mb-5">About Elevation Spine</h1>
          <p className="text-white/75 text-[17px] md:text-[19px] leading-relaxed max-w-2xl">
            Elevation Spine is a Monterey, California medical device company focused on spinal fusion.
          </p>
        </div>
      </header>

      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          {/* CEO video */}
          <div className="max-w-[1100px] mb-24">
            <ClickToPlayVideo
              src={cldVideo(CEO_VIDEO)}
              poster={cldPoster(CEO_VIDEO, 5)}
              title="Charlie Gilbride, Founder, President and CEO of Elevation Spine"
            />
          </div>

          {/* Leadership */}
          <h2 className="font-heading font-bold text-[#1a2535] text-[32px] md:text-[40px] leading-[1.1] tracking-tight mb-10">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <button
                type="button"
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className="text-left bg-white rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06] group cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(42,196,244,0.12)] transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-white w-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-[#0a0e17] text-[19px] mb-1">{member.name}</h3>
                  <p className="font-mono text-[#0891b2] text-[11px] uppercase tracking-wider mb-3 font-semibold">{member.role}</p>
                  <p className="text-[#64748b] text-[14px] leading-relaxed line-clamp-3">{member.shortBio}</p>
                  <span className="mt-4 font-heading font-semibold text-[13px] text-[#0891b2]">Read bio →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
