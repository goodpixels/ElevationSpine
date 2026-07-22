import { salesResourceSchema } from "./schemas/salesResource";

// Sanity Studio Configuration File
// When you connect to Sanity, set your projectId and dataset from sanity.io/manage

export const sanityConfig = {
  projectId: "your_sanity_project_id", // Replace with your Sanity Project ID from sanity.io
  dataset: "production",                // Dataset environment (production / staging)
  title: "Elevation Spine Sales Portal CMS",
  apiVersion: "2026-07-22",
  useCdn: true,                          // Fast edge caching for file downloads
  schema: {
    types: [salesResourceSchema],
  },
};
