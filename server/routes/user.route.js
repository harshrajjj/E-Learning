import express from 'express';
import { register ,login,getProfile,logout,updateProfile} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Import the authentication middleware
// import { getProfile, logout } from '../controllers/user.controller.js'; // Import the profile and logout functions
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated, getProfile); // Protected route for user profile
router.route("/logout").get( logout); // Protected route for user logout
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"),updateProfile); // Protected route for user profile update (put for update)
export default router;