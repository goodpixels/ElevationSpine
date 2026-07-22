import { sanityConfig } from "./sanity.config";

// Client helper to fetch published downloadable sales files from Sanity API
export async function fetchSanityResources() {
  const query = `*[_type == "salesResource"] | order(_createdAt desc) {
    _id,
    title,
    description,
    category,
    format,
    size,
    "fileUrl": fileAsset.asset->url,
    externalUrl
  }`;

  try {
    // When Sanity is connected:
    // const response = await fetch(`https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`);
    // const data = await response.json();
    // return data.result;
    return null;
  } catch (error) {
    console.error("Error fetching Sanity sales resources:", error);
    return null;
  }
}
