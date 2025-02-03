import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// CLOUDINARY_CLOUD_NAME="daeipji9b"
// CLOUDINARY_API_KEY="346262785469417"
// CLOUDINARY_API_SECRET="91qnF0IbDVYYi-bI-IIfAruyNPc"

cloudinary.config({
  cloud_name: "daeipji9b",
  api_key: "346262785469417",
  api_secret: "91qnF0IbDVYYi-bI-IIfAruyNPc",
  // cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  // api_key: String(process.env.CLOUDINARY_API_KEY),
  // api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "File path not specified.";
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (response) {
      fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;
