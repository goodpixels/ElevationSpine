import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Settings,
  Plus,
  Trash2,
  Pencil,
  UserPlus,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Folder,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileArchive,
  Image as ImageIcon,
  Video,
  Upload,
  X,
  Search,
  Key
} from "lucide-react";
import { INITIAL_PRODUCTS, INITIAL_FOLDERS, INITIAL_FILES, FileItem } from "./Resources.tsx";

const DEFAULT_ADMIN_WHITELIST = [
  "admin@elevationspine.com",
  "admin@bonobostudio.com",
  "director@elevationspine.com",
  "john.admin@elevationspine.com"
];

export default function ResourcesAdmin() {
  const navigate = useNavigate();
  const [adminWhitelist, setAdminWhitelist] = useState<string[]>(() => {
    const saved = localStorage.getItem("elevation_admin_whitelist");
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_WHITELIST;
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form states for login challenge
  const [challengeEmail, setChallengeEmail] = useState("");
  const [challengePassword, setChallengePassword] = useState("");

  // Manage Whitelist state
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const authRole = localStorage.getItem("elevation_user_role");
    const email = localStorage.getItem("elevation_sales_user") || localStorage.getItem("elevation_admin_user");
    if (email) {
      setCurrentUserEmail(email);
      if (authRole === "admin" || adminWhitelist.includes(email.toLowerCase())) {
        setIsAdminAuthorized(true);
      }
    }
  }, [adminWhitelist]);

  useEffect(() => {
    localStorage.setItem("elevation_admin_whitelist", JSON.stringify(adminWhitelist));
  }, [adminWhitelist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const emailTrimmed = challengeEmail.trim().toLowerCase();
    const isWhitelisted = adminWhitelist.some(e => e.toLowerCase() === emailTrimmed);

    if (isWhitelisted) {
      localStorage.setItem("elevation_user_role", "admin");
      localStorage.setItem("elevation_sales_auth", "true");
      localStorage.setItem("elevation_admin_user", challengeEmail);
      localStorage.setItem("elevation_sales_user", challengeEmail);
      setCurrentUserEmail(challengeEmail);
      setIsAdminAuthorized(true);
      showToast(`Admin privileges granted for ${challengeEmail}`);
    } else {
      setAuthError(`Access Denied: Email "${challengeEmail}" is not in the Admin Whitelist.`);
    }
  };

  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    const emailTrimmed = newAdminEmail.trim().toLowerCase();
    if (adminWhitelist.includes(emailTrimmed)) {
      showToast("Email is already in admin whitelist");
      return;
    }
    const updated = [...adminWhitelist, emailTrimmed];
    setAdminWhitelist(updated);
    setNewAdminEmail("");
    showToast(`Added ${emailTrimmed} to Admin Whitelist`);
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (adminWhitelist.length <= 1) {
      showToast("Cannot remove the last remaining admin");
      return;
    }
    const updated = adminWhitelist.filter(e => e !== emailToRemove);
    setAdminWhitelist(updated);
    showToast(`Removed ${emailToRemove} from Admin Whitelist`);
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("elevation_user_role");
    localStorage.removeItem("elevation_admin_user");
    setIsAdminAuthorized(false);
    showToast("Logged out of Admin Portal");
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#0a0e17] text-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 bg-[#161f33] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-[#2ac4f4]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#2ac4f4] hover:underline mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Resource Directory</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-white">
                CMS Admin Portal
              </h1>
              <span className="bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 text-[#7fd0ff] text-xs font-mono font-bold px-3 py-1 rounded-full uppercase">
                /resourcesadmin
              </span>
            </div>
            <p className="text-white/60 text-sm md:text-base mt-2">
              Role-Based Access Control (RBAC) & Central Document Repository Management
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuthorized ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-2.5 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-xs text-white">Administrator</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="font-mono text-[11px] text-white/50">{currentUserEmail}</div>
                </div>
                <button
                  onClick={handleLogoutAdmin}
                  className="ml-2 text-xs font-heading text-white/50 hover:text-red-400 underline"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl text-xs font-mono font-semibold">
                <Lock className="w-4 h-4" />
                <span>Authorization Challenge Required</span>
              </div>
            )}
          </div>
        </div>

        {/* AUTHORIZATION CHALLENGE SCREEN (If not authorized) */}
        {!isAdminAuthorized ? (
          <div className="max-w-[500px] mx-auto bg-[#111827] border border-white/15 rounded-[28px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="h-1.5 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

            <div className="w-14 h-14 rounded-2xl bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-6">
              <Key className="w-7 h-7" />
            </div>

            <h2 className="font-heading font-bold text-2xl text-white mb-2">
              Administrator Login
            </h2>
            <p className="text-white/60 text-xs md:text-sm mb-6 leading-relaxed">
              Access to <code className="text-[#2ac4f4]">/resourcesadmin</code> requires an authorized email address listed in the Elevation Spine Admin Security Whitelist.
            </p>

            {authError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Access Verification Failed</strong>
                  <span>{authError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-heading text-xs text-white/70 block mb-1.5 uppercase tracking-wider font-semibold">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={challengeEmail}
                  onChange={(e) => setChallengeEmail(e.target.value)}
                  placeholder="admin@elevationspine.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
                />
              </div>

              <div>
                <label className="font-heading text-xs text-white/70 block mb-1.5 uppercase tracking-wider font-semibold">
                  Admin Security Password
                </label>
                <input
                  type="password"
                  required
                  value={challengePassword}
                  onChange={(e) => setChallengePassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.4)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-2"
              >
                Authenticate Administrator
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <span className="text-[11px] text-white/40 block mb-2">Pre-authorized Admin Whitelist Demo Emails:</span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {adminWhitelist.map((email) => (
                  <button
                    key={email}
                    type="button"
                    onClick={() => {
                      setChallengeEmail(email);
                      setChallengePassword("admin2026");
                    }}
                    className="text-[10px] font-mono bg-white/10 hover:bg-[#2ac4f4]/20 border border-white/15 text-[#7fd0ff] px-2.5 py-1 rounded-md transition-colors"
                  >
                    {email}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* AUTHORIZED ADMIN CONTROL CENTER */
          <div className="flex flex-col gap-8">
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-white/50 text-xs font-mono uppercase tracking-wider">Security Access</div>
                  <div className="font-heading font-bold text-xl text-emerald-400 mt-1 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span>RBAC Active</span>
                  </div>
                  <div className="text-white/40 text-xs mt-1">{adminWhitelist.length} Whitelisted Admins</div>
                </div>
                <button
                  onClick={() => setShowWhitelistModal(true)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading text-xs px-3.5 py-2 rounded-xl transition-all"
                >
                  Manage Whitelist
                </button>
              </div>

              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-white/50 text-xs font-mono uppercase tracking-wider">Product Categories</div>
                  <div className="font-heading font-bold text-xl text-[#2ac4f4] mt-1">
                    3 Core Platforms
                  </div>
                  <div className="text-white/40 text-xs mt-1">SABER-C, SABER-XA, POROSS</div>
                </div>
                <Link
                  to="/resources"
                  className="bg-[#2ac4f4]/15 hover:bg-[#2ac4f4]/30 text-[#7fd0ff] border border-[#2ac4f4]/40 font-heading text-xs px-3.5 py-2 rounded-xl transition-all"
                >
                  Open Explorer
                </Link>
              </div>

              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-white/50 text-xs font-mono uppercase tracking-wider">Folder Permissions</div>
                  <div className="font-heading font-bold text-xl text-amber-400 mt-1">
                    3 Restricted Folders
                  </div>
                  <div className="text-white/40 text-xs mt-1">Coding-Guide, Surgical, Training</div>
                </div>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                  Protected
                </span>
              </div>
            </div>

            {/* Main Admin Management Hub */}
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Resource Management & Directory Control
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm mt-1">
                    Manage files, set folder restrictions, and publish documents directly to the Sales & Public resource center.
                  </p>
                </div>
                <Link
                  to="/resources"
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-5 py-3 rounded-xl hover:bg-[#6ecff4] transition-all flex items-center gap-2 shrink-0 shadow-lg"
                >
                  <Folder className="w-4 h-4" />
                  <span>View Interactive Explorer</span>
                </Link>
              </div>

              {/* Security & Architecture Guide for Admin */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h4 className="font-heading font-bold text-base text-[#2ac4f4] flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Admin Security & Domain Whitelisting Strategy</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/70 leading-relaxed">
                  <div>
                    <h5 className="font-heading font-semibold text-white mb-1">1. Dedicated Endpoint Routing (<code className="text-[#2ac4f4]">/resourcesadmin</code>)</h5>
                    <p>
                      In modern web applications, hiding admin interfaces behind unlisted routes like <code className="text-[#2ac4f4]">/resourcesadmin</code> or <code className="text-[#2ac4f4]">/admin</code> is a great defense-in-depth practice to prevent unauthorized discovery.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-heading font-semibold text-white mb-1">2. Whitelist & Identity Authorization</h5>
                    <p>
                      Authentication confirms who the user is. Authorization checks whether their email address (e.g. <code className="text-[#2ac4f4]">admin@elevationspine.com</code>) exists in the approved Admin Whitelist array or corporate directory claims before unlocking CMS capabilities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Whitelist Quick List */}
              <div className="bg-[#0a0e17] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#2ac4f4]" />
                    <span>Authorized Administrator Whitelist ({adminWhitelist.length})</span>
                  </h4>
                  <button
                    onClick={() => setShowWhitelistModal(true)}
                    className="text-xs font-heading font-bold text-[#2ac4f4] hover:underline"
                  >
                    + Add New Admin
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {adminWhitelist.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Mail className="w-3.5 h-3.5 text-[#2ac4f4] shrink-0" />
                        <span className="truncate font-mono text-white/90">{email}</span>
                      </div>
                      {adminWhitelist.length > 1 && (
                        <button
                          onClick={() => handleRemoveAdminEmail(email)}
                          className="text-white/40 hover:text-red-400 p-1 transition-colors"
                          title="Revoke Admin"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MANAGE WHITELIST MODAL */}
        <AnimatePresence>
          {showWhitelistModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowWhitelistModal(false)}
                className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-[500px] bg-[#111827] border border-white/15 rounded-[28px] p-8 text-white shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setShowWhitelistModal(false)}
                  className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

                <div className="w-11 h-11 rounded-xl bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-4">
                  <UserPlus className="w-5.5 h-5.5" />
                </div>

                <h3 className="font-heading font-bold text-2xl mb-1 text-white">
                  Manage Admin Whitelist
                </h3>
                <p className="text-white/60 text-xs mb-6">
                  Add email addresses authorized to access <code className="text-[#2ac4f4]">/resourcesadmin</code> and edit corporate files.
                </p>

                <form onSubmit={handleAddAdminEmail} className="flex gap-2 mb-6">
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="executive@elevationspine.com"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#6ecff4] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Add Admin
                  </button>
                </form>

                <div className="max-h-[220px] overflow-y-auto pr-1 flex flex-col gap-2">
                  {adminWhitelist.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono"
                    >
                      <span className="text-white/90 truncate">{email}</span>
                      {adminWhitelist.length > 1 && (
                        <button
                          onClick={() => handleRemoveAdminEmail(email)}
                          className="text-white/40 hover:text-red-400 text-xs transition-colors font-sans"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
