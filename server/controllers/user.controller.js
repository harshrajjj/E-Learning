import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        //console.log(req.body);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);//password hashing
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({//201 means created
            success: true,
            message: "Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({//500 means server error
            success: false,
            message: "Failed to REgister"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
        }).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.id; // Extract user ID from the request object
        const user = await User.findById(userId).select("-password "); // Find the user by ID and exclude sensitive fields
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }
        return res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get user profile"
        })
    }
}

export const updateProfile = async (req, res) => {
    try{
        const userId=req.id; // Extract user ID from the request object
        const {name} = req.body; // Extract the name from the request body
        const profilePhoto=req.file; // Extract the profile photo path from the request file

        const user=await User.findById(userId); // Find the user by ID
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        //extract the publicid of the old image from the url if it exist
        if(user.photoUrl){//agr phle se image hai to uska public id nikal lo
            const publicId=user.photoUrl.split("/").pop().split(".")[0]; // Extract the public ID from the URL
             deleteMediaFromCloudinary(publicId); // Delete the old image from Cloudinary
        }

        //upload new photo to cloudinary
        const cloudResponse=await uploadMedia(profilePhoto.path); // Upload the new photo to Cloudinary
        const photoUrl=cloudResponse.secure_url; // Get the secure URL of the uploaded photo

        const updatedData={name,photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password"); // Update the user in the database

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update user profile"
        })
    }
}