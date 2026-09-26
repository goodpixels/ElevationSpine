import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Play } from "lucide-react";

// ─── Cloudinary ─────────────────────────────────────────────────────────────

const CLOUD = "https://res.cloudinary.com/mrjnagvc";

/** Optimized Cloudinary image URL by public ID. */
export function cldImage(publicId: string, width = 1600) {
  return `${CLOUD}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}

/** Cloudinary video URL by public ID (MP4, compressed). */
export function cldVideo(publicId: string) {
  return `${CLOUD}/video/upload/q_auto,vc_auto/${publicId}.mp4`;
}

/** Poster frame pulled from a Cloudinary video at `second`. */
export function cldPoster(publicId: string, second = 2, width = 1600) {
  return `${CLOUD}/video/upload/so_${second},f_auto,q_auto,w_${width}/${publicId}.jpg`;
}

// ─── Product names & shared copy ────────────────────────────────────────────

export const AVIA = {
  lockup: "SABER-C | AVIA™",
  descriptor: "ACDF FIXATION SYSTEM",
  sentence:
    "Saber-C AVIA is a complete anterior cervical fixation system combining porous 3D-printed titanium, plate-level stability, and the choice of spike or screw fixation.",
  bullets: [
    "Porous titanium architecture",
    "Spike + screw fixation options",
    "Zero-profile anterior cervical plate",
  ],
  href: "/saber-c",
  render: "avia-hero-231",
};

export const XA = {
  lockup: "SABER-XA™",
  descriptor: "EXPANDABLE ALIF SYSTEM",
  sentence:
    "Saber-XA is an expandable anterior lumbar interbody with independent height and lordosis adjustment, 3D-printed titanium endplates, and the choice of spike or screw fixation through an anterior plate.",
  bullets: [
    "Independent height + lordosis expansion",
    "Spike + screw fixation options",
    "Zero-profile anterior lumbar plate",
  ],
  href: "/saber-xa",
  render: "xa-hero-construct-316",
};

export const SPIKE_DISCLAIMER =
  "When Saber-C AVIA is used with spikes, supplemental fixation is required.";

/** Small italic line placed directly under any AVIA spike image. */
export function SpikeDisclaimer({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <p className={`font-sans italic text-[12px] leading-relaxed ${dark ? "text-white/50" : "text-[#64748b]"} ${className}`}>
      {SPIKE_DISCLAIMER}
    </p>
  );
}

/** Product name lockup with the descriptor directly underneath, in caps. */
export function ProductLockup({
  lockup,
  descriptor,
  as: Tag = "h2",
  size = "md",
  dark = false,
}: {
  lockup: string;
  descriptor: string;
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}) {
  const nameSize = {
    sm: "text-[24px] md:text-[28px]",
    md: "text-[30px] md:text-[36px]",
    lg: "text-[40px] md:text-[60px]",
  }[size];
  return (
    <div>
      <Tag className={`font-heading font-bold tracking-tight leading-[1.05] ${nameSize} ${dark ? "text-white" : "text-[#0a0e17]"}`}>
        {lockup}
      </Tag>
      <p className="font-mono font-semibold uppercase tracking-[0.18em] text-[12px] md:text-[13px] text-[#0891b2] mt-2">
        {descriptor}
      </p>
    </div>
  );
}

// ─── Page title & meta description ──────────────────────────────────────────

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}

// ─── Video: poster frame + click to play ────────────────────────────────────

export function ClickToPlayVideo({
  src,
  poster,
  title,
  captions,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  /** WebVTT captions URL, required for narrated videos. */
  captions?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) ref.current?.play().catch(() => {});
  }, [playing]);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-[8px] bg-black ${className}`}>
      {playing ? (
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        >
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <span className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2ac4f4] text-[#0a0e17] flex items-center justify-center shadow-[0_8px_30px_rgba(42,196,244,0.45)] group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 md:w-8 md:h-8 fill-current ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}

// ─── Buttons & layout bits ──────────────────────────────────────────────────

const btnBase =
  "inline-flex items-center justify-center gap-2 font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] transition-colors duration-200";

export function PrimaryButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className={`${btnBase} bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#6ecff4] shadow-[0_6px_20px_rgba(42,196,244,0.3)]`}>
      {children}
    </Link>
  );
}

export function SecondaryButton({ to, children, dark = true }: { to: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={`${btnBase} border ${dark ? "bg-white/10 text-white border-white/25 hover:bg-white/20" : "bg-white text-[#0a0e17] border-black/15 hover:bg-black/[0.03]"}`}
    >
      {children}
    </Link>
  );
}

/** Contact link with a product preselected on the form. */
export function contactHref(product?: "avia" | "xa", audience?: "distributor") {
  const params = new URLSearchParams();
  if (product) params.set("product", product);
  if (audience) params.set("audience", audience);
  params.set("section", "contact");
  return `/partners?${params.toString()}`;
}

/** Closing call-to-action band used on both product pages. */
export function ClosingCta({ product }: { product: "avia" | "xa" }) {
  return (
    <section className="bg-[#0a0e17] border-t border-white/10 px-6 md:px-12 lg:px-16 py-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2 className="font-heading font-bold text-white text-[28px] md:text-[36px] tracking-tight">
          Want more information?
        </h2>
        <PrimaryButton to={contactHref(product)}>Request Information</PrimaryButton>
      </div>
    </section>
  );
}
