import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import notificationRoutes from "../modules/notifications/notification.routes";
import postRoutes from "../modules/posts/post.routes";
import userRoutes from "../modules/users/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/notifications", notificationRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

export default router;
