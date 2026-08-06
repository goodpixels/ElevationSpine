import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Charlie Gilbride",
    role: "Chief Executive Officer & Co-Founder",
    linkedin: "https://www.linkedin.com/in/charles-gilbride-3a027a2/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1785982841/Charlie_uxl45h.jpg",
    shortBio: "Visionary founder of Elevation Spine, dedicated to simplifying complex spinal fusion through surgeon-centric implant design.",
    sections: [
      {
        title: "Background",
        content: "Charlie Gilbride is the visionary founder and Chief Executive Officer of Elevation Spine. With extensive experience in the medical device industry, Charlie established Elevation Spine with a singular mission: to simplify complex spinal fusion procedures through innovative, surgeon-centric implant design. His strategic leadership and deep relationships within the spine surgery community have positioned Elevation Spine as an emerging leader in integrated fixation technology."
      },
      {
        title: "Professional Background",
        content: "Throughout his career in spine surgery, Charlie has developed deep insights into the gaps between what surgeons need in the operating room and what traditional implant systems deliver. He has held leadership roles at premier spine companies where he gained firsthand understanding of surgical workflow, implant biomechanics, and the critical importance of clinical evidence. His approach to product development is fundamentally surgeon-centric: every design decision is evaluated through the lens of OR simplicity and clinical efficacy."
      },
      {
        title: "Vision for Elevation Spine",
        content: "Charlie believes that spine surgery innovation should be grounded in three core principles: (1) Rigorous clinical evidence, not marketing hype; (2) Surgeon simplicity in the operating room; and (3) Direct engagement with the surgical community. Under his leadership, Elevation Spine has secured strategic funding, built a talented team of engineers and surgeons, and developed two distinct platforms—Saber-C AVIA and Saber-C APEX—that address different surgeon priorities and surgical challenges. Charlie is committed to making Elevation Spine the trusted partner for surgeons who demand both innovation and reliability."
      },
      {
        title: "Personal",
        content: "When not driving innovation in spine surgery, Charlie is an active speaker at major spine conferences including NASS (North American Spine Society) and CSRS (Cervical Spine Research Society). He is passionate about building advisory relationships with leading spine surgeons and values direct feedback from the surgical community."
      }
    ]
  },
  {
    name: "John Kirwan",
    role: "Vice President, Research & Development",
    linkedin: "https://www.linkedin.com/in/john-kirwan-16744310/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1785982843/John_kbdj0n.jpg",
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
        content: "At Elevation Spine, John has been instrumental in the development of the Saber-C APEX platform, specifically overseeing the engineering of the proprietary 3D-printed porous titanium interbody architecture. He partnered with leading academic researchers to generate the Walsh et al. NASSJ 2025 preclinical data demonstrating osseointegration and superior bone formation. John's R&D philosophy is rooted in evidence-based design: the implant is only as good as the science behind it. He believes that rigorous biomechanical testing, validated preclinical models, and peer-reviewed publication are non-negotiable standards for spinal implants."
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
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1785982840/Zeke_sbavfj.jpg",
    shortBio: "Commercial leader scaling national device distribution networks through clinical evidence and authentic surgeon relationships.",
    sections: [
      {
        title: "Background",
        content: "Zeke Isaacs is Vice President of Sales & Distribution at Elevation Spine, leading all commercial operations, distributor relationships, and market expansion initiatives. With extensive experience in spine device sales and distribution management, Zeke understands the dynamics of surgeon adoption, distributor incentives, and the critical role that product training and clinical support play in successful device launches. He is responsible for recruiting, training, and supporting the surgeon and distributor network that brings Elevation Spine's innovative implant systems to operating rooms across the country."
      },
      {
        title: "Professional Background",
        content: "Zeke brings a track record of building high-performing sales teams and scaling device distribution networks from regional to national scope. His experience spans both startup environments and established market leaders, giving him deep insight into what drives surgeon adoption in a competitive landscape. He understands that successful commercial launches require three elements: clear clinical differentiation, expert sales training, and authentic surgeon engagement. Zeke's approach is grounded in the principle that the best sales tool is the truth—equipping reps with peer-reviewed data, clear evidence of differentiation, and real-world surgeon testimonials rather than aggressive discounting or hype."
      },
      {
        title: "Commercial Strategy at Elevation",
        content: "Zeke is focused on three strategic priorities for Elevation Spine: (1) Surgeon Education—building awareness of Elevation's clinical differentiation (peer-reviewed data, simplified workflow, innovative design) among high-volume ACDF surgeons; (2) Distributor Excellence—recruiting and retaining top-tier distributors who share Elevation's commitment to surgeon success over volume-at-all-costs; and (3) Early Adoption—identifying and supporting surgeon innovators who want to be among the first to adopt Elevation's next-generation porous titanium platforms and contribute to ongoing clinical outcome tracking. He views each distributor partnership as a strategic alignment around clinical innovation and surgeon support."
      },
      {
        title: "Leadership Philosophy",
        content: "Zeke believes that transparency and data-driven selling are the cornerstones of sustainable growth in the spine market. Rather than competing on price or marketing flash, Elevation Spine competes on clinical evidence, surgical simplicity, and authentic surgeon relationships. He is committed to building a distributor network that understands Elevation's innovation story and can articulate it credibly to surgeons."
      }
    ]
  },
  {
    name: "Jim Steinkotter",
    role: "Vice President, Operations (COO)",
    linkedin: "https://www.linkedin.com/in/jimsteinkoetter/",
    image: "https://res.cloudinary.com/mrjnagvc/image/upload/v1785982845/Jim_rkea1f.jpg",
    shortBio: "Operational expert scaling supply chain and manufacturing operations with nearly 20 years of medical device experience.",
    sections: [
      {
        title: "Background",
        content: "Jim Steinkotter serves as Vice President of Operations for Elevation Spine, providing executive leadership across operations, supply chain, IT, human resources, sales operations, and strategic business initiatives. He is responsible for building the operational capabilities that support the company's continued growth while ensuring the highest standards of quality, compliance, and customer service. With nearly 20 years of leadership experience in the medical device industry, Jim brings a proven track record of scaling operations in high-growth environments and navigating the complex regulatory landscape of medical device manufacturing."
      },
      {
        title: "Professional Background",
        content: "Jim's career spans high-growth startups through publicly traded global organizations. He has held leadership positions with respected spine companies including Surgalign, ConMed, NuVasive, and B. Braun/Aesculap—companies known for operational excellence and clinical innovation. Throughout his career, Jim has successfully led complex operational transformations, developed scalable supply chain organizations, implemented enterprise ERP systems, and built data-driven planning and business intelligence capabilities that improve organizational decision-making. His expertise spans procurement, manufacturing, quality assurance, logistics, regulatory compliance, and business operations."
      },
      {
        title: "Operational Philosophy at Elevation",
        content: "Jim's approach is grounded in lean operations and disciplined execution. He believes that operational excellence enables innovation—by removing friction from internal processes, the entire team can focus on what matters most: product development, clinical validation, and surgeon success. His focus on budgeting, resource allocation, and process efficiency ensures that Elevation's investments are deployed strategically and deliver measurable results. Jim plays a critical role in strategic planning meetings, ensuring that operational realities inform product timelines, distributor expansion plans, and commercial ambitions, while maintaining the rigor required for a medical device company."
      },
      {
        title: "Leadership Presence",
        content: "Jim is known internally for his directness, operational transparency, and commitment to data-driven decision-making. He balances innovation speed with execution discipline, ensuring that Elevation Spine can move quickly while maintaining the compliance and quality standards that medical device companies require. His team-oriented approach and focus on cross-functional collaboration have been instrumental in building Elevation Spine's operational foundation."
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc]">
      
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
              className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#1a2535]" />
              </button>

              {/* Modal Left: Image & Quick Info (Glassmorphic) */}
              <div className="relative w-full md:w-2/5 p-8 md:p-12 flex flex-col shrink-0 overflow-hidden text-white">
                {/* Dynamic Glassmorphic Background */}
                <div className="absolute inset-0 z-0">
                  <img src={selectedMember.image} alt="Background blur" className="w-full h-full object-cover blur-2xl opacity-50 scale-125" />
                  <div className="absolute inset-0 bg-[#0a0e17]/60 backdrop-blur-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-transparent" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="rounded-2xl overflow-hidden mb-8 border border-white/20 shadow-2xl bg-white/5">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-auto block object-contain" />
                  </div>
                  <h3 className="font-heading font-bold text-3xl mb-2">{selectedMember.name}</h3>
                  <p className="font-mono text-[#2ac4f4] text-sm uppercase tracking-wider mb-6 font-semibold">
                    {selectedMember.role}
                  </p>
                  
                  {/* LinkedIn Button - Made Prominent */}
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto inline-flex items-center justify-center gap-3 bg-[#0077b5] text-white px-6 py-4 rounded-xl hover:bg-[#006097] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,119,181,0.3)] transition-all duration-300 font-bold text-[15px] w-full group border border-white/10"
                  >
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Modal Right: Scrollable Bio Content */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <div className="flex flex-col gap-8">
                  {selectedMember.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="font-heading font-bold text-[#1a2535] text-xl mb-3">{section.title}</h4>
                      <p className="text-[#4a5568] text-base leading-relaxed">
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

      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <p className="font-mono text-[#2ac4f4] text-[13px] font-semibold tracking-widest mb-3 uppercase">
            Meet The Team
          </p>
          <h1 className="font-heading font-bold text-[#1a2535] text-[48px] md:text-[64px] leading-[1.1] tracking-tight mb-6">
            Leadership
          </h1>
          <p className="text-[#4a5568] text-[18px] leading-relaxed">
            We are a lean, focused team united by a single mission: make complex spine surgery simple without sacrificing outcomes.
          </p>
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
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(42,196,244,0.1)] transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <div className="absolute inset-0 bg-[#2ac4f4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="bg-white text-[#1a2535] font-heading font-bold px-6 py-2 rounded-full text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Read Bio
                  </span>
                </div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-[#0a0e17] text-[20px] mb-1">
                  {member.name}
                </h3>
                <p className="font-mono text-[#2ac4f4] text-[11px] uppercase tracking-wider mb-4 font-semibold">
                  {member.role}
                </p>
                <p className="text-[#64748b] text-[14px] leading-relaxed line-clamp-3 mb-6">
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
          className="mt-32 bg-white rounded-[32px] p-10 md:p-16 shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-black/[0.04]"
        >
          <h2 className="font-heading font-bold text-[#1a2535] text-[36px] md:text-[48px] leading-[1.1] tracking-tight mb-12 text-center">
            Company Culture & Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-heading font-bold text-[#2ac4f4] text-[20px] mb-3">Surgeon-Focused</h4>
              <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                We design every product with the operating room in mind. If a surgeon can't understand it or use it efficiently, we redesign it. Surgeon feedback is built into our development cycle from concept through launch.
              </p>
              
              <h4 className="font-heading font-bold text-[#2ac4f4] text-[20px] mb-3">Evidence-Driven</h4>
              <p className="text-[#4a5568] text-[16px] leading-relaxed">
                We don't make claims we can't support. Every innovation at Elevation Spine is backed by biomechanical data, regulatory approval, peer-reviewed research, or clinical feedback. We believe that science is our credibility.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-[#2ac4f4] text-[20px] mb-3">Direct Engagement</h4>
              <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                We answer the phone. Our engineers speak directly with surgeons. Our leadership is accessible. We believe in feedback loops. This isn't a company where surgeons talk to reps who talk to engineers. Direct dialogue drives better products.
              </p>
              
              <h4 className="font-heading font-bold text-[#2ac4f4] text-[20px] mb-3">Speed + Discipline</h4>
              <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                We move quickly, but we don't cut corners on data or compliance. We balance startup velocity with medical device rigor. Our small size is an asset—decisions happen fast—but we maintain the standards that patients and surgeons depend on.
              </p>

              <h4 className="font-heading font-bold text-[#2ac4f4] text-[20px] mb-3">Hiring Philosophy</h4>
              <p className="text-[#4a5568] text-[16px] leading-relaxed">
                We hire for mission alignment first, domain expertise second. We want people who believe that spine surgery can be better, simpler, more reproducible.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
