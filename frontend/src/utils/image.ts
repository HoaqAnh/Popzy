export const getCloudinaryUrl = (
  publicId?: string,
  options?: { width?: number; height?: number }
) => {
  if (!publicId) return "";

  if (publicId.startsWith("http")) {
    return publicId;
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error("VITE_CLOUDINARY_CLOUD_NAME is not defined");
    return "";
  }

  let transformations = "f_auto,q_auto";

  if (options?.width) {
    transformations += `,w_${options.width}`;
  }
  if (options?.height) {
    transformations += `,h_${options.height}`;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};
