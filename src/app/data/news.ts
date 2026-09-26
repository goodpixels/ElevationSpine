// Published press releases only. Headlines and dates exactly as published on
// Business Wire. Newest first: the homepage shows the first three.

export type PressRelease = {
  date: string;
  headline: string;
  url: string;
  /** Cloudinary public ID for the card image. */
  image: string;
};

export const pressReleases: PressRelease[] = [
  {
    date: "August 11, 2026",
    headline:
      "Elevation Spine Receives FDA 510(k) Clearance for Saber-XA™, an Expandable Anterior Lumbar Interbody Fusion (ALIF) System",
    url: "https://www.businesswire.com/news/home/20260810424617/en/Elevation-Spine-Receives-FDA-510k-Clearance-for-Saber-XA-an-Expandable-Anterior-Lumbar-Interbody-Fusion-ALIF-System",
    image: "xa-hero-construct-316",
  },
  {
    date: "July 28, 2026",
    headline:
      "Elevation Spine Receives FDA 510(k) Clearance for Saber-C® AVIA™, A Complete Anterior Cervical Fixation System with a Porous 3D-Printed Titanium Interbody",
    url: "https://www.businesswire.com/news/home/20260728765422/en/Elevation-Spine-Receives-FDA-510k-Clearance-for-Saber-C-AVIA-A-Complete-Anterior-Cervical-Fixation-System-with-a-Porous-3D-Printed-Titanium-Interbody",
    image: "avia-porous-body-top-down-small",
  },
  {
    date: "June 25, 2026",
    headline:
      "Elevation Spine Surpasses 5,000 Saber-C® Implantations, Marking a Significant Milestone for Its Integrated Cervical Fixation Platform",
    url: "https://www.businesswire.com/news/home/20260622253536/en/Elevation-Spine-Surpasses-5000-Saber-C-Implantations-Marking-a-Significant-Milestone-for-Its-Integrated-Cervical-Fixation-Platform",
    image: "El_Spine_products-7_s0qshq",
  },
];
