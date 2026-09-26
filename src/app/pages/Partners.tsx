import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { CheckCircle2, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { ClickToPlayVideo, cldImage, cldPoster, cldVideo, usePageMeta } from "../components/site.tsx";

// Zeke's recruitment video. TODO: replace with the final export (the current
// file has a burned-in timecode) and add captions.
const RECRUITMENT_VIDEO = "distributor-promotional-video";

type Audience = "Distributor" | "Surgeon" | "ASC";

const audienceLabels: Record<Audience, string> = {
  Distributor: "Distributor Agency",
  Surgeon: "Clinical / Surgeon",
  ASC: "ASC Facility",
};

const productOptions = [
  { value: "", label: "General inquiry" },
  { value: "avia", label: "Saber-C AVIA" },
  { value: "xa", label: "Saber-XA" },
];

const inputClass =
  "bg-[#f8fafc] border border-black/[0.12] rounded-[4px] px-4 py-3 text-[14px] text-[#0a0e17] focus:outline-none focus:border-[#2ac4f4] focus:ring-2 focus:ring-[#2ac4f4]/20 transition-colors";
const labelClass = "font-mono text-[#475569] text-[11px] uppercase tracking-widest font-semibold";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ContactForm({ initialAudience, initialProduct }: { initialAudience: Audience; initialProduct: string }) {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const [product, setProduct] = useState(initialProduct);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => setAudience(initialAudience), [initialAudience]);
  useEffect(() => setProduct(initialProduct), [initialProduct]);

  const orgLabel = audience === "Distributor" ? "Agency Name" : audience === "Surgeon" ? "Hospital / Practice Name" : "ASC Facility Name";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.set("form-name", "contact");
    data.set("audience", audience);
    try {
      // Netlify Forms: the matching static form lives in index.html.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center bg-emerald-50 rounded-[6px] border border-emerald-200 p-8" role="status">
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-[#0a0e17]">Thank you</h3>
        <p className="text-[#64748b] text-[15px] mt-2 max-w-md leading-relaxed">We received your message and will be in touch.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex border-b border-black/[0.08] mb-8 pb-3 gap-2 overflow-x-auto" role="tablist" aria-label="I am a">
        {(Object.keys(audienceLabels) as Audience[]).map((type) => (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={audience === type}
            onClick={() => setAudience(type)}
            className={`py-2.5 px-4 font-heading text-[14px] font-semibold rounded-[4px] transition-colors cursor-pointer whitespace-nowrap ${
              audience === type ? "bg-[#0a0e17] text-white" : "text-[#64748b] hover:text-[#0a0e17] hover:bg-black/[0.04]"
            }`}
          >
            {audienceLabels[type]}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} name="contact">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="contact-first-name" label="First Name" required>
            <input id="contact-first-name" name="first-name" type="text" required autoComplete="given-name" className={inputClass} />
          </Field>
          <Field id="contact-last-name" label="Last Name" required>
            <input id="contact-last-name" name="last-name" type="text" required autoComplete="family-name" className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="contact-email" label="Work Email" required>
            <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClass} />
          </Field>
          <Field id="contact-phone" label="Phone Number">
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="contact-organization" label={orgLabel} required>
            <input id="contact-organization" name="organization" type="text" required autoComplete="organization" className={inputClass} />
          </Field>
          <Field id="contact-territory" label="State / Territory" required>
            <input id="contact-territory" name="territory" type="text" required className={inputClass} />
          </Field>
        </div>

        <Field id="contact-product" label="Product of Interest">
          <select id="contact-product" name="product" value={product} onChange={(e) => setProduct(e.target.value)} className={inputClass}>
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field id="contact-message" label="Message" required>
          <textarea id="contact-message" name="message" rows={4} required className={`${inputClass} resize-none`} />
        </Field>

        {status === "error" && (
          <p className="text-[14px] text-red-600" role="alert">
            Something went wrong. Please try again or email info@elevationspine.com.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-lift w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] py-4 rounded-[4px] mt-2 shadow-[0_6px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          Submit <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function Partners() {
  usePageMeta(
    "Partners & Contact | Elevation Spine",
    "Contact Elevation Spine or learn about becoming a distribution partner."
  );

  const [params, setParams] = useSearchParams();
  const contactRef = useRef<HTMLElement>(null);

  const audienceParam = params.get("audience");
  const initialAudience: Audience = audienceParam === "distributor" ? "Distributor" : "Surgeon";
  const productParam = params.get("product");
  const initialProduct = productParam === "avia" || productParam === "xa" ? productParam : "";

  useEffect(() => {
    if (params.get("section") === "contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [params]);

  const becomePartner = () => setParams({ audience: "distributor", section: "contact" });

  return (
    <div className="min-h-screen bg-white">
      {/* Partner header */}
      <section className="atmos text-white px-6 md:px-12 lg:px-16 pt-36 pb-20 md:pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading font-bold text-[44px] md:text-[56px] leading-[1.08] tracking-tight mb-5">Partner With Us</h1>
            <p className="text-white/75 text-[17px] md:text-[18px] leading-relaxed max-w-[560px] mb-8">
              Elevation Spine is expanding its network of independent distributors. If you work with spine surgeons in your territory, we would like to talk.
            </p>
            <button
              type="button"
              onClick={becomePartner}
              className="btn-lift inline-flex items-center gap-2 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] hover:bg-[#6ecff4] shadow-[0_6px_20px_rgba(42,196,244,0.3)] cursor-pointer"
            >
              Become a Partner <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <figure>
            <ClickToPlayVideo
              src={cldVideo(RECRUITMENT_VIDEO)}
              poster={cldPoster(RECRUITMENT_VIDEO, 8)}
              title="Partner with Elevation Spine: Zeke Isaacs, Sales"
            />
            <figcaption className="font-sans text-white/60 text-[14px] mt-3">Zeke Isaacs, Sales</figcaption>
          </figure>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="scroll-mt-28 px-6 md:px-12 lg:px-16 py-20 md:py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="font-heading font-bold text-[#0a0e17] text-[36px] md:text-[44px] tracking-tight">Contact</h2>
              <p className="text-[#4a5568] text-[17px] md:text-[18px] mt-2">Want more information?</p>
            </div>
            <div className="rounded-[8px] overflow-hidden bg-[#0f1520] aspect-[16/10]">
              <img src={cldImage("xa-el-spine-products-23", 1200)} alt="Saber-XA interbody and plate" className="parallax-img w-full h-full object-cover" loading="lazy" />
            </div>
            <address className="not-italic flex flex-col gap-3 text-[15px] text-[#1a2535]">
              <a href="tel:8444150226" className="flex items-center gap-3 hover:text-[#0891b2]">
                <Phone className="w-4 h-4 text-[#0891b2]" /> (844) 415-0226
              </a>
              <a href="mailto:info@elevationspine.com" className="flex items-center gap-3 hover:text-[#0891b2]">
                <Mail className="w-4 h-4 text-[#0891b2]" /> info@elevationspine.com
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0891b2] mt-1 shrink-0" />
                2511 Garden Road, Suite B125, Monterey, California 93940
              </p>
            </address>
          </div>

          <div className="lg:col-span-7 bg-white rounded-[8px] p-8 md:p-12 border border-black/[0.06] shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
            <ContactForm initialAudience={initialAudience} initialProduct={initialProduct} />
          </div>
        </div>
      </section>
    </div>
  );
}
