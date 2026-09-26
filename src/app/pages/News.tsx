import { ArrowUpRight } from "lucide-react";
import { cldImage, usePageMeta } from "../components/site.tsx";
import { pressReleases, type PressRelease } from "../data/news.ts";

/** A published press release: image, date, headline, link out in a new tab. */
export function NewsCard({ item }: { item: PressRelease }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="lift group bg-[#f8fafc] border border-black/[0.06] rounded-[8px] overflow-hidden flex flex-col hover:border-[#2ac4f4]/50"
    >
      <div className="aspect-[16/9] bg-[#0f1520] overflow-hidden">
        <img
          src={cldImage(item.image, 900)}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <p className="font-mono text-[#64748b] text-[11px] uppercase tracking-widest mb-3">{item.date}</p>
        <h3 className="font-heading font-bold text-[#0a0e17] text-[18px] leading-snug mb-5 group-hover:text-[#0891b2] transition-colors">
          {item.headline}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 font-heading font-semibold text-[13px] text-[#0891b2]">
          Read press release <ArrowUpRight className="w-3.5 h-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
}

export default function News() {
  usePageMeta("News | Elevation Spine", "Company announcements and product news from Elevation Spine.");

  return (
    <div className="pt-36 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-heading font-bold text-[#1a2535] text-[44px] md:text-[56px] leading-[1.1] tracking-tight mb-12">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressReleases.map((item) => (
            <NewsCard key={item.url} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
