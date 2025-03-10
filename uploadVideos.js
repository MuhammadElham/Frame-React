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

// 📂 Updated Folder Path for Videos
// Option 1: Using forward slashes
const folderPath = "E:/React/ECOMMERCE-APP/frontend/src/assets/karigari Logos/Videos";

// Or Option 2: Using double backslashes
// const folderPath = "E:\\React\\ECOMMERCE-APP\\frontend\\src\\assets\\karigari Logos\\Videos";

// 📤 Function to Upload Videos
const uploadVideos = async () => {
  // Filter video files
  const videoFiles = fs
    .readdirSync(folderPath)
    .filter((file) =>
      [".mp4", ".mov", ".avi", ".mkv"].includes(path.extname(file).toLowerCase())
    );

  if (videoFiles.length === 0) {
    console.log("❌ No videos found in the folder!");
    return;
  }

  console.log(`🚀 Uploading ${videoFiles.length} videos to Cloudinary...`);

  for (const file of videoFiles) {
    const filePath = path.join(folderPath, file);
    try {
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: "ecommerce-videos", // Specify Cloudinary folder for videos if needed
        resource_type: "video",      // Specify that we're uploading a video
      });
      console.log(`✅ Uploaded: ${file} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Error uploading ${file}:`, error);
    }
  }
  console.log("🎉 All videos uploaded successfully!");
};

// 🚀 Start Uploading
uploadVideos();
