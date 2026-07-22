import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  Lock,
  Unlock,
  Download,
  ShieldAlert,
  CheckCircle2,
  User,
  LogOut,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileArchive,
  Plus,
  Pencil,
  Trash2,
  Settings,
  Upload,
  X,
  FileUp
} from "lucide-react";

export interface ResourceItem {
  id: string;
  title: string;
  type: string;
  size: string;
  gated: boolean;
  format: "pdf" | "xlsx" | "pptx" | "zip";
  description?: string;
  url?: string;
}

const INITIAL_PUBLIC_RESOURCES: ResourceItem[] = [
  {
    id: "overview",
    title: "Elevation Spine Corporate Overview",
    type: "PDF Document",
    size: "4.1 MB",
    gated: false,
    format: "pdf",
    description: "General introduction to Elevation Spine zero-profile fixation platform.",
  },
  {
    id: "brochure",
    title: "SABER-C™ Product Brochure",
    type: "PDF Document",
    size: "5.6 MB",
    gated: false,
    format: "pdf",
    description: "High-level feature summary and engineering highlights of SABER-C.",
  },
  {
    id: "ifu-summary",
    title: "SABER-C™ Surgical Technique Overview",
    type: "PDF Document",
    size: "8.2 MB",
    gated: false,
    format: "pdf",
    description: "Overview of surgical steps and instrumentation sequence.",
  },
];

const INITIAL_SALES_RESOURCES: ResourceItem[] = [
  {
    id: "order-form",
    title: "SABER-C™ Commercial Order Form & Price List 2026",
    type: "Excel / PDF Package",
    size: "1.4 MB",
    gated: true,
    format: "xlsx",
    description: "Confidential price schedule, sizing SKU matrix, and order form.",
  },
  {
    id: "competitive-matrix",
    title: "Zero-Profile vs Secondary Plating: Competitive Sales Matrix",
    type: "Sales Battlecard (PDF)",
    size: "3.8 MB",
    gated: true,
    format: "pdf",
    description: "Detailed biomechanical comparison against legacy cervical plate systems.",
  },
  {
    id: "sales-deck",
    title: "Surgeon Presentation Deck & Biomechanical Case Studies",
    type: "PowerPoint Presentation",
    size: "14.2 MB",
    gated: true,
    format: "pptx",
    description: "Ready-to-present slide deck with clinical trial data and CAD animations.",
  },
  {
    id: "reimbursement-guide",
    title: "Sales Rep Coding & CPT Reimbursement Guide",
    type: "PDF Document",
    size: "2.9 MB",
    gated: true,
    format: "pdf",
    description: "Surgeon & hospital billing codes for integrated cervical fusion.",
  },
  {
    id: "media-kit",
    title: "High-Res Render & 3D Media Assets Sales Package",
    type: "ZIP Media Archive",
    size: "45.0 MB",
    gated: true,
    format: "zip",
    description: "High-definition 3D renders, video animations, and promotional graphics.",
  },
];

export default function Resources() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const [publicResources, setPublicResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem("elevation_public_resources");
    return saved ? JSON.parse(saved) : INITIAL_PUBLIC_RESOURCES;
  });

  const [salesResources, setSalesResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem("elevation_sales_resources");
    return saved ? JSON.parse(saved) : INITIAL_SALES_RESOURCES;
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Upload/Edit Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState<"sales" | "public">("sales");
  const [formFormat, setFormFormat] = useState<"pdf" | "xlsx" | "pptx" | "zip">("pdf");
  const [formSize, setFormSize] = useState("3.5 MB");

  useEffect(() => {
    const auth = localStorage.getItem("elevation_sales_auth");
    const email = localStorage.getItem("elevation_sales_user");
    if (auth === "true") {
      setIsAuthenticated(true);
      setUserEmail(email || "sales.rep@elevationspine.com");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elevation_public_resources", JSON.stringify(publicResources));
  }, [publicResources]);

  useEffect(() => {
    localStorage.setItem("elevation_sales_resources", JSON.stringify(salesResources));
  }, [salesResources]);

  const handleLogout = () => {
    localStorage.removeItem("elevation_sales_auth");
    localStorage.removeItem("elevation_sales_user");
    setIsAuthenticated(false);
    showToast("Logged out of Sales Portal");
  };

  const handleDownload = (item: ResourceItem) => {
    if (item.gated && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    showToast(`Downloading ${item.title}...`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteItem = (id: string, isGated: boolean) => {
    if (isGated) {
      setSalesResources((prev) => prev.filter((item) => item.id !== id));
    } else {
      setPublicResources((prev) => prev.filter((item) => item.id !== id));
    }
    showToast("Resource deleted successfully");
  };

  const handleOpenEdit = (item: ResourceItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description || "");
    setFormCategory(item.gated ? "sales" : "public");
    setFormFormat(item.format);
    setFormSize(item.size);
    setShowUploadModal(true);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormDesc("");
    setFormCategory("sales");
    setFormFormat("pdf");
    setFormSize("4.2 MB");
    setShowUploadModal(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel =
      formFormat === "pdf"
        ? "PDF Document"
        : formFormat === "xlsx"
        ? "Excel Package"
        : formFormat === "pptx"
        ? "PowerPoint Deck"
        : "ZIP Archive";

    if (editingItem) {
      // Edit existing
      const updatedItem: ResourceItem = {
        ...editingItem,
        title: formTitle,
        description: formDesc,
        format: formFormat,
        size: formSize,
        type: typeLabel,
        gated: formCategory === "sales",
      };

      if (editingItem.gated !== (formCategory === "sales")) {
        // Category changed, move between arrays
        if (editingItem.gated) {
          setSalesResources((prev) => prev.filter((i) => i.id !== editingItem.id));
          setPublicResources((prev) => [updatedItem, ...prev]);
        } else {
          setPublicResources((prev) => prev.filter((i) => i.id !== editingItem.id));
          setSalesResources((prev) => [updatedItem, ...prev]);
        }
      } else {
        if (formCategory === "sales") {
          setSalesResources((prev) => prev.map((i) => (i.id === editingItem.id ? updatedItem : i)));
        } else {
          setPublicResources((prev) => prev.map((i) => (i.id === editingItem.id ? updatedItem : i)));
        }
      }
      showToast("Resource updated successfully!");
    } else {
      // Add new
      const newItem: ResourceItem = {
        id: "res_" + Date.now(),
        title: formTitle,
        description: formDesc,
        format: formFormat,
        size: formSize,
        type: typeLabel,
        gated: formCategory === "sales",
      };

      if (formCategory === "sales") {
        setSalesResources((prev) => [newItem, ...prev]);
      } else {
        setPublicResources((prev) => [newItem, ...prev]);
      }
      showToast("New file published to portal!");
    }

    setShowUploadModal(false);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "xlsx":
        return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case "pptx":
        return <Presentation className="w-5 h-5 text-amber-500" />;
      case "zip":
        return <FileArchive className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-[#2ac4f4]" />;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 rounded-full px-3.5 py-1 text-xs font-mono text-[#0891b2] mb-3 uppercase tracking-widest font-semibold">
              Document & Media Library
            </div>
            <h1 className="font-heading font-bold text-[#1a2535] text-[40px] md:text-[56px] leading-[1.1] tracking-tight">
              Resource Center
            </h1>
            <p className="text-[#64748b] text-base md:text-lg mt-2 max-w-xl">
              Access public brochures, clinical documents, and restricted sales representative files.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Admin Management Toggle */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAdminMode
                  ? "bg-[#0a0e17] text-white border-[#0a0e17] shadow-lg"
                  : "bg-white text-[#64748b] border-slate-300 hover:text-[#0a0e17] hover:border-slate-400"
              }`}
            >
              <Settings className={`w-4 h-4 ${isAdminMode ? "text-[#2ac4f4] animate-spin" : ""}`} />
              <span>{isAdminMode ? "Exit Admin Mode" : "Admin Manager"}</span>
            </button>

            {/* User Auth Banner */}
            <div className="bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-3.5 flex items-center gap-3 shrink-0">
              {isAuthenticated ? (
                <>
                  <div className="w-9 h-9 rounded-full bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#0284c7]">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-xs text-[#0a0e17]">Sales Representative</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="font-mono text-[11px] text-[#64748b]">{userEmail}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-1 p-2 text-[#94a3b8] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-xs text-[#0a0e17]">Sales Rep Portal</div>
                    <div className="text-[10px] text-[#64748b]">Sales files restricted</div>
                  </div>
                  <Link
                    to="/login"
                    className="ml-1 bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] text-xs font-heading font-semibold px-3.5 py-1.5 rounded-xl transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Admin Action Ribbon */}
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-[#0a0e17] text-white rounded-2xl border border-[#2ac4f4]/40 flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 flex items-center justify-center text-[#2ac4f4]">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">CMS Admin Control Panel Active</h4>
                <p className="text-xs text-white/60">Upload new PDF/media files, edit metadata, or delete obsolete sales assets.</p>
              </div>
            </div>

            <button
              onClick={handleOpenNew}
              className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Sales Resource</span>
            </button>
          </motion.div>
        )}

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 bg-[#0a0e17] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2ac4f4]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 1: Public Collateral */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/[0.08]">
            <h2 className="font-heading font-bold text-[22px] text-[#0a0e17] flex items-center gap-2">
              <span>Public Product & Clinical Materials</span>
            </h2>
            <span className="text-xs font-mono font-medium text-[#64748b] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Open Download
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {publicResources.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-black/[0.06] rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#2ac4f4]/50 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(42,196,244,0.08)] gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getFormatIcon(item.format)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#0a0e17] text-[17px] group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-1">{item.description}</p>
                    <div className="font-mono text-[11px] text-[#94a3b8] mt-2 font-medium">
                      {item.type} • {item.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {isAdminMode && (
                    <>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-slate-500 hover:text-[#0891b2] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        title="Edit File Details"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, false)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Delete File"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDownload(item)}
                    className="font-heading text-xs font-bold text-[#0a0e17] bg-slate-100 hover:bg-[#2ac4f4] hover:text-white px-5 py-2.5 rounded-xl border border-slate-200/80 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 2: Gated Sales Representative Materials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <h2 className="font-heading font-bold text-[22px] text-[#0a0e17]">
                Sales Representative Collateral
              </h2>
              {isAuthenticated ? (
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Unlock className="w-3 h-3 text-emerald-600" />
                  Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Lock className="w-3 h-3 text-amber-600" />
                  Restricted Access
                </span>
              )}
            </div>

            {!isAuthenticated && (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-xs font-heading font-bold text-[#0891b2] hover:text-[#0a0e17] underline cursor-pointer"
              >
                Log in to view files
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {salesResources.map((item) => (
              <div 
                key={item.id} 
                className={`group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-[20px] transition-all duration-300 gap-4 border ${
                  isAuthenticated
                    ? "bg-white border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#2ac4f4]/50"
                    : "bg-slate-50/80 border-slate-200/80 opacity-90"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    {isAuthenticated ? getFormatIcon(item.format) : <Lock className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-heading font-bold text-[#0a0e17] text-[17px]">
                        {item.title}
                      </h3>
                      {item.gated && !isAuthenticated && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase border border-amber-200">
                          Sales Reps
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">{item.description}</p>
                    <div className="font-mono text-[11px] text-[#94a3b8] mt-2 font-medium flex items-center gap-2">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {isAdminMode && (
                    <>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-slate-500 hover:text-[#0891b2] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        title="Edit File Details"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, true)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Delete File"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDownload(item)}
                    className={`font-heading text-xs font-bold px-5 py-2.5 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
                      isAuthenticated
                        ? "bg-[#2ac4f4] text-[#0a0e17] border-[#2ac4f4] hover:bg-[#0891b2] hover:text-white shadow-[0_4px_12px_rgba(42,196,244,0.3)]"
                        : "bg-white text-[#0a0e17] border-slate-300 hover:border-amber-500 hover:text-amber-600"
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download File</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Unlock File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Admin Upload / Edit Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute inset-0 bg-[#0a0e17]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[500px] bg-[#0c1325] border border-white/15 rounded-[28px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />
              
              <div className="w-10 h-10 rounded-xl bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-4">
                <FileUp className="w-5 h-5" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-1 text-white">
                {editingItem ? "Edit Sales Asset Details" : "Upload New Sales Resource"}
              </h3>
              <p className="text-white/60 text-xs mb-6">
                Add, replace, or re-categorize files accessible to Sales Representatives.
              </p>

              <form onSubmit={handleSaveResource} className="flex flex-col gap-4">
                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. SABER-C Commercial SKU & Order Form"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Description / Summary</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief detail about what this file contains..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Access Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      <option value="sales">🔒 Sales Reps Only</option>
                      <option value="public">🌐 Public (Open Access)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Format</label>
                    <select
                      value={formFormat}
                      onChange={(e) => setFormFormat(e.target.value as any)}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="xlsx">Excel Sheet (XLSX)</option>
                      <option value="pptx">PowerPoint Deck (PPTX)</option>
                      <option value="zip">ZIP Media Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">File Upload / Drop</label>
                  <div className="border-2 border-dashed border-white/20 hover:border-[#2ac4f4]/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/[0.02]">
                    <Upload className="w-6 h-6 text-[#2ac4f4] mx-auto mb-1" />
                    <span className="text-xs text-white/80 font-heading block font-semibold">
                      Drag & drop file or click to browse
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Supports PDF, XLSX, PPTX, MP4, ZIP (Max 100MB)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-2"
                >
                  {editingItem ? "Save File Changes" : "Publish to Resource Portal"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Requirement Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-[#0a0e17]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[460px] bg-[#0d1322] border border-white/15 rounded-[28px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />
              
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                Sales Representative Access Required
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                This document contains confidential sales collateral, price lists, and commercial decks intended exclusively for authorized Elevation Spine sales representatives.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem("elevation_sales_auth", "true");
                    localStorage.setItem("elevation_sales_user", "alex.salesrep@gmail.com");
                    setIsAuthenticated(true);
                    setUserEmail("alex.salesrep@gmail.com");
                    setShowLoginModal(false);
                    showToast("Signed in with Google Account");
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                  </svg>
                  <span>Quick Sign-In with Google</span>
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem("elevation_sales_auth", "true");
                    localStorage.setItem("elevation_sales_user", "sales.rep@icloud.com");
                    setIsAuthenticated(true);
                    setUserEmail("sales.rep@icloud.com");
                    setShowLoginModal(false);
                    showToast("Signed in with Apple / Mac Account");
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.04.24-9.97-1.78-14.8-6.05-3.18-2.75-7.07-7.44-11.66-14.07-6.24-9.03-11.22-19.16-14.93-30.38-3.71-11.22-5.57-22.18-5.57-32.88 0-14.6 3.69-26.68 11.07-36.24 7.38-9.56 16.59-14.46 27.63-14.7 4.7 0 9.77 1.23 15.22 3.69 5.45 2.45 9.39 3.69 11.83 3.69 2.08 0 6.07-1.35 11.97-4.05 5.9-2.71 11.03-3.93 15.39-3.69 12.18.96 22.04 5.37 29.58 13.23-10.8 6.54-16.08 15.7-15.84 27.48.24 9.15 3.75 16.73 10.53 22.75 6.78 6.02 14.84 9.54 24.18 10.56-2.53 7.57-5.9 15.32-10.11 23.25zM119.22 31.84c0-7.08 2.57-13.88 7.71-20.4 5.14-6.52 11.69-10.53 19.65-12.04.48 4.34.02 8.79-1.38 13.35-1.4 4.56-3.8 8.71-7.2 12.45-3.4 3.74-7.43 6.64-12.09 8.7-4.66 2.06-8.91 3.01-12.75 2.85-.48-1.61-.72-3.25-.72-4.91z" />
                  </svg>
                  <span>Quick Sign-In with Apple / Mac</span>
                </button>

                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/login");
                  }}
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs py-3 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-1"
                >
                  Log In with Email & Password
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white/70 font-heading text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
