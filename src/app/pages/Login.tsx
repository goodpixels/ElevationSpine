import { Link } from "react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { contactHref, usePageMeta } from "../components/site.tsx";

// Partner-only shared folder (Google Drive or SharePoint). Access is granted
// per partner email by the Elevation Spine team, so the provider handles the
// login and nothing is public. Paste the folder link here.
export const PARTNER_PORTAL_URL = "";

// The home hero loop, blurred by Cloudinary (not the browser) and scaled
// down, so the background costs ~120 KB and no GPU filter work.
const BG_LOOP =
  "https://res.cloudinary.com/mrjnagvc/video/upload/so_7,du_12,e_blur:200,q_auto:low,vc_auto,w_960,ac_none/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4";
const BG_POSTER =
  "https://res.cloudinary.com/mrjnagvc/video/upload/so_7,e_blur:200,f_auto,q_auto,w_960/Saber-C_Porous_Websiteloop_Final_sk3y6y.jpg";

export default function Login() {
  usePageMeta(
    "Partner Portal | Elevation Spine",
    "Partner Portal access for Elevation Spine distributors and sales representatives."
  );

  return (
    <div className="relative isolate min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-[#070b14]">
      {/* Blurred product loop behind a dark blue wash */}
      <video
        className="absolute inset-0 -z-20 w-full h-full object-cover scale-110"
        src={BG_LOOP}
        poster={BG_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(8,30,52,0.25),rgba(7,11,20,0.78))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_80%_20%,rgba(42,196,244,0.18),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1a2e]/40 via-transparent to-[#070b14]/70" />

      <div className="w-full max-w-[480px] rounded-[12px] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="h-[4px] w-full bg-[#2ac4f4]" />
        <div className="p-8 md:p-10">
          <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center mb-6">
            <Lock className="w-5 h-5 text-[#2ac4f4]" />
          </div>
          <h1 className="font-heading font-bold text-white text-[28px] md:text-[32px] tracking-tight mb-3">Partner Portal</h1>
          <p className="text-white/65 text-[15px] leading-relaxed mb-8">
            Product documents for Elevation Spine partners. Sign in with the email address your access was granted to.
          </p>

          <div className="flex flex-col gap-3">
            {PARTNER_PORTAL_URL && (
              <a
                href={PARTNER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex items-center justify-center gap-2 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] hover:bg-[#6ecff4] shadow-[0_6px_20px_rgba(42,196,244,0.3)]"
              >
                Open Partner Portal <ArrowUpRight className="w-4 h-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <Link
              to={contactHref(undefined, "distributor")}
              className={`btn-lift inline-flex items-center justify-center gap-2 font-heading font-bold text-[14px] px-7 py-3.5 rounded-[4px] ${
                PARTNER_PORTAL_URL
                  ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  : "bg-[#2ac4f4] text-[#0a0e17] hover:bg-[#6ecff4]"
              }`}
            >
              Request access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
