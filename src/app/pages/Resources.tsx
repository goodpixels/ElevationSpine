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
  Play,
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
  logoUrl?: string;
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
    name: "Saber-C AVIA™",
    code: "Saber-C AVIA",
    description: "Anterior Cervical Fixation System with Integrated Zero-Profile Fixation",
    color: "#2ac4f4",
    logoUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg",
  },
  {
    id: "saber-xa",
    name: "SABER-XA™",
    code: "SABER-XA",
    description: "Expandable Anterior Lumbar Interbody Fusion System with True Intra-Operative Customization",
    color: "#0891b2",
  },
  {
    id: "institutional",
    name: "Institutional Videos",
    code: "INSTITUTIONAL",
    description: "Company Vision Trailer, Corporate Technology Overviews & Brand Story Media",
    color: "#2ac4f4",
  },
];

export const INITIAL_FOLDERS: FolderItem[] = [
  {
    id: "Instructions for Use (IFU)",
    name: "Instructions for Use (IFU)",
    isGated: false,
    description: "Official FDA-cleared Instructions for Use documentation (Public Download)",
    iconType: "pdf",
  },
  {
    id: "Spitrex Clinical Data",
    name: "Spitrex Clinical Data",
    isGated: true,
    description: "Clinical trial results & biomechanical performance data packages",
    iconType: "pdf",
  },
  {
    id: "Saber-C AVIA™ Porous Wicking",
    name: "Saber-C AVIA™ Porous Wicking",
    isGated: true,
    description: "Biomechanical fluid wicking demonstration & cellular study data",
    iconType: "image",
  },
  {
    id: "Surgical Technique & Brochure",
    name: "Surgical Technique & Brochure",
    isGated: true,
    description: "Step-by-step surgical manual & procedural sequence brochure",
    iconType: "pdf",
  },
  {
    id: "Brochure",
    name: "Brochure",
    isGated: true,
    description: "Commercial product brochures & patient education overview documents",
    iconType: "pdf",
  },
  {
    id: "Animations",
    name: "Animations",
    isGated: true,
    description: "3D CAD mechanical animations & procedural motion graphics clips",
    iconType: "video",
  },
  {
    id: "Videos",
    name: "Videos",
    isGated: true,
    description: "High-definition 3D video walkthroughs & clinical procedure videos",
    iconType: "video",
  },
  {
    id: "System Overview",
    name: "System Overview",
    isGated: true,
    description: "Comprehensive zero-profile platform system overview",
    iconType: "doc",
  },
  {
    id: "Press Release - 510k Clearance",
    name: "Press Release - 510k Clearance",
    isGated: true,
    description: "FDA 510(k) clearance press release & regulatory announcement",
    iconType: "word",
  },
  {
    id: "Images",
    name: "Images",
    isGated: true,
    description: "High-resolution 3D renders, implant photography & tray layouts",
    iconType: "image",
  },
  {
    id: "Part Numbers & Pricing",
    name: "Part Numbers & Pricing",
    isGated: true,
    description: "Confidential SKU matrix, catalog part numbers & price list (Sales Rep Only)",
    iconType: "code",
  },
  {
    id: "Coding-Guide",
    name: "Coding-Guide",
    isGated: true,
    description: "Confidential CPT reimbursement codes & hospital fee schedules (Sales Rep Only)",
    iconType: "pdf",
  },
  {
    id: "New Instrument Launch Plans and Targeting",
    name: "New Instrument Launch Plans and Targeting",
    isGated: true,
    description: "Confidential instrument rollout plans & surgeon targeting matrix (Sales Rep Only)",
    iconType: "doc",
  },
  {
    id: "Porous Branding",
    name: "Porous Branding",
    isGated: true,
    description: "PorOss™ 3D porous titanium branding & marketing guidelines (Sales Rep Only)",
    iconType: "image",
  },
];

export interface VideoLibraryItem {
  id: string;
  productId: "saber-c" | "saber-xa" | "elevation";
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  url: string;
  thumb: string;
  isGated: boolean;
  description: string;
}

export const VIDEO_LIBRARY: VideoLibraryItem[] = [
  {
    id: "saber-c-final-anim",
    productId: "saber-c",
    title: "Saber-C AVIA™ — Final 3D Animation Walkthrough",
    subtitle: "Zero-profile cervical fixation & PorOss lattice deployment",
    category: "3D Animation",
    duration: "1:42",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787016076/SaberC-FinalAnimation_na701a.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
    isGated: false,
    description: "Full cinematic walkthrough demonstrating zero-profile interbody delivery, PorOss wicking architecture, and seamless integrated screw/spike options.",
  },
  {
    id: "elevation-vision-trailer",
    productId: "institutional",
    title: "Elevation Spine — Company Vision & Technology Trailer",
    subtitle: "Single-tray procedural efficiency and breakthrough spinal design",
    category: "Institutional",
    duration: "2:15",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787015467/Trailer_v2B-HD_doraqy.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386320/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png",
    isGated: false,
    description: "Overview of Elevation Spine's founding philosophy, featuring single-tray simplicity, zero secondary plating, and accelerated fusion science.",
  },
  {
    id: "saber-c-porous-wicking",
    productId: "saber-c",
    title: "Saber-C AVIA™ — Porous Wicking & Trabecular Fluid Dynamic Loop",
    subtitle: "PorOss 3D printed titanium capillary action",
    category: "Biomechanical Science",
    duration: "0:48",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
    isGated: true,
    description: "High-magnification visualization of fluid and blood wicking through the micro-porous PorOss titanium lattice matrix.",
  },
  {
    id: "saber-c-inline-insertion",
    productId: "saber-c",
    title: "Saber-C AVIA™ — In-Line Insertion & Delivery Technique",
    subtitle: "Direct visualization and anatomical disc space placement",
    category: "Surgical Delivery",
    duration: "1:15",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386320/Saber-C_TECH-21-Angled_driver_insertion_q3mpem.png",
    isGated: true,
    description: "Step-by-step surgical insertion technique showing in-line guidance and zero-profile construct seating.",
  },
  {
    id: "saber-c-screw-fixation",
    productId: "saber-c",
    title: "Saber-C AVIA™ — Divergent Screw Fixation Mechanics",
    subtitle: "High-angle biomechanical purchase without plate profile",
    category: "Surgical Delivery",
    duration: "1:08",
    url: "https://res.cloudinary.com/mrjnagvc/video/upload/v1790386345/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4",
    thumb: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386318/Saber-C_TECH-19-Adjacent_Segment_Screws_copy_uog5bw.png",
    isGated: true,
    description: "Biomechanical demonstration of multi-axial self-locking screws providing rigid cervical stabilization without adjacent-level plate overhang.",
  },
];

export const INITIAL_FILES: FileItem[] = [
  // ── Saber-C AVIA PUBLIC IFU ──
  {
    id: "sc-ifu-public",
    productId: "saber-c",
    folderId: "Instructions for Use (IFU)",
    title: "Saber-C AVIA™ Instructions for Use (IFU)",
    description: "Official FDA-cleared Instructions for Use (IFU) document for the Saber-C AVIA™ anterior cervical fusion system.",
    format: "pdf",
    size: "3.2 MB",
    gated: false,
    dateAdded: "2026-07-01",
  },

  // ── SABER-XA PUBLIC IFU ──
  {
    id: "sxa-ifu-public",
    productId: "saber-xa",
    folderId: "Instructions for Use (IFU)",
    title: "Saber-XA™ Instructions for Use (IFU)",
    description: "Official Instructions for Use (IFU) document for the Saber-XA™ expandable lumbar interbody system.",
    format: "pdf",
    size: "2.9 MB",
    gated: false,
    dateAdded: "2026-07-01",
  },

  // ── ELEVATION SPINE CORPORATE TRAILER ──
  {
    id: "elevation-trailer",
    productId: "institutional",
    folderId: "Videos",
    title: "Elevation Spine — Corporate Vision & Technology Trailer (HD)",
    description: "Official company overview trailer highlighting single-tray procedural efficiency, PorOss lattice, and zero-profile stability.",
    format: "mp4",
    size: "44.2 MB",
    downloadUrl: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787015467/Trailer_v2B-HD_doraqy.mp4",
    previewUrl: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787015467/Trailer_v2B-HD_doraqy.mp4",
    gated: false,
    dateAdded: "2026-08-15",
  },

  // ── SABER-C GATED PORTAL FILES ──
  {
    id: "sc-anim-1",
    productId: "saber-c",
    folderId: "Animations",
    title: "Saber-C AVIA™ 3D Zero-Profile Spike Deployment Animation",
    description: "3D CAD animation illustrating smooth zero-profile insertion and spike seating mechanism.",
    format: "mp4",
    size: "32.6 MB",
    downloadUrl: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787016076/SaberC-FinalAnimation_na701a.mp4",
    previewUrl: "https://res.cloudinary.com/mrjnagvc/video/upload/v1787016076/SaberC-FinalAnimation_na701a.mp4",
    gated: true,
    dateAdded: "2026-06-12",
  },
  {
    id: "sc-brochure-1",
    productId: "saber-c",
    folderId: "Brochure",
    title: "Saber-C AVIA™ Commercial Product Brochure 2026",
    description: "Complete feature overview, zero-profile mechanics, and PorOss titanium lattice specs.",
    format: "pdf",
    size: "5.6 MB",
    gated: true,
    dateAdded: "2026-06-15",
  },
  {
    id: "sc-brochure-2",
    productId: "saber-c",
    folderId: "Brochure",
    title: "Saber-C AVIA™ Patient Education Guide",
    description: "Patient-friendly guide explaining anterior cervical interbody fusion.",
    format: "pdf",
    size: "2.4 MB",
    gated: true,
    dateAdded: "2026-05-10",
  },
  {
    id: "sc-coding-1",
    productId: "saber-c",
    folderId: "Coding-Guide",
    title: "Saber-C AVIA™ CPT Reimbursement & Billing Guide",
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
    title: "Saber-C AVIA™ Beauty Construct ISO Render",
    description: "Ultra high-resolution 3D CAD rendering of Saber-C implant construct with integrated spikes.",
    format: "png",
    size: "8.4 MB",
    gated: true,
    dateAdded: "2026-06-20",
    previewUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1790386326/Saber-C_BEAUTY-01-Implant_Contruct_Spikes_ISO_dnjphd.png",
  },
  {
    id: "sc-launch-1",
    productId: "saber-c",
    folderId: "New Instrument Launch Plans and Targeting",
    title: "Saber-C AVIA™ Instrument Launch Strategy & Hospital Targeting 2026",
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
    title: "Saber-C AVIA™ Catalog Part Numbers & Pricing Matrix",
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
    id: "sc-logo-vector-1",
    productId: "saber-c",
    folderId: "Porous Branding",
    title: "Saber-C AVIA™ Official White Vector Logo (SVG)",
    description: "Official master vector brand logo for Saber-C AVIA™ zero-profile cervical fixation construct.",
    format: "png",
    size: "42 KB",
    gated: false,
    dateAdded: "2026-08-18",
    previewUrl: "https://res.cloudinary.com/mrjnagvc/image/upload/v1787072756/elevation-spine-saberc-avia-logo-white-rgb_mxhj8o.svg",
  },
  {
    id: "sc-press-1",
    productId: "saber-c",
    folderId: "Press Release - 510k Clearance",
    title: "Elevation Spine Saber-C AVIA™ FDA 510(k) Clearance Press Release",
    description: "Official press announcement regarding FDA 510(k) clearance for zero-profile cervical fixation.",
    format: "pdf",
    size: "1.1 MB",
    gated: true,
    dateAdded: "2026-04-10",
  },
  {
    id: "sc-wick-1",
    productId: "saber-c",
    folderId: "Saber-C Porous Wicking",
    title: "Saber-C AVIA™ Porous Titanium Fluid Wicking Micrograph Analysis",
    description: "Visual analysis of fluid wicking capability into interconnected 3D porous titanium structure.",
    format: "png",
    size: "7.2 MB",
    gated: true,
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
    gated: true,
    dateAdded: "2026-06-05",
  },
  {
    id: "sc-tech-1",
    productId: "saber-c",
    folderId: "Surgical Technique & Brochure",
    title: "Saber-C AVIA™ Surgical Technique Manual & Technical Brochure",
    description: "Comprehensive step-by-step surgical manual for anterior cervical discectomy & fusion.",
    format: "pdf",
    size: "12.4 MB",
    gated: true,
    dateAdded: "2026-06-08",
  },
  {
    id: "sc-sys-1",
    productId: "saber-c",
    folderId: "System Overview",
    title: "Saber-C AVIA™ Zero-Profile Platform System Overview",
    description: "Engineering overview of zero-profile integrated spike technology and sizing.",
    format: "pdf",
    size: "4.1 MB",
    gated: true,
    dateAdded: "2026-05-01",
  },
  {
    id: "sc-vids-1",
    productId: "saber-c",
    folderId: "Videos",
    title: "Saber-C AVIA™ Full Surgical Procedure Video Walkthrough",
    description: "Clinical surgical video demonstrating zero-profile seating and instrumentation.",
    format: "mp4",
    size: "42.0 MB",
    gated: true,
    dateAdded: "2026-06-18",
  },

  // ── SABER-XA GATED PORTAL FILES ──
  {
    id: "sxa-brochure-1",
    productId: "saber-xa",
    folderId: "Brochure",
    title: "Saber-XA™ Lateral Access System Preview",
    description: "Overview of lateral access zero-profile fixation currently in clinical validation.",
    format: "pdf",
    size: "4.2 MB",
    gated: true,
    dateAdded: "2026-06-04",
  },
  {
    id: "sxa-coding-1",
    productId: "saber-xa",
    folderId: "Coding-Guide",
    title: "Saber-XA™ Preliminary Coding Brief",
    description: "Preliminary reimbursement guidance for lateral interbody procedures.",
    format: "pdf",
    size: "1.5 MB",
    gated: true,
    dateAdded: "2026-06-19",
  },
  {
    id: "sxa-surg-1",
    productId: "saber-xa",
    folderId: "Surgical Technique & Brochure",
    title: "Saber-XA™ Lateral Approach Technique Guide",
    description: "Surgical approach sequence and instrumentation for lateral fixation.",
    format: "pdf",
    size: "9.1 MB",
    gated: true,
    dateAdded: "2026-06-21",
  },

  // ── POROSS GATED PORTAL FILES ──
  {
    id: "por-brochure-1",
    productId: "poross",
    folderId: "Brochure",
    title: "PorOss™ 3D Titanium Technology Whitepaper",
    description: "Engineering whitepaper detailing porosity ratio, modulus of elasticity, and cellular ingrowth.",
    format: "pdf",
    size: "3.8 MB",
    gated: true,
    dateAdded: "2026-05-18",
  },
  {
    id: "por-img-1",
    productId: "poross",
    folderId: "Images",
    title: "PorOss™ Micro-CT Bone Ingrowth Scan",
    description: "High-resolution micro-CT scan revealing 70% porous interconnected pore lattice.",
    format: "png",
    size: "9.8 MB",
    gated: true,
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
  const [activeMainTab, setActiveMainTab] = useState<"documents" | "videos">("documents");
  const [activeVideo, setActiveVideo] = useState<VideoLibraryItem>(VIDEO_LIBRARY[0]);
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
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-16 min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto">
        {/* Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 bg-[#0a0e17] text-white px-5 py-3 rounded-[8px] shadow-2xl border border-[#2ac4f4]/40 flex items-center gap-3 font-heading text-sm"
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
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-[#2ac4f4]/10 border border-[#2ac4f4]/30 rounded-[3px] px-3 py-1 text-xs font-mono text-[#0891b2] mb-3 uppercase tracking-widest font-semibold">
              Document & Media Library
            </div>
            <TextRevealTitle
              as="h1"
              text="Resource Center"
              className="font-heading font-bold text-[#1a2535] text-[36px] md:text-[50px] leading-[1.1] tracking-tight block w-full"
            />
            <p className="text-[#64748b] text-[15px] md:text-[16px] mt-2 max-w-2xl">
              Access product folders, clinical brochures, IFUs, high-res renders, and restricted sales representative files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Admin Management Toggle */}
            <button
              onClick={handleToggleAdminMode}
              className={`px-4 py-2.5 rounded-[5px] font-heading text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isAdminMode
                  ? "bg-[#0a0e17] text-white border-[#0a0e17] shadow-lg"
                  : "bg-white text-[#64748b] border-slate-300 hover:text-[#0a0e17] hover:border-slate-400"
              }`}
            >
              <Settings className={`w-4 h-4 ${isAdminMode ? "text-[#2ac4f4] animate-spin" : ""}`} />
              <span>{isAdminMode ? "Admin Active" : "Admin Manager"}</span>
            </button>

            {/* Auth Banner */}
            <div className="bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[6px] p-2.5 px-4 flex items-center gap-3">
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
                    className="ml-1 p-1.5 text-[#94a3b8] hover:text-red-500 hover:bg-red-50 rounded-[4px] transition-colors cursor-pointer"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#0284c7]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-xs text-[#0a0e17]">Public Guest Access</div>
                    <div className="text-[10px] text-[#64748b]">IFUs public · Sales materials gated</div>
                  </div>
                  <Link
                    to="/login"
                    className="ml-1 bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] text-xs font-heading font-semibold px-3.5 py-1.5 rounded-[4px] transition-colors"
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
            className="mb-8 p-4 bg-[#0a0e17] text-white rounded-[6px] border border-[#2ac4f4]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[4px] bg-[#2ac4f4]/20 border border-[#2ac4f4]/40 flex items-center justify-center text-[#2ac4f4]">
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
                className="bg-white/10 text-white font-heading font-bold text-xs px-4 py-2 rounded-[4px] hover:bg-white/20 transition-all border border-white/20"
              >
                Whitelist Settings
              </Link>
              <button
                onClick={handleOpenNew}
                className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2.5 rounded-[4px] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Resource</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* MAIN TAB SWITCHER (Document Library vs Video Library) */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveMainTab("documents")}
            className={`px-5 py-2.5 rounded-[4px] font-heading font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === "documents"
                ? "bg-[#0a0e17] text-white shadow-md border-b-2 border-b-[#2ac4f4]"
                : "bg-white text-slate-600 hover:text-[#0a0e17] border border-slate-200"
            }`}
          >
            <Folder className="w-4 h-4 text-[#2ac4f4]" />
            <span>Document & File Library</span>
          </button>

          <button
            onClick={() => setActiveMainTab("videos")}
            className={`px-5 py-2.5 rounded-[4px] font-heading font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === "videos"
                ? "bg-[#0a0e17] text-white shadow-md border-b-2 border-b-[#2ac4f4]"
                : "bg-white text-slate-600 hover:text-[#0a0e17] border border-slate-200"
            }`}
          >
            <Video className="w-4 h-4 text-[#2ac4f4]" />
            <span>Video & Animation Library</span>
            <span className="bg-[#2ac4f4]/20 text-[#0284c7] text-[10px] font-mono font-bold px-2 py-0.5 rounded-[3px]">
              {VIDEO_LIBRARY.length} Videos
            </span>
          </button>
        </div>

        {/* ── MODE 1: VIDEO & ANIMATION LIBRARY THEATER ── */}
        {activeMainTab === "videos" ? (
          <div className="bg-white rounded-[8px] border border-black/[0.08] p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Cols: Cinema Player */}
              <div className="lg:col-span-8 space-y-4">
                <div className="relative aspect-video bg-black rounded-[8px] overflow-hidden shadow-2xl border border-slate-200">
                  {activeVideo.isGated && !isAuthenticated ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                      <img src={activeVideo.thumb} alt={activeVideo.title} className="w-full h-full object-cover filter blur-md opacity-25" />
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-[6px] bg-[#0a0e17] text-[#2ac4f4] border border-white/20 flex items-center justify-center shadow-xl mb-3">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="font-heading font-bold text-white text-lg mb-1">Restricted Surgical Video</h4>
                        <p className="text-white/60 text-xs max-w-sm mb-4">This master clinical video is gated for authorized Elevation Spine sales reps and surgeons.</p>
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-6 py-2.5 rounded-[4px] hover:bg-[#6ecff4] transition-all cursor-pointer shadow-md"
                        >
                          Sign In to Unlock Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <video
                      key={activeVideo.id}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    >
                      <source src={activeVideo.url} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  )}
                </div>

                {/* Video Info Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-sky-50 text-[#0284c7] border border-sky-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[2px] uppercase">
                        {activeVideo.category}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        Duration: {activeVideo.duration}
                      </span>
                      {activeVideo.isGated && (
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] ${
                          isAuthenticated ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
                        }`}>
                          {isAuthenticated ? "Unlocked" : "Private"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-[#0a0e17]">
                      {activeVideo.title}
                    </h3>
                    <p className="text-sm text-[#64748b] mt-1 leading-relaxed max-w-2xl">
                      {activeVideo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (activeVideo.isGated && !isAuthenticated) {
                          setShowLoginModal(true);
                          return;
                        }
                        const a = document.createElement("a");
                        a.href = activeVideo.url;
                        a.download = `${activeVideo.id}.mp4`;
                        a.target = "_blank";
                        a.click();
                        showToast(`Downloading "${activeVideo.title}" master MP4...`);
                      }}
                      className="bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] font-heading font-bold text-xs px-4 py-2.5 rounded-[4px] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      {activeVideo.isGated && !isAuthenticated ? <Lock className="w-3.5 h-3.5 text-[#2ac4f4]" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{activeVideo.isGated && !isAuthenticated ? "Unlock Video" : "Download Master (MP4)"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Video Playlist Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-heading font-bold text-sm text-[#0a0e17] flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#2ac4f4]" />
                    <span>Media Catalog Playlist</span>
                  </h4>
                  <span className="font-mono text-xs text-slate-400 font-semibold">{VIDEO_LIBRARY.length} items</span>
                </div>

                <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                  {VIDEO_LIBRARY.map((vid) => {
                    const isSelected = activeVideo.id === vid.id;
                    const isVidPrivate = vid.isGated && !isAuthenticated;

                    return (
                      <button
                        key={vid.id}
                        onClick={() => setActiveVideo(vid)}
                        className={`w-full p-3 rounded-[6px] border text-left transition-all flex gap-3 items-center group cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? "bg-[#0a0e17] text-white border-[#2ac4f4] shadow-md"
                            : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-14 rounded-[4px] overflow-hidden bg-black shrink-0 border border-black/10">
                          <img src={vid.thumb} alt={vid.title} className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isVidPrivate ? "filter blur-[1.5px] opacity-60" : ""}`} />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center">
                              <Play className="w-3 h-3 text-[#2ac4f4] fill-[#2ac4f4] ml-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 py-0.2 rounded font-bold">
                            {vid.duration}
                          </span>
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-[9px] font-mono font-bold uppercase ${isSelected ? "text-[#7fd0ff]" : "text-[#0284c7]"}`}>
                              {vid.category}
                            </span>
                            {vid.isGated && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 flex items-center gap-0.5">
                                <Lock className="w-2 h-2" /> Private
                              </span>
                            )}
                          </div>
                          <h5 className={`font-heading font-bold text-xs leading-snug line-clamp-2 ${isSelected ? "text-white" : "text-[#0a0e17]"}`}>
                            {vid.title}
                          </h5>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── MODE 2: DOCUMENT & FILE EXPLORER ── */
          <div>
            {/* Product / Resource Selector Tabs */}
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-black/[0.08] pb-4">
              <button
                onClick={() => {
                  setSelectedProductId("all");
                  setSelectedFolderId(null);
                }}
                className={`px-4 py-2 rounded-[4px] font-heading text-xs font-bold transition-all cursor-pointer ${
                  selectedProductId === "all"
                    ? "bg-[#0a0e17] text-white shadow-sm"
                    : "bg-white text-[#64748b] hover:text-[#0a0e17] border border-slate-200"
                }`}
              >
                All Resources
              </button>
              {INITIAL_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setSelectedFolderId(null);
                  }}
                  className={`px-4 py-2 rounded-[4px] font-heading text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    selectedProductId === prod.id
                      ? "bg-[#0a0e17] text-white shadow-sm"
                      : "bg-white text-[#64748b] hover:text-[#0a0e17] border border-slate-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: prod.color }} />
                  <span>{prod.name}</span>
                </button>
              ))}
            </div>

            {/* WINDOWS EXPLORER NAVIGATION TOOLBAR */}
            <div className="bg-white rounded-t-[6px] border border-black/[0.08] p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
              {/* Breadcrumb Path Display */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs md:text-sm font-sans text-[#475569] shrink-0">
                <button
                  onClick={() => {
                    setSelectedProductId("all");
                    setSelectedFolderId(null);
                  }}
                  className="font-semibold hover:text-[#0284c7] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Folder className="w-4 h-4 text-[#2ac4f4] fill-[#2ac4f4]/20" />
                  <span>Elevation Resources</span>
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
                    <span className="font-bold text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded-[3px] border border-sky-200 shrink-0">
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
                    className="bg-slate-100 border border-slate-200 text-xs text-[#0a0e17] placeholder-slate-400 rounded-[4px] pl-9 pr-3.5 py-2 w-[200px] md:w-[260px] focus:outline-none focus:border-[#2ac4f4] transition-all"
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

                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-[4px] p-1 gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-[#0a0e17] shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                      viewMode === "list" ? "bg-white text-[#0a0e17] shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* FOLDER DIRECTORY GRID VIEW (Root level) */}
            <div className="bg-white rounded-b-[6px] border-x border-b border-black/[0.08] p-4 sm:p-6 shadow-sm">
              {!selectedFolderId ? (
                <div>
                  {/* Product Header Banner */}
                  {selectedProductId !== "all" && currentProduct && (
                    <div className="mb-6 p-4 rounded-[6px] bg-[#0a0e17] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 shadow-sm">
                      <div className="flex items-center gap-4">
                        {currentProduct.logoUrl ? (
                          <div className="bg-white/10 p-2 rounded-[4px] border border-white/10 shrink-0">
                            <img src={currentProduct.logoUrl} alt={currentProduct.name} className="h-6 sm:h-7 w-auto object-contain" />
                          </div>
                        ) : (
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: currentProduct.color }} />
                        )}
                        <div>
                          <h3 className="font-heading font-bold text-base text-white">{currentProduct.name}</h3>
                          <p className="text-white/60 text-xs mt-0.5">{currentProduct.description}</p>
                        </div>
                      </div>
                      {currentProduct.id === "saber-c" && (
                        <Link
                          to="/saber-c"
                          className="text-xs font-heading font-bold text-[#2ac4f4] hover:text-white transition-colors flex items-center gap-1.5 shrink-0 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-[4px] border border-[#2ac4f4]/30"
                        >
                          <span>View Product Page</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {currentProduct.id === "saber-xa" && (
                        <Link
                          to="/saber-xa"
                          className="text-xs font-heading font-bold text-[#2ac4f4] hover:text-white transition-colors flex items-center gap-1.5 shrink-0 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-[4px] border border-[#2ac4f4]/30"
                        >
                          <span>View Product Page</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      {selectedProductId === "all" ? "Resource Categories" : `Folders in ${currentProduct.name}`}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {selectedProductId === "all" ? `${INITIAL_PRODUCTS.length} Categories` : `${INITIAL_FOLDERS.length} Folders Available`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {selectedProductId === "all" ? (
                      INITIAL_PRODUCTS.map((prod) => {
                        const productFileCount = files.filter(f => f.productId === prod.id).length;
                        return (
                          <motion.div
                            key={prod.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedProductId(prod.id)}
                            className={`group cursor-pointer p-4 rounded-[6px] border transition-all flex flex-col items-center text-center relative bg-white border-slate-200 hover:border-[#2ac4f4] hover:shadow-[0_8px_24px_rgba(42,196,244,0.12)]`}
                          >
                            <div className="relative my-3">
                              <div className="w-20 h-16 relative">
                                <svg className="w-full h-full text-[#2ac4f4] drop-shadow-sm" viewBox="0 0 100 80" fill="currentColor">
                                  <path d="M0 12C0 5.37258 5.37258 0 12 0H35C39.4183 0 43.4183 2.41828 45.4183 6L50 14H88C94.6274 14 100 19.3726 100 26V68C100 74.6274 94.6274 80 88 80H12C5.37258 80 0 74.6274 0 68V12Z" />
                                </svg>
                                <div className="absolute bottom-0 inset-x-0 h-11 bg-[#0284c7] rounded-b-[4px] border-t border-[#38bdf8] shadow-inner" />
                                
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-[3px] px-1.5 py-1 shadow-md border border-slate-200 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: prod.color }} />
                                </div>
                              </div>
                            </div>
                            <h4 className="font-heading font-bold text-sm text-[#0a0e17] group-hover:text-[#0284c7] transition-colors mt-1">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-[#64748b] mt-1 line-clamp-1 max-w-[180px]">
                              {prod.description}
                            </p>
                            <div className="mt-2 text-[10px] font-mono font-semibold text-[#94a3b8] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                              {productFileCount} {productFileCount === 1 ? "file" : "files"}
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      INITIAL_FOLDERS.map((folder) => {
                        const folderFileCount = files.filter(
                          (f) =>
                            (selectedProductId === "all" || f.productId === selectedProductId) &&
                            f.folderId === folder.id
                        ).length;
                        const isPrivateGated = folder.isGated && !isAuthenticated;

                        return (
                        <motion.div
                          key={folder.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFolderClick(folder)}
                          className={`group cursor-pointer p-4 rounded-[6px] border transition-all flex flex-col items-center text-center relative overflow-hidden ${
                            isPrivateGated
                              ? "bg-slate-50/90 border-slate-200 hover:border-[#2ac4f4]/50 shadow-sm"
                              : "bg-white border-slate-200 hover:border-[#2ac4f4] hover:shadow-[0_8px_24px_rgba(42,196,244,0.12)]"
                          }`}
                        >
                          {/* Gated Badge Indicator */}
                          {folder.isGated && (
                            <div className="absolute top-2.5 right-2.5 z-20">
                              {isAuthenticated ? (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                                  <Unlock className="w-2.5 h-2.5" />
                                  Unlocked
                                </span>
                              ) : (
                                <span className="bg-[#0284c7]/10 text-[#0284c7] text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] border border-[#0284c7]/25 flex items-center gap-1">
                                  <Lock className="w-2.5 h-2.5" />
                                  Private
                                </span>
                              )}
                            </div>
                          )}

                          {/* INNER FOLDER CONTENT (Blurred if Private & Guest) */}
                          <div className={`w-full flex flex-col items-center transition-all duration-300 ${isPrivateGated ? "filter blur-[3.5px] select-none opacity-40 group-hover:blur-[1.5px] group-hover:opacity-55" : ""}`}>
                            <div className="relative my-3">
                              <div className="w-20 h-16 relative">
                                <svg className="w-full h-full text-[#2ac4f4] drop-shadow-sm" viewBox="0 0 100 80" fill="currentColor">
                                  <path d="M0 12C0 5.37258 5.37258 0 12 0H35C39.4183 0 43.4183 2.41828 45.4183 6L50 14H88C94.6274 14 100 19.3726 100 26V68C100 74.6274 94.6274 80 88 80H12C5.37258 80 0 74.6274 0 68V12Z" />
                                </svg>
                                <div className="absolute bottom-0 inset-x-0 h-11 bg-[#0284c7] rounded-b-[4px] border-t border-[#38bdf8] shadow-inner" />
                                
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-[3px] px-1.5 py-1 shadow-md border border-slate-200 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
                                  {folder.iconType === "pdf" && <FileText className="w-5 h-5 text-red-500" />}
                                  {folder.iconType === "image" && <ImageIcon className="w-5 h-5 text-blue-500" />}
                                  {folder.iconType === "video" && <Video className="w-5 h-5 text-emerald-500" />}
                                  {folder.iconType === "code" && <FileSpreadsheet className="w-5 h-5 text-purple-500" />}
                                  {folder.iconType === "doc" && <FileText className="w-5 h-5 text-[#2ac4f4]" />}
                                </div>
                              </div>
                            </div>

                            <h4 className="font-heading font-bold text-sm text-[#0a0e17] group-hover:text-[#0284c7] transition-colors mt-1">
                              {folder.name}
                            </h4>

                            <p className="text-[11px] text-[#64748b] mt-1 line-clamp-1 max-w-[180px]">
                              {folder.description}
                            </p>

                            <div className="mt-2 text-[10px] font-mono font-semibold text-[#94a3b8] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                              {folderFileCount} {folderFileCount === 1 ? "file" : "files"}
                            </div>
                          </div>

                          {/* FROSTED LOCK OVERLAY FOR PRIVATE GUEST VIEW */}
                          {isPrivateGated && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/[0.03] backdrop-blur-[1px] p-3 pointer-events-none transition-all duration-200 group-hover:bg-slate-900/[0.06]">
                              <div className="w-8 h-8 rounded-[4px] bg-[#0a0e17] text-[#2ac4f4] border border-white/20 flex items-center justify-center shadow-lg mb-1.5 transform group-hover:scale-110 transition-transform">
                                <Lock className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-heading font-bold text-[#0a0e17] bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-[3px] shadow-sm border border-slate-200">
                                Private • Click to Unlock
                              </span>
                            </div>
                          )}
                        </motion.div>
                      );
                    }))}
                  </div>
                </div>
              ) : (
                /* INSIDE FOLDER VIEW (Files catalog inside selected folder) */
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedFolderId(null)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[6px] transition-colors text-xs font-heading font-bold flex items-center gap-1 cursor-pointer"
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
                          className="mt-4 bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-4 py-2 rounded-[6px]"
                        >
                          + Upload File Here
                        </button>
                      )}
                    </div>
                  ) : viewMode === "grid" ? (
                    /* FILE GRID VIEW */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles.map((file) => {
                        const isFilePrivate = file.gated && !isAuthenticated;

                        return (
                        <div
                          key={file.id}
                          className={`group p-5 rounded-[8px] border transition-all flex flex-col justify-between relative overflow-hidden ${
                            isFilePrivate
                              ? "bg-slate-50/90 border-slate-200 shadow-sm"
                              : "bg-white border-slate-200 hover:border-[#2ac4f4] hover:shadow-[0_6px_20px_rgba(42,196,244,0.1)]"
                          }`}
                        >
                          <div className={isFilePrivate ? "filter blur-[3px] select-none opacity-40 transition-all duration-200" : ""}>
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="w-10 h-10 rounded-[6px] bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
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

                          {/* BLURRED FILE OVERLAY IF PRIVATE */}
                          {isFilePrivate && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/[0.04] backdrop-blur-[2px] p-4 text-center">
                              <button
                                onClick={() => setShowLoginModal(true)}
                                className="bg-[#0a0e17] text-white font-heading font-bold text-xs px-4 py-2.5 rounded-[4px] shadow-lg flex items-center gap-2 border border-white/20 hover:bg-[#0284c7] transition-colors cursor-pointer"
                              >
                                <Lock className="w-3.5 h-3.5 text-[#2ac4f4]" />
                                <span>Private • Click to Unlock</span>
                              </button>
                            </div>
                          )}

                          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-[11px] font-mono text-slate-400">
                              {file.dateAdded}
                            </div>

                            <div className="flex items-center gap-2">
                              {/* File Preview Trigger */}
                              <button
                                onClick={() => {
                                  if (isFilePrivate) {
                                    setShowLoginModal(true);
                                  } else {
                                    setPreviewFile(file);
                                  }
                                }}
                                className="p-2 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 rounded-[6px] transition-colors cursor-pointer"
                                title="Preview File"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {isAdminMode && (
                                <>
                                  <button
                                    onClick={() => handleOpenEdit(file)}
                                    className="p-2 text-slate-500 hover:text-[#0891b2] hover:bg-slate-100 rounded-[6px] transition-colors cursor-pointer"
                                    title="Edit Metadata"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFile(file.id)}
                                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-[6px] transition-colors cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}

                              <button
                                onClick={() => handleDownload(file)}
                                className="font-heading text-xs font-bold bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] px-3.5 py-1.5 rounded-[4px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                {isFilePrivate ? <Lock className="w-3.5 h-3.5 text-[#2ac4f4]" /> : <Download className="w-3.5 h-3.5" />}
                                <span>{isFilePrivate ? "Unlock" : "Download"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        );
                      })}
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
                          {filteredFiles.map((file) => {
                            const isFilePrivate = file.gated && !isAuthenticated;

                            return (
                            <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4">
                                <div className="w-8 h-8 rounded-[4px] bg-slate-100 border border-slate-200 flex items-center justify-center">
                                  {getFormatIcon(file.format)}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className={isFilePrivate ? "filter blur-[2.5px] select-none opacity-50" : ""}>
                                  <div className="font-heading font-bold text-[#0a0e17] text-sm">{file.title}</div>
                                  <div className="text-[11px] text-slate-500">{file.description}</div>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-mono font-semibold text-slate-700 uppercase">
                                {file.productId}
                              </td>
                              <td className="py-3 px-4 font-mono text-slate-500">{file.size}</td>
                              <td className="py-3 px-4">
                                {file.gated ? (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                                    <Lock className="w-2.5 h-2.5" /> Private
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
                                    onClick={() => {
                                      if (isFilePrivate) {
                                        setShowLoginModal(true);
                                      } else {
                                        setPreviewFile(file);
                                      }
                                    }}
                                    className="p-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 rounded-[4px] transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownload(file)}
                                    className="bg-[#0a0e17] text-white hover:bg-[#2ac4f4] hover:text-[#0a0e17] font-heading font-bold text-xs px-3 py-1.5 rounded-[4px] transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    {isFilePrivate ? <Lock className="w-3 h-3 text-[#2ac4f4]" /> : <Download className="w-3.5 h-3.5" />}
                                    <span>{isFilePrivate ? "Unlock" : "Get"}</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
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
              className="relative z-10 w-full max-w-[700px] bg-[#0c1325] border border-white/15 rounded-[14px] p-6 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setPreviewFile(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[6px] bg-white/10 border border-white/20 flex items-center justify-center">
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
              <div className="bg-[#05080e] border border-white/10 rounded-[8px] p-6 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden mb-6">
                {previewFile.format === "mp4" && (previewFile.downloadUrl || previewFile.previewUrl) ? (
                  <video
                    src={previewFile.downloadUrl || previewFile.previewUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[340px] w-full object-contain rounded-[6px]"
                  />
                ) : previewFile.previewUrl ? (
                  <img
                    src={previewFile.previewUrl}
                    alt={previewFile.title}
                    className="max-h-[340px] w-auto object-contain rounded-[6px]"
                  />
                ) : (
                  <div className="flex flex-col items-center max-w-sm">
                    <FileText className="w-14 h-14 text-[#2ac4f4] mb-3 opacity-80" />
                    <h4 className="font-heading font-bold text-white text-base">In-Browser Document Preview</h4>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {previewFile.description}
                    </p>
                    <div className="mt-4 bg-white/5 border border-white/10 px-4 py-2 rounded-[6px] text-xs font-mono text-white/70">
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
                  className="bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs px-4 py-2.5 rounded-[4px] transition-all flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Resource Link</span>
                </button>

                <button
                  onClick={() => {
                    handleDownload(previewFile);
                    setPreviewFile(null);
                  }}
                  className="bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs px-5 py-2.5 rounded-[4px] hover:bg-[#6ecff4] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
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
              className="relative z-10 w-full max-w-[460px] bg-[#0c1325] border border-white/15 rounded-[14px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

              <div className="w-12 h-12 rounded-[8px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                Admin CMS Access Required
              </h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Please enter your administrator credentials. Email must be present on the Elevation Spine Whitelist.
              </p>

              {adminAuthError && (
                <div className="mb-4 p-3.5 rounded-[6px] bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
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
                    className="w-full bg-white/5 border border-white/15 rounded-[4px] px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
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
                    className="w-full bg-white/5 border border-white/15 rounded-[4px] px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3 rounded-[4px] shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-1"
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
              className="relative z-10 w-full max-w-[460px] bg-[#0d1322] border border-white/15 rounded-[14px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

              <div className="w-12 h-12 rounded-[8px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
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
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-xs py-3 rounded-[4px] shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer"
                >
                  Quick Unlock as Sales Rep
                </button>

                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/login");
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs py-3 px-4 rounded-[4px] transition-all cursor-pointer text-center"
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
              className="relative z-10 w-full max-w-[500px] bg-[#0c1325] border border-white/15 rounded-[14px] p-8 text-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-1 bg-[#2ac4f4] absolute top-0 left-0 right-0" />

              <div className="w-10 h-10 rounded-[6px] bg-[#2ac4f4]/15 border border-[#2ac4f4]/30 flex items-center justify-center text-[#2ac4f4] mb-4">
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
                    className="w-full bg-white/5 border border-white/15 rounded-[4px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">Description / Summary</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief description of what this document contains..."
                    className="w-full bg-white/5 border border-white/15 rounded-[4px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2ac4f4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-heading text-xs text-white/70 block mb-1">Target Product</label>
                    <select
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                      className="w-full bg-[#131b2e] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
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
                      className="w-full bg-[#131b2e] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
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
                      className="w-full bg-[#131b2e] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
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
                      className="w-full bg-[#131b2e] border border-white/15 rounded-[4px] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2ac4f4]"
                    >
                      <option value="false">🌐 Public Access</option>
                      <option value="true">🔒 Sales Reps Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-heading text-xs text-white/70 block mb-1">File Attachment</label>
                  <div className="border-2 border-dashed border-white/20 hover:border-[#2ac4f4]/60 rounded-[4px] p-4 text-center cursor-pointer transition-colors bg-white/[0.02]">
                    <Upload className="w-6 h-6 text-[#2ac4f4] mx-auto mb-1" />
                    <span className="text-xs text-white/80 font-heading block font-semibold">
                      Drag & drop file or click to browse
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Supports PDF, XLSX, PPTX, PNG, MP4, ZIP</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2ac4f4] text-[#0a0e17] font-heading font-bold text-sm py-3 rounded-[4px] shadow-[0_4px_20px_rgba(42,196,244,0.35)] hover:bg-[#6ecff4] transition-all cursor-pointer mt-2"
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
