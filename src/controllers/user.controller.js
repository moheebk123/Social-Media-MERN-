import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "User registered successfully",
  // });

  // data receive from frontend on click register
  // find email address is already present
  // if present, return user already registered
  // if not, check all fields are present
  // if any fields is not present, return all fields are required
  // if all fields are present,
  // if files are present, upload images on cloudinary
  // now register user - add in db

  const { email, username, fullName, password } = req.body;

  if (
    [email, username, fullName, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existedUser) {
    console.log(existedUser);
    throw new ApiError(409, "User with this email or username already exists.");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image is required.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  let coverImage;
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  if (!avatar) {
    throw new ApiError(
      500,
      "Internal Server Error, while uploading Avatar Image."
    );
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully."));
});

export { registerUser };
