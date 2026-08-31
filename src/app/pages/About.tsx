import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Linkedin, Play } from "lucide-react";

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
        content: "At Elevation Spine, John has been instrumental in the development of the Saber-C AVIA platform, specifically overseeing the engineering of the proprietary 3D-printed porous titanium interbody architecture. He partnered with leading academic researchers to generate the Walsh et al. NASSJ 2025 preclinical data demonstrating osseointegration and superior bone formation."
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
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember || videoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember, videoModalOpen]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      
      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#0c111e] rounded-[12px] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <p className="font-mono text-[#2ac4f4] text-xs uppercase tracking-widest font-semibold">Leadership Vision</p>
                  <h3 className="font-heading font-bold text-white text-xl">Charlie Gilbride — Company Vision & Clinical Philosophy</h3>
                </div>
                <button 
                  onClick={() => setVideoModalOpen(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black">
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src="https://res.cloudinary.com/mrjnagvc/video/upload/v1787015467/Trailer_v2B-HD_doraqy.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="p-6 bg-[#080c18] border-t border-white/[0.06]">
                <p className="text-white/70 text-sm leading-relaxed">
                  Hear directly from Founder & CEO Charlie Gilbride on why Elevation Spine was created to eliminate surgical complexity and deliver zero-profile procedural freedom.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#1a2535]" />
              </button>

              {/* Modal Left: Image & Quick Info */}
              <div className="relative w-full md:w-2/5 p-8 md:p-10 flex flex-col shrink-0 overflow-hidden text-white bg-[#0a0e17]">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="rounded-[8px] overflow-hidden mb-6 border border-white/20 shadow-2xl bg-white">
                    <img src={selectedMember.image} alt={selectedMember.name} decoding="async" className="w-full h-auto block object-contain" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-1">{selectedMember.name}</h3>
                  <p className="font-mono text-[#2ac4f4] text-xs uppercase tracking-wider mb-6 font-semibold">
                    {selectedMember.role}
                  </p>
                  
                  {/* LinkedIn Button */}
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto inline-flex items-center justify-center gap-3 bg-[#0077b5] text-white px-5 py-3 rounded-[5px] hover:bg-[#006097] hover:-translate-y-0.5 transition-all duration-200 font-bold text-[14px] w-full group border border-white/10"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Modal Right: Scrollable Bio Content */}
              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {selectedMember.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="font-heading font-bold text-[#1a2535] text-lg mb-2">{section.title}</h4>
                      <p className="text-[#4a5568] text-[15px] leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">

        {/* ═══ COMPANY OVERVIEW ═══ */}

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left max-w-3xl"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            About Elevation Spine
          </p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[44px] md:text-[56px] leading-[1.1] tracking-tight mb-5">
            Elevating the Standard of Spinal Fusion
          </h1>
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed">
            Elevation Spine is a medical device company focused on developing differentiated spinal fusion technologies. Through the proprietary Saber platform, the company combines integrated fixation, implant innovation, and streamlined instrumentation to help surgeons address cervical and lumbar fusion procedures.
          </p>
        </motion.div>

        {/* Mission / Technology / Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <div className="bg-white rounded-[8px] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06]">
            <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center mb-5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#2ac4f4]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-[#1a2535] text-xl mb-3">Our Mission</h3>
            <p className="text-[#4a5568] text-[15px] leading-relaxed">
              To redefine spinal fusion through thoughtfully engineered technologies that simplify procedural workflow while giving surgeons meaningful options for fixation and implant selection.
            </p>
          </div>

          <div className="bg-white rounded-[8px] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06]">
            <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center mb-5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#2ac4f4]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-[#1a2535] text-xl mb-3">Our Technology</h3>
            <p className="text-[#4a5568] text-[15px] leading-relaxed">
              Saber technology represents Elevation Spine's differentiated approach to integrated spinal fixation. The platform combines interbody technology, anterior plate architecture, and versatile fixation options within procedural systems designed around surgeon workflow.
            </p>
          </div>

          <div className="bg-white rounded-[8px] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06]">
            <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/20 flex items-center justify-center mb-5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#2ac4f4]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-[#1a2535] text-xl mb-3">Our Approach</h3>
            <ul className="text-[#4a5568] text-[15px] leading-relaxed space-y-2">
              <li className="flex items-start gap-2"><span className="text-[#2ac4f4] mt-1">•</span> Surgeon informed product development</li>
              <li className="flex items-start gap-2"><span className="text-[#2ac4f4] mt-1">•</span> Integrated fixation technologies</li>
              <li className="flex items-start gap-2"><span className="text-[#2ac4f4] mt-1">•</span> Streamlined instrumentation</li>
              <li className="flex items-start gap-2"><span className="text-[#2ac4f4] mt-1">•</span> Cervical and lumbar platform development</li>
              <li className="flex items-start gap-2"><span className="text-[#2ac4f4] mt-1">•</span> Direct collaboration with surgeons and distribution partners</li>
            </ul>
          </div>
        </motion.div>

        {/* ═══ LEADERSHIP TEAM ═══ */}

        {/* Team Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left max-w-3xl"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Meet The Team
          </p>
          <h2 className="font-heading font-bold text-[#1a2535] text-[32px] md:text-[40px] leading-[1.1] tracking-tight mb-4">
            Leadership
          </h2>
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed">
            A lean, focused team united by a commitment to developing meaningful spinal fusion technologies.
          </p>
        </motion.div>

        {/* Video Spotlight Feature Block (Charlie's Vision) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 bg-[#0a0e17] text-white rounded-[8px] border border-white/10 p-8 md:p-10 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1">
            <span className="font-mono text-[#2ac4f4] text-xs uppercase tracking-widest font-semibold block mb-2">
              Featured Video Message
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Company Vision & Clinical Philosophy
            </h2>
            <p className="text-white/70 text-[15px] max-w-2xl leading-relaxed">
              Founder & CEO Charlie Gilbride shares the origins of Elevation Spine and our commitment to surgeon-centric engineering that solves real operating room challenges.
            </p>
          </div>

          <button
            onClick={() => setVideoModalOpen(true)}
            className="shrink-0 flex items-center gap-3 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm px-7 py-3.5 rounded-[5px] shadow-[0_6px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch Charlie's Video</span>
          </button>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.06] group cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(42,196,244,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Photo container: Blue overlay by default, full color on hover with white background */}
              <div className="aspect-[4/5] overflow-hidden relative bg-white">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-all duration-500 scale-100 group-hover:scale-[1.03]"
                />
                {/* Blue overlay: active by default, fades out on hover */}
                <div className="absolute inset-0 bg-[#2ac4f4]/25 mix-blend-multiply transition-opacity duration-400 group-hover:opacity-0 pointer-events-none" />
                
                {/* Hover CTA pill */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="bg-[#0a0e17] text-white font-heading font-bold px-5 py-2 rounded-[4px] text-xs shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 border border-white/20">
                    Read Bio →
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-[#0a0e17] text-[19px] mb-1">
                  {member.name}
                </h3>
                <p className="font-mono text-[#0891b2] text-[11px] uppercase tracking-wider mb-3 font-semibold">
                  {member.role}
                </p>
                <p className="text-[#64748b] text-[14px] leading-relaxed line-clamp-3">
                  {member.shortBio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Culture Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 bg-white rounded-[8px] p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-black/[0.06]"
        >
          <h2 className="font-heading font-bold text-[#1a2535] text-[32px] md:text-[40px] leading-[1.1] tracking-tight mb-10 text-left">
            Company Culture & Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-heading font-bold text-[#0891b2] text-[18px] mb-2">Surgeon-Focused</h4>
              <p className="text-[#4a5568] text-[15px] leading-relaxed mb-6">
                We design every product with the operating room in mind. If a surgeon can't understand it or use it efficiently, we redesign it. Surgeon feedback is built into our development cycle from concept through launch.
              </p>
              
              <h4 className="font-heading font-bold text-[#0891b2] text-[18px] mb-2">Evidence-Driven</h4>
              <p className="text-[#4a5568] text-[15px] leading-relaxed">
                We don't make claims we can't support. Every innovation at Elevation Spine is backed by biomechanical data, regulatory approval, peer-reviewed research, or clinical feedback. We believe that science is our credibility.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[#0891b2] text-[18px] mb-2">Direct Engagement</h4>
              <p className="text-[#4a5568] text-[15px] leading-relaxed mb-6">
                We answer the phone. Our engineers speak directly with surgeons. Our leadership is accessible. We believe in feedback loops. Direct dialogue drives better products.
              </p>
              
              <h4 className="font-heading font-bold text-[#0891b2] text-[18px] mb-2">Speed + Discipline</h4>
              <p className="text-[#4a5568] text-[15px] leading-relaxed">
                We move quickly, but we don't cut corners on data or compliance. We balance startup velocity with medical device rigor.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
