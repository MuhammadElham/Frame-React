// 🌟 Import Required Modules
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";

// 📌 Load Environment Variables
dotenv.config();

// 🛠️ Cloudinary Configuration (Use .env instead of hardcoded keys)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📂 Updated Folder Path for Images
const folderPath = "E:/React/ECOMMERCE-APP/frontend/src/assets/karigari Logos/Banner Image";

// 📤 Function to Upload Images
const uploadImages = async () => {
  const imageFiles = fs
    .readdirSync(folderPath)
    .filter((file) =>
      [".png", ".jpg", ".jpeg", ".webp"].includes(path.extname(file).toLowerCase())
    );

  if (imageFiles.length === 0) {
    console.log("❌ No images found in the folder!");
    return;
  }

  console.log(`🚀 Uploading ${imageFiles.length} images to Cloudinary...`);

  for (const file of imageFiles) {
    const filePath = path.join(folderPath, file);
    try {
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: "ecommerce-assets", // 🔹 Cloudinary folder name (can change if needed)
      });
      console.log(`✅ Uploaded: ${file} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Error uploading ${file}:`, error);
    }
  }
  console.log("🎉 All images uploaded successfully!");
};

// 🚀 Start Uploading
uploadImages();
