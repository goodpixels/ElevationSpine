import { MoveVertical, GitFork, Square } from "lucide-react";
import {
  XA,
  ClickToPlayVideo,
  ClosingCta,
  PrimaryButton,
  ProductLockup,
  cldImage,
  cldPoster,
  cldVideo,
  contactHref,
  usePageMeta,
} from "./components/site.tsx";

// The XA animation is in production. When it arrives, set its Cloudinary
// public ID here and the "See the System" section appears. No placeholder.
const XA_ANIMATION: string | null = null;

// Jim to approve the indications wording before it goes live.
const SHOW_INDICATIONS = false;

const bulletIcons = [MoveVertical, GitFork, Square];

const components = [
  { label: "Expandable Interbody", image: "xa-expandable-hero" },
  { label: "Anterior Lumbar Plate", image: "xa-plate-34x11" },
  { label: "Construct", image: "xa-construct-updated-opaque" },
];

const specs = [
  {
    title: "Expandable Interbody",
    image: "xa-expandable-expanded-side-view",
    lines: ["Footprints: 26D × 34W, 28D × 37W, 30D × 40W", "Starting heights: 11, 13, 16 mm"],
  },
  { title: "Anterior Lumbar Plate", image: "xa-plate-37x13-angled", lines: ["Footprints: 34, 37, 40 mm"] },
  { title: "Spikes", image: "xa-5-0-x-20-spike", lines: ["Diameter: 5.0 mm", "Lengths: 20, 22.5, 25 mm"] },
  { title: "Screws", image: "xa-5-0-x-20-screw", lines: ["Diameters: 5.0 & 5.5 mm", "Lengths: 20, 25, 30 mm"] },
];

const sectionPad = "px-6 md:px-12 lg:px-16 py-20 md:py-24";

export default function SaberXADetail() {
  usePageMeta(
    "Saber-XA™ Expandable ALIF System | Elevation Spine",
    "Saber-XA is an expandable anterior lumbar interbody with independent height and lordosis adjustment and spike or screw fixation."
  );

  return (
    <div className="bg-white font-sans">
      {/* 1. Hero */}
      <section className="atmos overflow-hidden text-white px-6 md:px-12 lg:px-16 pt-36 pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ProductLockup lockup={XA.lockup} descriptor={XA.descriptor} as="h1" size="lg" dark />
            <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed mt-8 max-w-[560px]">{XA.sentence}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <PrimaryButton to={contactHref("xa")}>Request Information</PrimaryButton>
            </div>
          </div>
          <div className="idle-float">
            <img src={cldImage("xa-hero-construct-316", 1600)} alt="Saber-XA construct" className="w-full h-auto drop-shadow-[0_30px_60px_rgba(42,196,244,0.18)]" />
          </div>
        </div>
      </section>

      {/* 2. Animation (hidden until the XA animation is delivered) */}
      {XA_ANIMATION && (
        <section className={`bg-gradient-to-b from-[#070b14] to-[#0c1626] text-white ${sectionPad}`}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-heading font-bold text-[30px] md:text-[40px] tracking-tight mb-8">See the System</h2>
            <ClickToPlayVideo src={cldVideo(XA_ANIMATION)} poster={cldPoster(XA_ANIMATION, 5)} title="Saber-XA product animation" />
          </div>
        </section>
      )}

      {/* 3. System overview */}
      <section className={`bg-white ${sectionPad}`}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[40px] tracking-tight mb-10">System Overview</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {XA.bullets.map((b, i) => {
              const Icon = bulletIcons[i];
              return (
                <li key={b} className="flex items-center gap-4 bg-[#f8fafc] border border-black/[0.06] rounded-[8px] px-6 py-5">
                  <span className="w-11 h-11 rounded-[6px] bg-[#2ac4f4]/10 border border-[#2ac4f4]/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#0891b2]" />
                  </span>
                  <span className="font-heading font-semibold text-[#0a0e17] text-[16px]">{b}</span>
                </li>
              );
            })}
          </ul>
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed max-w-[900px] mb-12">
            The Saber-XA™ Expandable Interbody provides intra-operative flexibility through independent adjustment of implant height and lordosis, allowing surgeons to customize the construct based on patient anatomy. Featuring 3D-printed titanium endplates, the interbody is available in three footprints with three sizes per footprint, providing a broad range of height and lordosis configurations, including hyperlordotic options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {components.map((c) => (
              <figure key={c.label}>
                <div className="lift bg-[#0f1520] rounded-[8px] aspect-[4/3] overflow-hidden">
                  <img src={cldImage(c.image, 900)} alt={c.label} loading="lazy" className="w-full h-full object-contain p-6" />
                </div>
                <figcaption className="font-heading font-bold text-[#0a0e17] text-[16px] mt-3">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Specifications: four cards, two by two on mobile */}
      <section className={`bg-[#f8fafc] ${sectionPad}`}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[40px] tracking-tight mb-10">Specifications</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {specs.map((s) => (
              <div key={s.title} className="lift bg-white border border-black/[0.08] hover:border-[#2ac4f4]/40 rounded-[8px] overflow-hidden flex flex-col">
                <div className="bg-[#0f1520] aspect-[4/3]">
                  <img src={cldImage(s.image, 700)} alt={s.title} loading="lazy" className="w-full h-full object-contain p-4" />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-heading font-bold text-[#0a0e17] text-[15px] md:text-[18px] mb-2">{s.title}</h3>
                  {s.lines.map((l) => (
                    <p key={l} className="text-[#4a5568] text-[13px] md:text-[14px] leading-relaxed">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Fixation options */}
      <section className={`bg-white ${sectionPad}`}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[40px] tracking-tight mb-4">Spike or Screw Fixation</h2>
          <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed max-w-[760px] mb-10">
            Saber-XA accommodates both spike and screw fixation options, providing operative flexibility depending on surgical goals and patient anatomy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure>
              <div className="bg-[#0f1520] rounded-[8px] aspect-[16/10] overflow-hidden">
                <img src={cldImage("xa-el-spine-products-18", 1200)} alt="Saber-XA spikes" loading="lazy" className="parallax-img w-full h-full object-cover" />
              </div>
              <figcaption className="font-heading font-semibold text-[#0a0e17] text-[15px] mt-3">Spikes, in-line spike fixation</figcaption>
            </figure>
            <figure>
              <div className="bg-[#0f1520] rounded-[8px] aspect-[16/10] overflow-hidden">
                <img src={cldImage("xa-el-spine-products-16", 1200)} alt="Saber-XA screws" loading="lazy" className="parallax-img w-full h-full object-cover" />
              </div>
              <figcaption className="font-heading font-semibold text-[#0a0e17] text-[15px] mt-3">Screws, straight and angled instruments</figcaption>
            </figure>
          </div>

          {/* 6. Indications */}
          {SHOW_INDICATIONS && (
            <p className="text-[#64748b] text-[13px] leading-relaxed mt-8 max-w-[900px]">
              Saber-XA is indicated for anterior and oblique lateral approaches, L1–S1. Refer to the Instructions for Use for complete indications, contraindications, precautions, and warnings.
            </p>
          )}
        </div>
      </section>

      {/* 7. Closing call to action */}
      <ClosingCta product="xa" />
    </div>
  );
}
