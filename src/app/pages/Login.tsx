import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";

const BG_PORTAL = "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783571259/ChatGPT_Image_Jul_8_2026_11_27_26_PM_kiso5y.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("email");

    setTimeout(() => {
      localStorage.setItem("elevation_sales_auth", "true");
      localStorage.setItem("elevation_sales_user", email || "sales.rep@elevationspine.com");
      setIsLoading(null);
      navigate("/resources");
    }, 600);
  };

  const handleSSOLogin = (provider: "google" | "apple") => {
    setIsLoading(provider);

    setTimeout(() => {
      localStorage.setItem("elevation_sales_auth", "true");
      localStorage.setItem(
        "elevation_sales_user",
        provider === "google" ? "alex.salesrep@gmail.com" : "sales.rep@icloud.com"
      );
      setIsLoading(null);
      navigate("/resources");
    }, 700);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_PORTAL})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-sm" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[460px] px-6"
      >
        <Link to="/" className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183292/Elevation-Logo-ForAnimations_xlwquh.svg"
            alt="Elevation Spine"
            className="h-[44px] w-auto object-contain brightness-0 invert"
          />
        </Link>

        <div
          className="overflow-hidden rounded-[28px]"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          {/* Cyan top bar */}
          <div className="h-[4px] w-full bg-[#2ac4f4]" />

          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading font-bold text-white text-[26px] md:text-[28px] tracking-tight">
                Sales Portal Login
              </h3>
              <span className="bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 text-[#7fd0ff] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase shrink-0">
                Sales Reps Only
              </span>
            </div>
            <p className="text-white/50 text-[14px] mb-6">
              Access commercial collateral, price lists, order forms & clinical decks.
            </p>

            {/* SSO Social Logins (Google & Apple) */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleSSOLogin("google")}
                disabled={isLoading !== null}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-sm hover:border-white/30"
              >
                {isLoading === "google" ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                )}
                <span>{isLoading === "google" ? "Connecting to Google..." : "Continue with Google Account"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSSOLogin("apple")}
                disabled={isLoading !== null}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-sm hover:border-white/30"
              >
                {isLoading === "apple" ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.04.24-9.97-1.78-14.8-6.05-3.18-2.75-7.07-7.44-11.66-14.07-6.24-9.03-11.22-19.16-14.93-30.38-3.71-11.22-5.57-22.18-5.57-32.88 0-14.6 3.69-26.68 11.07-36.24 7.38-9.56 16.59-14.46 27.63-14.7 4.7 0 9.77 1.23 15.22 3.69 5.45 2.45 9.39 3.69 11.83 3.69 2.08 0 6.07-1.35 11.97-4.05 5.9-2.71 11.03-3.93 15.39-3.69 12.18.96 22.04 5.37 29.58 13.23-10.8 6.54-16.08 15.7-15.84 27.48.24 9.15 3.75 16.73 10.53 22.75 6.78 6.02 14.84 9.54 24.18 10.56-2.53 7.57-5.9 15.32-10.11 23.25zM119.22 31.84c0-7.08 2.57-13.88 7.71-20.4 5.14-6.52 11.69-10.53 19.65-12.04.48 4.34.02 8.79-1.38 13.35-1.4 4.56-3.8 8.71-7.2 12.45-3.4 3.74-7.43 6.64-12.09 8.7-4.66 2.06-8.91 3.01-12.75 2.85-.48-1.61-.72-3.25-.72-4.91z" />
                  </svg>
                )}
                <span>{isLoading === "apple" ? "Authenticating Apple ID..." : "Continue with Apple / Mac Account"}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-white/15 w-full" />
              <span className="bg-[#0c1325] px-3 font-mono text-[11px] text-white/40 uppercase tracking-widest absolute">
                or email
              </span>
            </div>

            {/* Email / Password Form */}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-semibold text-white/60 text-[11px] tracking-widest uppercase">
                  Sales rep email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rep@elevationspine.com"
                  className="rounded-[12px] px-5 py-3 text-[14px] placeholder-white/25 text-white font-sans focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-heading font-semibold text-white/60 text-[11px] tracking-widest uppercase">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-[12px] px-5 py-3 text-[14px] placeholder-white/25 text-white font-sans focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              </div>

              <div
                className="flex items-center justify-between pt-3 mt-1"
                style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
              >
                <Link
                  to="/contact"
                  className="font-heading text-white/50 hover:text-[#2ac4f4] text-[13px] font-medium transition-colors underline decoration-white/20 hover:decoration-[#2ac4f4]"
                >
                  Request access
                </Link>
                <motion.button
                  type="submit"
                  disabled={isLoading !== null}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-[13px] px-7 py-2.5 rounded-full shadow-[0_4px_20px_rgba(42,196,244,0.4)] cursor-pointer hover:bg-[#1aafde] flex items-center gap-2"
                >
                  {isLoading === "email" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Secure Login"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
