export async function uploadImage(file) {
  // Debugging: Log environment variables
  // console.log("Environment Variables:", {
  //   cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  //   uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  // });

  // Fallback to hardcoded values if environment variables are missing
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with your actual cloud name
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your actual upload preset

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary configuration in environment variables or fallback values"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary Error Response:", errorData);
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    // console.log("Upload successful:", data);
    return data.secure_url;
  } catch (error) {
    // console.error("Upload Error:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}
