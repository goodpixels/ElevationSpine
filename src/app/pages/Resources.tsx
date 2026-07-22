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
  FileUp,
  Folder,
  FolderOpen,
  ChevronRight,
  Search,
  Eye,
  RefreshCw,
  LayoutGrid,
  List,
  Image as ImageIcon,
  Video,
  FileCode,
  ShieldCheck,
  Share2,
  ExternalLink,
  Info
} from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
}

export interface FolderItem {
  id: string;
  name: string;
  isGated: boolean;
  description: string;
  iconType: "pdf" | "doc" | "image" | "video" | "archive" | "code" | "word";
}

export interface FileItem {
  id: string;
  productId: string; // "saber-c" | "saber-xa" | "poross"
  folderId: string;
  title: string;
  description: string;
  format: "pdf" | "xlsx" | "pptx" | "png" | "mp4" | "zip";
  size: string;
  gated: boolean;
  dateAdded: string;
  previewUrl?: string;
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "saber-c",
    name: "SABER-C™",
    code: "SABER-C",
    description: "Anterior Cervical Fusion System with Integrated Zero-Profile Fixation",
    color: "#2ac4f4",
  },
  {
    id: "saber-xa",
    name: "SABER-XA™",
    code: "SABER-XA",
    description: "Next-Generation Lateral Access System with PorOss™ Technology",
    color: "#0891b2",
  },
  {
    id: "poross",
    name: "POROSS™ Platform",
    code: "POROSS",
    description: "3D Printed Titanium Porous Structural Engineering",
    color: "#6366f1",
  },
];

export const INITIAL_FOLDERS: FolderItem[] = [
  {
    id: "Animations",
    name: "Animations",
    isGated: false,
    description: "3D CAD mechanical animations & procedural motion graphics clips",
    iconType: "video",
  },
  {
    id: "Brochure",
    name: "Brochure",
    isGated: false,
    description: "Commercial product brochures & patient education overview documents",
    iconType: "pdf",
  },
  {
    id: "Coding-Guide",
    name: "Coding-Guide",
    isGated: true,
    description: "Confidential CPT reimbursement codes & hospital fee schedules",
    iconType: "pdf",
  },
  {
    id: "Images",
    name: "Images",
    isGated: false,
    description: "High-resolution 3D renders, implant photography & tray layouts",
    iconType: "image",
  },
  {
    id: "New Instrument Launch Plans and Targeting",
    name: "New Instrument Launch Plans and Targeting",
    isGated: true,
    description: "Confidential instrument rollout plans & surgeon targeting matrix",
    iconType: "doc",
  },
  {
    id: "Part Numbers & Pricing",
    name: "Part Numbers & Pricing",
    isGated: true,
    description: "Confidential SKU matrix, catalog part numbers & price list",
    iconType: "code",
  },
  {
    id: "Porous Branding",
    name: "Porous Branding",
    isGated: true,
    description: "PorOss™ 3D porous titanium branding & marketing guidelines",
    iconType: "image",
  },
  {
    id: "Press Release - 510k Clearance",
    name: "Press Release - 510k Clearance",
    isGated: false,
    description: "FDA 510(k) clearance press release & regulatory announcement",
    iconType: "word",
  },
  {
    id: "Saber-C Porous Wicking",
    name: "Saber-C Porous Wicking",
    isGated: false,
    description: "Biomechanical fluid wicking demonstration & cellular study data",
    iconType: "image",
  },
  {
    id: "Spitrex Clinical Data",
    name: "Spitrex Clinical Data",
    isGated: false,
    description: "Clinical trial results & biomechanical performance data packages",
    iconType: "pdf",
  },
  {
    id: "Surgical Technique & Brochure",
    name: "Surgical Technique & Brochure",
    isGated: false,
    description: "Step-by-step surgical manual & procedural sequence brochure",
    iconType: "pdf",
  },
  {
    id: "System Overview",
    name: "System Overview",
    isGated: false,
    description: "Comprehensive zero-profile platform system overview",
    iconType: "doc",
  },
  {
    id: "Videos",
    name: "Videos",
    isGated: false,
    description: "High-definition 3D video walkthroughs & clinical procedure videos",
    iconType: "video",
  },
];

export const INITIAL_FILES: FileItem[] = [
  // ── SABER-C ──
  {
    id: "sc-anim-1",
    productId: "saber-c",
    folderId: "Animations",
    title: "SABER-C™ 3D Zero-Profile Spike Deployment Animation",
    description: "3D CAD animation illustrating smooth zero-profile insertion and spike seating mechanism.",
    format: "mp4",
    size: "28.4 MB",
    gated: false,
    dateAdded: "2026-06-12",
  },
  {
    id: "sc-brochure-1",
    productId: "saber-c",
    folderId: "Brochure",
    title: "SABER-C™ Commercial Product Brochure 2026",
    description: "Complete feature overview, zero-profile mechanics, and PorOss titanium lattice specs.",
    format: "pdf",
    size: "5.6 MB",
    gated: false,
    dateAdded: "2026-06-15",
  },
  {
    id: "sc-brochure-2",
    productId: "saber-c",
    folderId: "Brochure",
    title: "SABER-C™ Patient Education Guide",
    description: "Patient-friendly guide explaining anterior cervical interbody fusion.",
    format: "pdf",
    size: "2.4 MB",
    gated: false,
    dateAdded: "2026-05-10",
  },
  {
    id: "sc-coding-1",
    productId: "saber-c",
    folderId: "Coding-Guide",
    title: "SABER-C™ CPT Reimbursement & Billing Guide",
    description: "Surgeon CPT coding recommendations and hospital billing schedules for C3-C7.",
    format: "pdf",
    size: "1.8 MB",
    gated: true,
    dateAdded: "2026-06-01",
  },
  {
    id: "sc-img-1",
    productId: "saber-c",
    folderId: "Images",
    title: "SABER-C™ Beauty Construct ISO Render",
    description: "Ultra high-resolution 3D CAD rendering of SABER-C implant construct with integrated spikes.",
    format: "png",
    size: "8.4 MB",
    gated: false,
    dateAdded: "2026-06-20",
    previewUrl: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1784688640/Saber-C_BEAUTY-01-Implant_Contruct_Spikes_ISO_dnjphd.png",
  },
  {
    id: "sc-launch-1",
    productId: "saber-c",
    folderId: "New Instrument Launch Plans and Targeting",
    title: "SABER-C™ Instrument Launch Strategy & Hospital Targeting 2026",
    description: "Confidential sales launch strategy, targeting tiers, and surgical evaluation roadmap.",
    format: "pptx",
    size: "18.2 MB",
    gated: true,
    dateAdded: "2026-07-02",
  },
  {
    id: "sc-parts-1",
    productId: "saber-c",
    folderId: "Part Numbers & Pricing",
    title: "SABER-C™ Catalog Part Numbers & Pricing Matrix",
    description: "Confidential SKU matrix, construct sizing part numbers, and commercial price list.",
    format: "xlsx",
    size: "1.4 MB",
    gated: true,
    dateAdded: "2026-07-01",
  },
  {
    id: "sc-brand-1",
    productId: "saber-c",
    folderId: "Porous Branding",
    title: "PorOss™ 3D Porous Titanium Brand Media Package",
    description: "High-resolution branding assets, porous titanium logo files, and marketing guidelines.",
    format: "zip",
    size: "34.5 MB",
    gated: true,
    dateAdded: "2026-05-18",
  },
  {
    id: "sc-press-1",
    productId: "saber-c",
    folderId: "Press Release - 510k Clearance",
    title: "Elevation Spine SABER-C™ FDA 510(k) Clearance Press Release",
    description: "Official press announcement regarding FDA 510(k) clearance for zero-profile cervical fixation.",
    format: "pdf",
    size: "1.1 MB",
    gated: false,
    dateAdded: "2026-04-10",
  },
  {
    id: "sc-wick-1",
    productId: "saber-c",
    folderId: "Saber-C Porous Wicking",
    title: "SABER-C™ Porous Titanium Fluid Wicking Micrograph Analysis",
    description: "Visual analysis of fluid wicking capability into interconnected 3D porous titanium structure.",
    format: "png",
    size: "7.2 MB",
    gated: false,
    dateAdded: "2026-05-22",
  },
  {
    id: "sc-spitrex-1",
    productId: "saber-c",
    folderId: "Spitrex Clinical Data",
    title: "Spitrex™ Clinical Trial Results & Biomechanical Report",
    description: "Clinical trial performance results and biomechanical pull-out strength testing.",
    format: "pdf",
    size: "6.8 MB",
    gated: false,
    dateAdded: "2026-06-05",
  },
  {
    id: "sc-tech-1",
    productId: "saber-c",
    folderId: "Surgical Technique & Brochure",
    title: "SABER-C™ Surgical Technique Manual & Technical Brochure",
    description: "Comprehensive step-by-step surgical manual for anterior cervical discectomy & fusion.",
    format: "pdf",
    size: "12.4 MB",
    gated: false,
    dateAdded: "2026-06-08",
  },
  {
    id: "sc-sys-1",
    productId: "saber-c",
    folderId: "System Overview",
    title: "SABER-C™ Zero-Profile Platform System Overview",
    description: "Engineering overview of zero-profile integrated spike technology and sizing.",
    format: "pdf",
    size: "4.1 MB",
    gated: false,
    dateAdded: "2026-05-01",
  },
  {
    id: "sc-vids-1",
    productId: "saber-c",
    folderId: "Videos",
    title: "SABER-C™ Full Surgical Procedure Video Walkthrough",
    description: "Clinical surgical video demonstrating zero-profile seating and instrumentation.",
    format: "mp4",
    size: "42.0 MB",
    gated: false,
    dateAdded: "2026-06-18",
  },
  // ── SABER-XA ──
  {
    id: "sxa-brochure-1",
    productId: "saber-xa",
    folderId: "Brochure",
    title: "SABER-XA™ Lateral Access System Preview",
    description: "Overview of lateral access zero-profile fixation currently in clinical validation.",
    format: "pdf",
    size: "4.2 MB",
    gated: false,
    dateAdded: "2026-06-04",
  },
  {
    id: "sxa-coding-1",
    productId: "saber-xa",
    folderId: "Coding-Guide",
    title: "SABER-XA™ Preliminary Coding Brief",
    description: "Preliminary reimbursement guidance for lateral interbody procedures.",
    format: "pdf",
    size: "1.5 MB",
    gated: true,
    dateAdded: "2026-06-19",
  },
  {
    id: "sxa-surg-1",
    productId: "saber-xa",
    folderId: "Surgical-Technique",
    title: "SABER-XA™ Lateral Approach Technique Guide",
    description: "Surgical approach sequence and instrumentation for lateral fixation.",
    format: "pdf",
    size: "9.1 MB",
    gated: true,
    dateAdded: "2026-06-21",
  },

  // ── POROSS ──
  {
    id: "por-brochure-1",
    productId: "poross",
    folderId: "Brochure",
    title: "POROSS™ 3D Titanium Technology Whitepaper",
    description: "Engineering whitepaper detailing porosity ratio, modulus of elasticity, and cellular ingrowth.",
    format: "pdf",
    size: "3.8 MB",
    gated: false,
    dateAdded: "2026-05-18",
  },
  {
    id: "por-img-1",
    productId: "poross",
    folderId: "Images",
    title: "POROSS™ Micro-CT Bone Ingrowth Scan",
    description: "High-resolution micro-CT scan revealing 70% porous interconnected pore lattice.",
    format: "png",
    size: "9.8 MB",
    gated: false,
    dateAdded: "2026-06-02",
  },
];

import { TextRevealTitle } from "../App.tsx";

export default function Resources() {
  const navigate = useNavigate();

  // Auth & Admin state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"guest" | "sales_rep" | "admin">("guest");
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Resources state
  const [files, setFiles] = useState<FileItem[]>(() => {
    const saved = localStorage.getItem("elevation_all_files");
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  // Navigation / Folder view state
  const [selectedProductId, setSelectedProductId] = useState<string>("saber-c");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals & Notifications
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin challenge input
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminPassInput, setAdminPassInput] = useState("");
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Upload/Edit Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formProduct, setFormProduct] = useState("saber-c");
  const [formFolder, setFormFolder] = useState("Brochure");
  const [formFormat, setFormFormat] = useState<"pdf" | "xlsx" | "pptx" | "png" | "mp4" | "zip">("pdf");
  const [formSize, setFormSize] = useState("4.2 MB");
  const [formGated, setFormGated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("elevation_sales_auth");
    const email = localStorage.getItem("elevation_sales_user") || localStorage.getItem("elevation_admin_user");
    const role = (localStorage.getItem("elevation_user_role") as any) || (auth === "true" ? "sales_rep" : "guest");

    if (auth === "true" && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserRole(role);
      if (role === "admin") {
        setIsAdminMode(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elevation_all_files", JSON.stringify(files));
  }, [files]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem("elevation_sales_auth");
    localStorage.removeItem("elevation_sales_user");
    localStorage.removeItem("elevation_user_role");
    localStorage.removeItem("elevation_admin_user");
    setIsAuthenticated(false);
    setUserRole("guest");
    setIsAdminMode(false);
    showToast("Logged out of portal");
  };

  const handleToggleAdminMode = () => {
    if (userRole === "admin") {
      setIsAdminMode(!isAdminMode);
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);

    const whitelistSaved = localStorage.getItem("elevation_admin_whitelist");
    const whitelist: string[] = whitelistSaved
      ? JSON.parse(whitelistSaved)
      : ["admin@elevationspine.com", "admin@bonobostudio.com", "director@elevationspine.com"];

    const emailTrimmed = adminEmailInput.trim().toLowerCase();
    if (whitelist.some(e => e.toLowerCase() === emailTrimmed)) {
      localStorage.setItem("elevation_sales_auth", "true");
      localStorage.setItem("elevation_admin_user", adminEmailInput);
      localStorage.setItem("elevation_sales_user", adminEmailInput);
      localStorage.setItem("elevation_user_role", "admin");
      setIsAuthenticated(true);
      setUserEmail(adminEmailInput);
      setUserRole("admin");
      setIsAdminMode(true);
      setShowAdminLoginModal(false);
      showToast(`Admin Mode activated for ${adminEmailInput}`);
    } else {
      setAdminAuthError(`Access Denied: Email "${adminEmailInput}" is not in the Admin Authorization Whitelist.`);
    }
  };

  const handleFolderClick = (folder: FolderItem) => {
    if (folder.isGated && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setSelectedFolderId(folder.id);
  };

  const handleDownload = (file: FileItem) => {
    if (file.gated && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    showToast(`Downloading "${file.title}" (${file.size})...`);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    showToast("File deleted from repository");
  };

  const handleOpenEdit = (file: FileItem) => {
    setEditingFile(file);
    setFormTitle(file.title);
    setFormDesc(file.description);
    setFormProduct(file.productId);
    setFormFolder(file.folderId);
    setFormFormat(file.format);
    setFormSize(file.size);
    setFormGated(file.gated);
    setShowUploadModal(true);
  };

  const handleOpenNew = () => {
    setEditingFile(null);
    setFormTitle("");
    setFormDesc("");
    setFormProduct(selectedProductId);
    setFormFolder(selectedFolderId || "Brochure");
    setFormFormat("pdf");
    setFormSize("3.5 MB");
    setFormGated(false);
    setShowUploadModal(true);
  };

  const handleSaveFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFile) {
      const updated: FileItem = {
        ...editingFile,
        title: formTitle,
        description: formDesc,
        productId: formProduct,
        folderId: formFolder,
        format: formFormat,
        size: formSize,
        gated: formGated,
      };
      setFiles((prev) => prev.map((f) => (f.id === editingFile.id ? updated : f)));
      showToast("Resource details updated successfully!");
    } else {
      const newFile: FileItem = {
        id: "file_" + Date.now(),
        productId: formProduct,
        folderId: formFolder,
        title: formTitle,
        description: formDesc,
        format: formFormat,
        size: formSize,
        gated: formGated,
        dateAdded: new Date().toISOString().split("T")[0],
      };
      setFiles((prev) => [newFile, ...prev]);
      showToast("New file published to folder!");
    }
    setShowUploadModal(false);
  };

  const currentProduct = INITIAL_PRODUCTS.find((p) => p.id === selectedProductId) || INITIAL_PRODUCTS[0];
  const currentFolder = INITIAL_FOLDERS.find((f) => f.id === selectedFolderId);

  // Filter files by product, folder, search query
  const filteredFiles = files.filter((file) => {
    const matchesProduct = selectedProductId === "all" || file.productId === selectedProductId;
    const matchesFolder = !selectedFolderId || file.folderId === selectedFolderId;
    const matchesQuery =
      !searchQuery ||
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProduct && matchesFolder && matchesQuery;
  });

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "xlsx":
        return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case "pptx":
        return <Presentation className="w-5 h-5 text-amber-500" />;
      case "zip":
        return <FileArchive className="w-5 h-5 text-purple-500" />;
      case "png":
        return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case "mp4":
        return <Video className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-[#2ac4f4]" />;
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 lg:px-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto">
        {/* Toast */}
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

        {/* Top Title Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 rounded-full px-3.5 py-1 text-xs font-mono text-[#0891b2] mb-3 uppercase tracking-widest font-semibold">
              Document & Media Library
            </div>
            <TextRevealTitle
              as="h1"
              text="Resource Center"
              className="font-heading font-bold text-[#1a2535] text-[36px] md:text-[50px] leading-[1.1] tracking-tight block"
            />
            <p className="text-[#64748b] text-sm md:text-base mt-1.5 max-w-2xl">
              Access product folders, clinical brochures, IFUs, high-res renders, and restricted sales representative files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Admin Management Toggle */}
            <button
              onClick={handleToggleAdminMode}
              className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isAdminMode
                  ? "bg-[#0a0e17] text-white border-[#0a0e17] shadow-lg"
                  : "bg-white text-[#64748b] border-slate-300 hover:text-[#0a0e17] hover:border-slate-400"
              }`}
            >
              <Settings className={`w-4 h-4 ${isAdminMode ? "text-[#2ac4f4] animate-spin" : ""}`} />
              <span>{isAdminMode ? "Admin Active" : "Admin Manager"}</span>
            </button>

            {/* Auth Banner */}
            <div className="bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-2.5 px-4 flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#0284c7]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-xs text-[#0a0e17]">
                        {userRole === "admin" ? "CMS Administrator" : "Sales Representative"}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="font-mono text-[11px] text-[#64748b] truncate max-w-[150px]">{userEmail}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-1 p-1.5 text-[#94a3b8] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
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
                    <div className="font-heading font-semibold text-xs text-[#0a0e17]">Guest Access</div>
                    <div className="text-[10px] text-[#64748b]">Sales folders locked</div>
                  </div>
                  <Link
                    to="/login"
                    className="ml-1 bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] text-xs font-heading font-semibold px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Admin Action Bar (Visible when Admin Mode active) */}
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-[#0a0e17] text-white rounded-2xl border border-[#2ac4f4]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 flex items-center justify-center text-[#2ac4f4]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">CMS Admin Control Panel Active</h4>
                <p className="text-xs text-white/60">Upload new PDF/media files, modify folder contents, or manage Admin Whitelist.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <Link
                to="/resourcesadmin"
                className="bg-white/10 text-white font-heading font-bold text-xs px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Whitelist Settings
              </Link>
              <button
                onClick={handleOpenNew}
                className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Resource</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Product Selector Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-black/[0.08] pb-4">
          <button
            onClick={() => {
              setSelectedProductId("all");
              setSelectedFolderId(null);
            }}
            className={`px-4 py-2 rounded-xl font-heading text-xs font-bold transition-all cursor-pointer ${
              selectedProductId === "all"
                ? "bg-[#0a0e17] text-white shadow-md"
                : "bg-white text-[#64748b] hover:text-[#0a0e17] border border-slate-200"
            }`}
          >
            All Products
          </button>
          {INITIAL_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => {
                setSelectedProductId(prod.id);
                setSelectedFolderId(null);
              }}
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedProductId === prod.id
                  ? "bg-[#0a0e17] text-white shadow-md"
                  : "bg-white text-[#64748b] hover:text-[#0a0e17] border border-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: prod.color }} />
              <span>{prod.name}</span>
            </button>
          ))}
        </div>

        {/* WINDOWS EXPLORER NAVIGATION TOOLBAR (Matching Screenshot!) */}
        <div className="bg-white rounded-t-2xl border border-black/[0.08] p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          {/* Breadcrumb Path Display */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs md:text-sm font-sans text-[#475569] shrink-0">
            <button
              onClick={() => setSelectedFolderId(null)}
              className="font-semibold hover:text-[#0284c7] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Folder className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Resources-Sales</span>
            </button>

            {selectedProductId !== "all" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <button
                  onClick={() => setSelectedFolderId(null)}
                  className="font-bold text-[#0a0e17] hover:text-[#0284c7] transition-colors cursor-pointer shrink-0"
                >
                  {currentProduct.code}
                </button>
              </>
            )}

            {selectedFolderId && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 shrink-0">
                  {selectedFolderId}
                </span>
              </>
            )}
          </div>

          {/* Explorer Right Controls: Search bar & View toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  selectedFolderId
                    ? `Search inside ${selectedFolderId}...`
                    : `Search ${selectedProductId === "all" ? "all files" : currentProduct.code}...`
                }
                className="bg-slate-100 border border-slate-200 text-xs text-[#0a0e17] placeholder-slate-400 rounded-xl pl-9 pr-3.5 py-2 w-[200px] md:w-[260px] focus:outline-none focus:border-[#2ac4f4] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-white text-[#0a0e17] shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-white text-[#0a0e17] shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* EXPLORER MAIN CONTENT CONTAINER */}
        <div className="bg-white border-x border-b border-black/[0.08] rounded-b-2xl p-6 shadow-sm min-h-[420px]">
          {/* FOLDER DIRECTORY GRID (If no folder is selected yet) */}
          {!selectedFolderId ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm text-[#64748b] uppercase tracking-wider">
                  Folders in {selectedProductId === "all" ? "All Products" : currentProduct.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {INITIAL_FOLDERS.length} Folders Available
                </span>
              </div>

              {/* Folder Grid - Styled exactly like the Windows Explorer screenshot! */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                {INITIAL_FOLDERS.map((folder) => {
                  const folderFileCount = files.filter(
                    (f) =>
                      (selectedProductId === "all" || f.productId === selectedProductId) &&
                      f.folderId === folder.id
                  ).length;

                  return (
                    <motion.div
                      key={folder.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFolderClick(folder)}
                      className={`group cursor-pointer p-4 rounded-2xl border transition-all flex flex-col items-center text-center relative ${
                        folder.isGated && !isAuthenticated
                          ? "bg-slate-50/70 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"
                          : "bg-white border-slate-200 hover:border-[#2ac4f4] hover:shadow-[0_8px_24px_rgba(42,196,244,0.12)]"
                      }`}
                    >
                      {/* Gated Badge Indicator */}
                      {folder.isGated && (
                        <div className="absolute top-2.5 right-2.5">
                          {isAuthenticated ? (
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                              <Unlock className="w-2.5 h-2.5" />
                              Unlocked
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              Sales Reps
                            </span>
                          )}
                        </div>
                      )}

                      {/* WINDOWS EXPLORER YELLOW FOLDER ICON WITH INSIDE DOCUMENT PREVIEW */}
                      <div className="relative my-3">
                        <div className="w-20 h-16 relative">
                          {/* Folder Backing */}
                          <svg className="w-full h-full text-amber-400 drop-shadow-sm" viewBox="0 0 100 80" fill="currentColor">
                            <path d="M0 12C0 5.37258 5.37258 0 12 0H35C39.4183 0 43.4183 2.41828 45.4183 6L50 14H88C94.6274 14 100 19.3726 100 26V68C100 74.6274 94.6274 80 88 80H12C5.37258 80 0 74.6274 0 68V12Z" />
                          </svg>

                          {/* Folder Front Lip */}
                          <div className="absolute bottom-0 inset-x-0 h-11 bg-amber-300 rounded-b-xl border-t border-amber-200 shadow-inner" />

                          {/* Inside Folder Preview Sheet Badge (PDF, Image, Video) */}
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-md px-1.5 py-1 shadow-md border border-slate-200 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
                            {folder.iconType === "pdf" && <FileText className="w-5 h-5 text-red-500" />}
                            {folder.iconType === "image" && <ImageIcon className="w-5 h-5 text-blue-500" />}
                            {folder.iconType === "video" && <Video className="w-5 h-5 text-emerald-500" />}
                            {folder.iconType === "code" && <FileSpreadsheet className="w-5 h-5 text-purple-500" />}
                            {folder.iconType === "doc" && <FileText className="w-5 h-5 text-[#2ac4f4]" />}
                          </div>
                        </div>
                      </div>

                      {/* Folder Name & Details */}
                      <h4 className="font-heading font-bold text-sm text-[#0a0e17] group-hover:text-[#0284c7] transition-colors mt-1">
                        {folder.name}
                      </h4>

                      <p className="text-[11px] text-[#64748b] mt-1 line-clamp-1 max-w-[180px]">
                        {folder.description}
                      </p>

                      <div className="mt-2 text-[10px] font-mono font-semibold text-[#94a3b8] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {folderFileCount} {folderFileCount === 1 ? "file" : "files"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* INSIDE FOLDER VIEW (Files catalog inside selected folder) */
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-xs font-heading font-bold flex items-center gap-1 cursor-pointer"
                  >
                    ← Back to Folders
                  </button>

                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#0a0e17] flex items-center gap-2">
                      <span>{selectedFolderId}</span>
                      {currentFolder?.isGated && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                          Restricted Sales Folder
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-0.5">{currentFolder?.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span>Showing {filteredFiles.length} files</span>
                </div>
              </div>

              {/* Empty State */}
              {filteredFiles.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <FolderOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="font-heading font-semibold text-[#0a0e17]">No files found in this folder</p>
                  <p className="text-xs text-[#64748b] mt-1">Try resetting search filters or upload a new file.</p>
                  {isAdminMode && (
                    <button
                      onClick={handleOpenNew}
                      className="mt-4 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      + Upload File Here
                    </button>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                /* FILE GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`group p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        file.gated && !isAuthenticated
                          ? "bg-slate-50 border-slate-200 opacity-80"
                          : "bg-white border-slate-200 hover:border-[#2ac4f4] hover:shadow-[0_6px_20px_rgba(42,196,244,0.1)]"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                            {getFormatIcon(file.format)}
                          </div>

                          <div className="flex items-center gap-1.5">
                            {file.gated && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border border-amber-200">
                                Gated
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-slate-400 font-medium">
                              {file.size}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-heading font-bold text-[#0a0e17] text-base group-hover:text-[#0284c7] transition-colors leading-snug">
                          {file.title}
                        </h4>

                        <p className="text-xs text-[#64748b] mt-2 leading-relaxed">
                          {file.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-[11px] font-mono text-slate-400">
                          {file.dateAdded}
                        </div>

                        <div className="flex items-center gap-2">
                          {/* File Preview Trigger */}
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="p-2 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 rounded-xl transition-colors cursor-pointer"
                            title="Preview File"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {isAdminMode && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(file)}
                                className="p-2 text-slate-500 hover:text-[#0891b2] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                                title="Edit Metadata"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleDownload(file)}
                            className="font-heading text-xs font-bold bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* FILE LIST TABLE VIEW */
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-heading uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Document Title</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Access</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredFiles.map((file) => (
                        <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                              {getFormatIcon(file.format)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-heading font-bold text-[#0a0e17] text-sm">{file.title}</div>
                            <div className="text-[11px] text-slate-500">{file.description}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-700 uppercase">
                            {file.productId}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500">{file.size}</td>
                          <td className="py-3 px-4">
                            {file.gated ? (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                                Gated
                              </span>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                                Public
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setPreviewFile(file)}
                                className="p-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownload(file)}
                                className="bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] font-heading font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="w-3 h-3" />
                                <span>Get</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FILE PREVIEW MODAL */}
      <AnimatePresence>
        {previewFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewFile(null)}
              className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[700px] bg-[#0c1325] border border-white/15 rounded-[28px] p-6 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setPreviewFile(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  {getFormatIcon(previewFile.format)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">{previewFile.title}</h3>
                  <div className="text-xs font-mono text-[#2ac4f4]">
                    {previewFile.size} • {previewFile.format.toUpperCase()} Document
                  </div>
                </div>
              </div>

              {/* Preview Window simulation */}
              <div className="bg-[#05080e] border border-white/10 rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden mb-6">
                {previewFile.previewUrl ? (
                  <img
                    src={previewFile.previewUrl}
                    alt={previewFile.title}
                    className="max-h-[340px] w-auto object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center max-w-sm">
                    <FileText className="w-14 h-14 text-[#2ac4f4] mb-3 opacity-80" />
                    <h4 className="font-heading font-bold text-white text-base">In-Browser Document Preview</h4>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {previewFile.description}
                    </p>
                    <div className="mt-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-white/70">
                      Sample PDF page 1 of 8 • Vector High-Res Render
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast("Link copied to clipboard!");
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Resource Link</span>
                </button>

                <button
                  onClick={() => {
                    handleDownload(previewFile);
                    setPreviewFile(null);
                  }}
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete File ({previewFile.size})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN AUTH CHALLENGE MODAL */}
      <AnimatePresence>
        {showAdminLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[460px] bg-[#0c1325] border border-white/15 rounded-[28px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

              <div className="w-12 h-12 rounded-2xl bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                Admin CMS Access Required
              </h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Please enter your administrator credentials. Email must be present on the Elevation Spine Whitelist.
              </p>

              {adminAuthError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{adminAuthError}</span>
                </div>
              )}

              <form onSubmit={handleAdminAuthSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="admin@elevationspine.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Admin Password</label>
                  <input
                    type="password"
                    required
                    value={adminPassInput}
                    onChange={(e) => setAdminPassInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-1"
                >
                  Verify Admin Privileges
                </button>
              </form>

              <div className="mt-5 text-center">
                <Link
                  to="/resourcesadmin"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="text-xs text-[#2ac4f4] hover:underline"
                >
                  Or open dedicated /resourcesadmin dashboard →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SALES LOGIN REQUIREMENT MODAL (When clicking gated folders) */}
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
                This folder (<code className="text-amber-300 font-mono font-bold">Coding-Guide, Surgical-Technique, Training</code>) contains confidential collateral intended exclusively for authorized sales representatives.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem("elevation_sales_auth", "true");
                    localStorage.setItem("elevation_sales_user", "alex.salesrep@gmail.com");
                    localStorage.setItem("elevation_user_role", "sales_rep");
                    setIsAuthenticated(true);
                    setUserEmail("alex.salesrep@gmail.com");
                    setUserRole("sales_rep");
                    setShowLoginModal(false);
                    showToast("Signed in as Sales Representative");
                  }}
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs py-3 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer"
                >
                  Quick Unlock as Sales Rep
                </button>

                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/login");
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer text-center"
                >
                  Log In with Rep Credentials
                </button>

                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full text-white/50 hover:text-white font-heading text-xs py-2 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN UPLOAD / EDIT MODAL */}
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
                {editingFile ? "Edit Resource Metadata" : "Upload New Product Resource"}
              </h3>
              <p className="text-white/60 text-xs mb-6">
                Publish or modify document files in product folders.
              </p>

              <form onSubmit={handleSaveFile} className="flex flex-col gap-4">
                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. SABER-C Surgical Technique Manual 2026"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Description / Summary</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief description of what this document contains..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Target Product</label>
                    <select
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Target Folder</label>
                    <select
                      value={formFolder}
                      onChange={(e) => setFormFolder(e.target.value)}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      {INITIAL_FOLDERS.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      <option value="png">PNG Image Asset</option>
                      <option value="mp4">MP4 Video Clip</option>
                      <option value="zip">ZIP Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Access Level</label>
                    <select
                      value={formGated ? "true" : "false"}
                      onChange={(e) => setFormGated(e.target.value === "true")}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      <option value="false">🌐 Public Access</option>
                      <option value="true">🔒 Sales Reps Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">File Attachment</label>
                  <div className="border-2 border-dashed border-white/20 hover:border-[#2ac4f4]/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/[0.02]">
                    <Upload className="w-6 h-6 text-[#2ac4f4] mx-auto mb-1" />
                    <span className="text-xs text-white/80 font-heading block font-semibold">
                      Drag & drop file or click to browse
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Supports PDF, XLSX, PPTX, PNG, MP4, ZIP</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3 rounded-xl shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-2"
                >
                  {editingFile ? "Save Resource Changes" : "Publish to Folder"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
