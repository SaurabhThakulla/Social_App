import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import postRoutes from "../modules/posts/post.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;