import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AVIA, XA, ProductLockup, PrimaryButton, SecondaryButton, SpikeDisclaimer, cldImage, contactHref, usePageMeta } from "../components/site.tsx";
import { pressReleases } from "../data/news.ts";
import { NewsCard } from "./News.tsx";

// Short, muted, compressed cut of the Saber-C animation loop (~0.6 MB).
const HERO_LOOP =
  "https://res.cloudinary.com/mrjnagvc/video/upload/so_7,du_12,q_auto:low,vc_auto,w_1600,ac_none/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4";
const HERO_POSTER =
  "https://res.cloudinary.com/mrjnagvc/video/upload/so_7,f_auto,q_auto,w_1600/Saber-C_Porous_Websiteloop_Final_sk3y6y.jpg";

function Hero() {
  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[92vh] bg-[#0a0e17] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_LOOP}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/90 via-[#0a0e17]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/80 via-[#0a0e17]/25 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pb-24 min-h-[75vh] md:min-h-[92vh]">
        <div className="max-w-[640px]">
          <h1 className="font-heading font-bold text-[42px] md:text-[60px] lg:text-[68px] text-white leading-[1.03] mb-5 tracking-tight">
            Traditional Fusion Redefined
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] text-white/80 leading-relaxed mb-8 max-w-[560px]">
            Through proprietary Saber technology, Elevation Spine enables surgeons to perform spinal fusion more efficiently through a less invasive approach.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton to="/products">Explore Products</PrimaryButton>
            <SecondaryButton to={contactHref()}>Contact Us</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemCard({
  product,
  linkLabel,
  imageNote,
}: {
  product: typeof AVIA;
  linkLabel: string;
  imageNote?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-black/[0.08] rounded-[8px] overflow-hidden flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <Link to={product.href} className="block bg-[#0f1520] aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <img
          src={cldImage(product.render, 1200)}
          alt=""
          className="w-full h-full object-contain p-6 hover:scale-[1.03] transition-transform duration-500"
        />
      </Link>
      <div className="p-7 md:p-9 flex flex-col flex-1">
        {imageNote}
        <ProductLockup lockup={product.lockup} descriptor={product.descriptor} as="h3" size="sm" />
        <p className="font-sans text-[#4a5568] text-[15px] md:text-[16px] leading-relaxed mt-4 mb-6">{product.sentence}</p>
        <Link
          to={product.href}
          className="mt-auto inline-flex items-center gap-2 font-heading font-bold text-[14px] text-[#0891b2] hover:text-[#0a0e17] transition-colors self-start"
        >
          {linkLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function OurSystems() {
  return (
    <section id="products" className="bg-[#f8fafc] px-6 md:px-12 lg:px-16 py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-bold text-[#0a0e17] text-[32px] md:text-[44px] tracking-tight mb-10">Our Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <SystemCard
            product={AVIA}
            linkLabel="View Saber-C AVIA"
            imageNote={<SpikeDisclaimer className="-mt-2 mb-5" />}
          />
          <SystemCard product={XA} linkLabel="View Saber-XA" />
        </div>
      </div>
    </section>
  );
}

function LatestNews() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-16 py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="font-heading font-bold text-[#0a0e17] text-[32px] md:text-[44px] tracking-tight">News</h2>
          <Link to="/news" className="inline-flex items-center gap-2 font-heading font-bold text-[14px] text-[#0891b2] hover:text-[#0a0e17] transition-colors whitespace-nowrap">
            View All News <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pressReleases.slice(0, 3).map((item) => (
            <NewsCard key={item.url} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Elevation Spine | Cervical and Lumbar Fusion Systems",
    "Elevation Spine designs spinal fusion systems, including Saber-C AVIA™ for ACDF and the Saber-XA™ expandable ALIF system."
  );

  return (
    <>
      <Hero />
      <OurSystems />
      <LatestNews />
    </>
  );
}
