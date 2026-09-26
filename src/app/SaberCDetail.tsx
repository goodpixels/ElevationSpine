import { Layers, GitFork, Square, Check } from "lucide-react";
import {
  AVIA,
  ClickToPlayVideo,
  ClosingCta,
  PrimaryButton,
  ProductLockup,
  SpikeDisclaimer,
  cldImage,
  cldPoster,
  cldVideo,
  contactHref,
  usePageMeta,
} from "./components/site.tsx";

// Hidden until John confirms (CONFIRM items in the v1 edits doc).
const SHOW_FIXATION_SIZES = false;
const SHOW_FIXATION_CORRIDOR = false;

const ANIMATION = "SaberC-FinalAnimation_na701a";

const bulletIcons = [Layers, GitFork, Square];

const components = [
  { label: "Porous Titanium Interbody", image: "avia-porous-body-top-down-small", spikes: false },
  { label: "Anterior Cervical Plate", image: "avia-beauty-05-plate-top-down", spikes: false },
  { label: "Spikes & Screws", image: "avia-el-spine-products-15", spikes: true, photo: true },
];

const specs = [
  { label: "Footprints", value: "12 × 15 mm, 14 × 17 mm" },
  { label: "Heights", value: "5–9 mm*" },
  { label: "Lordosis", value: "6° and 12°" },
];

const reasons = [
  {
    title: "Zero-Profile",
    body: "The implant sits flush with the vertebral body providing a zero-profile construct.",
    image: "avia-hero-825-338",
  },
  {
    title: "Fixation Options",
    body: "Saber-C AVIA accommodates both spike and screw fixation options, providing operative flexibility depending on your surgical goals and patient anatomy.",
    image: "avia-beauty-09-implant-construct-spikes-lateral",
  },
  {
    title: "Simplified Technique",
    body: "With its zero-profile plate and low-profile in-line fixation, Saber-C AVIA helps to simplify adjacent segment fusion.",
    image: "avia-tech-18-adjacent-segment-spikes",
  },
];

const sectionPad = "px-6 md:px-12 lg:px-16 py-20 md:py-24";

export default function SaberCDetail() {
  usePageMeta(
    "Saber-C AVIA™ ACDF Fixation System | Elevation Spine",
    "Saber-C AVIA is an anterior cervical fixation system combining porous 3D-printed titanium, plate-level stability, and spike or screw fixation."
  );

  return (
    <div className="bg-white font-sans">
      {/* 1. Hero */}
      <section className="atmos overflow-hidden text-white px-6 md:px-12 lg:px-16 pt-36 pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ProductLockup lockup={AVIA.lockup} descriptor={AVIA.descriptor} as="h1" size="lg" dark />
            <p className="font-heading font-bold text-[24px] md:text-[32px] leading-tight mt-8 text-[#7fd0ff]">
              Zero profile. Zero compromises. One tray.
            </p>
            <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed mt-5 max-w-[560px]">{AVIA.sentence}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <PrimaryButton to={contactHref("avia")}>Request Information</PrimaryButton>
            </div>
          </div>
          <div>
            <div className="idle-float">
              <img src={cldImage("avia-hero-231", 1600)} alt="Saber-C AVIA construct" className="w-full h-auto drop-shadow-[0_30px_60px_rgba(42,196,244,0.18)]" />
            </div>
            <SpikeDisclaimer dark className="mt-3 text-center" />
          </div>
        </div>
      </section>

      {/* 2. Animation */}
      <section className={`bg-gradient-to-b from-[#070b14] to-[#0c1626] text-white ${sectionPad}`}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-heading font-bold text-[30px] md:text-[40px] tracking-tight mb-8">See the System</h2>
          <ClickToPlayVideo
            src={cldVideo(ANIMATION)}
            poster={cldPoster(ANIMATION, 40)}
            title="Saber-C AVIA product animation"
          />
          <SpikeDisclaimer dark className="mt-3" />
        </div>
      </section>

      {/* 3. System overview */}
      <section className={`bg-white ${sectionPad}`}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[40px] tracking-tight mb-10">System Overview</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {AVIA.bullets.map((b, i) => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {components.map((c) => (
              <figure key={c.label}>
                <div className="lift bg-[#0f1520] rounded-[8px] aspect-[4/3] overflow-hidden">
                  <img src={cldImage(c.image, 900)} alt={c.label} loading="lazy" className={`w-full h-full ${"photo" in c ? "object-cover" : "object-contain p-6"}`} />
                </div>
                {c.spikes && <SpikeDisclaimer className="mt-2" />}
                <figcaption className="font-heading font-bold text-[#0a0e17] text-[16px] mt-3">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Specifications */}
      <section className={`bg-[#f8fafc] ${sectionPad}`}>
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[30px] md:text-[40px] tracking-tight mb-10">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 bg-white border border-black/[0.08] rounded-[8px] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08]">
            {specs.map((s) => (
              <div key={s.label} className="p-6 md:p-8 transition-colors duration-500 hover:bg-[#2ac4f4]/[0.04]">
                <p className="font-mono font-semibold uppercase tracking-[0.15em] text-[12px] text-[#0891b2] mb-2">{s.label}</p>
                <p className="font-heading font-bold text-[#0a0e17] text-[20px] md:text-[22px]">{s.value}</p>
              </div>
            ))}
          </div>
          {SHOW_FIXATION_SIZES && (
            <div className="mt-4 bg-white border border-black/[0.08] rounded-[8px] p-6 md:p-8">
              <p className="font-mono font-semibold uppercase tracking-[0.15em] text-[12px] text-[#0891b2] mb-2">Fixation</p>
              {/* Spike and screw sizes pending John. Do not reuse legacy Saber-C sizes. */}
            </div>
          )}
          <p className="italic text-[#64748b] text-[13px] leading-relaxed mt-4">
            * 12° interbodies available in 6–9 mm heights only. When used with spikes, supplemental fixation is required.
          </p>
        </div>
      </section>

      {/* 5. Fixation corridor (hidden until John confirms it applies to AVIA) */}
      {SHOW_FIXATION_CORRIDOR && (
        <section className={`bg-white ${sectionPad}`}>
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-heading font-bold text-[#0a0e17] text-[28px] md:text-[36px] tracking-tight max-w-[820px] mb-4">
              Saber-C AVIA Fixation Corridor Compared to Traditional Screw Fixation
            </h2>
            <p className="text-[#4a5568] text-[16px] md:text-[17px] leading-relaxed max-w-[760px] mb-10">
              Low-profile instrumentation combined with in-line spike fixation allows Saber-C AVIA to be used through a small incision while allowing easier access to hard-to-reach levels of the cervical spine.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <figure>
                <figcaption className="font-heading font-bold text-[#0a0e17] text-[18px] mb-3">Saber-C AVIA In-Line Spike Fixation</figcaption>
                <img src={cldImage("Saber-C-Fixation_go5mcv", 1200)} alt="Saber-C AVIA in-line spike fixation corridor" className="w-full rounded-[8px] border border-black/[0.06]" />
                <SpikeDisclaimer className="mt-2" />
                <ul className="flex flex-wrap gap-2 mt-4">
                  {["Minimized surgical exposure", "Reduced surgical steps", "Less challenging"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5 bg-[#2ac4f4]/10 text-[#0891b2] font-heading font-bold text-[12px] px-3 py-1.5 rounded-[4px]">
                      <Check className="w-3.5 h-3.5" /> {t}
                    </li>
                  ))}
                </ul>
              </figure>
              <figure>
                <figcaption className="font-heading font-bold text-[#0a0e17] text-[18px] mb-3">Traditional Screw Fixation</figcaption>
                <img src={cldImage("Traditional-Fixation_o0nuww", 1200)} alt="Traditional screw fixation corridor" className="w-full rounded-[8px] border border-black/[0.06]" />
              </figure>
            </div>
          </div>
        </section>
      )}

      {/* 6. Why surgeons choose it */}
      <section className={`bg-white ${sectionPad} border-t border-black/[0.05]`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r) => (
              <article key={r.title}>
                <div className="bg-[#0f1520] rounded-[8px] aspect-[4/3] overflow-hidden mb-5">
                  <img src={cldImage(r.image, 900)} alt="" loading="lazy" className="parallax-img w-full h-full object-cover" />
                </div>
                <h3 className="font-heading font-bold text-[#0a0e17] text-[22px] mb-2">{r.title}</h3>
                <p className="text-[#4a5568] text-[15px] md:text-[16px] leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
          <SpikeDisclaimer className="mt-8" />
        </div>
      </section>

      {/* 7. Closing call to action */}
      <ClosingCta product="avia" />
    </div>
  );
}
