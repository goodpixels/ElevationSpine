import { Link } from "react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { AVIA, XA, ProductLockup, SpikeDisclaimer, cldImage, usePageMeta } from "../components/site.tsx";

function ProductCard({ product, spikeNote = false }: { product: typeof AVIA; spikeNote?: boolean }) {
  return (
    <div className="lift bg-white border border-black/[0.08] hover:border-[#2ac4f4]/40 rounded-[8px] overflow-hidden flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="bg-[#0f1520] aspect-[16/10]">
        <img src={cldImage(product.render, 1400)} alt={`${product.lockup} render`} className="w-full h-full object-contain p-8" />
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-1">
        {spikeNote && <SpikeDisclaimer className="-mt-3 mb-6" />}
        <ProductLockup lockup={product.lockup} descriptor={product.descriptor} />
        <ul className="flex flex-col gap-3 mt-6">
          {product.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 font-sans text-[#1a2535] text-[15px] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#2ac4f4] shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
        <p className="font-sans text-[#4a5568] text-[15px] md:text-[16px] leading-relaxed mt-6 mb-8">{product.sentence}</p>
        <Link
          to={product.href}
          className="btn-lift mt-auto self-start inline-flex items-center gap-2 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] hover:bg-[#6ecff4] transition-colors shadow-[0_6px_20px_rgba(42,196,244,0.3)]"
        >
          View System <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Products() {
  usePageMeta(
    "Products | Elevation Spine",
    "Explore the Saber-C AVIA™ ACDF fixation system and the Saber-XA™ expandable ALIF system."
  );

  return (
    <div className="pt-36 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-12 max-w-3xl">
          <h1 className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[56px] leading-[1.1] tracking-tight">Our Systems</h1>
          <p className="text-[#4a5568] text-[16px] md:text-[18px] leading-relaxed mt-4">
            Cervical and lumbar fusion systems from Elevation Spine.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductCard product={AVIA} spikeNote />
          <ProductCard product={XA} />
        </div>
      </div>
    </div>
  );
}
