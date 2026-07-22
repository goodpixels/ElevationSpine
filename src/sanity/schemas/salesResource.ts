// Sanity Schema definition for Sales & Public Downloadable Assets

export const salesResourceSchema = {
  name: "salesResource",
  title: "Sales & Product Resource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Document Title",
      type: "string",
      description: "e.g. SABER-C™ Commercial Order Form & Price List 2026",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description / Summary",
      type: "text",
      rows: 2,
      description: "Brief explanation of document contents",
    },
    {
      name: "fileAsset",
      title: "Upload Document or Media File",
      type: "file",
      description: "Upload PDF, XLSX, PPTX, MP4, or ZIP file",
      options: {
        accept: ".pdf,.xlsx,.pptx,.zip,.mp4,.docx",
      },
    },
    {
      name: "externalUrl",
      title: "External File URL (Optional S3 or Cloudinary link)",
      type: "url",
    },
    {
      name: "category",
      title: "Access Classification",
      type: "string",
      options: {
        list: [
          { title: "🔒 Sales Representative Only (Gated)", value: "sales" },
          { title: "🌐 Public Access (Open Download)", value: "public" },
        ],
        layout: "radio",
      },
      initialValue: "sales",
    },
    {
      name: "format",
      title: "File Format Type",
      type: "string",
      options: {
        list: [
          { title: "PDF Document (.pdf)", value: "pdf" },
          { title: "Excel Sheet (.xlsx)", value: "xlsx" },
          { title: "PowerPoint Presentation (.pptx)", value: "pptx" },
          { title: "ZIP Archive (.zip)", value: "zip" },
        ],
      },
      initialValue: "pdf",
    },
    {
      name: "size",
      title: "Display File Size (e.g. 4.2 MB)",
      type: "string",
    },
  ],
};
