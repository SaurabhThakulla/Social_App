import { Router } from "express";
import { listNotifications } from "./notification.service";

const router = Router();

// ================= GET NOTIFICATIONS =================

router.get("/", async function (req, res) {
    const userId =
        typeof req.query.userId === "string" &&
        req.query.userId.trim().length > 0
            ? req.query.userId
            : null;

    const limitRaw = Number(req.query.limit);
    const offsetRaw = Number(req.query.offset);
    const limit =
        Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 20;
    const offset =
        Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : 0;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        const notifications = await listNotifications(
            userId,
            limit,
            offset
        );
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

export default router;
