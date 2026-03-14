import express from "express";
import { signup, login, getProfile, updateProfile, changePassword } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/change-password", verifyToken, changePassword);
// Protected route 
router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);
export default router;