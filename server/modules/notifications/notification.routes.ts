import { Router } from "express";
import {
    listNotifications,
    updateNotificationReadStatus,
} from "./notification.service";

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
    const statusParam =
        typeof req.query.status === "string" ? req.query.status : "all";
    const status =
        statusParam === "read" || statusParam === "unread"
            ? statusParam
            : "all";

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        const notifications = await listNotifications(
            userId,
            limit,
            offset,
            status
        );
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

// ================= UPDATE READ STATUS =================

router.patch("/:id/read-status", async function (req, res) {
    const { id } = req.params;
    const { userId, isRead = true } = req.body ?? {};

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        const updated = await updateNotificationReadStatus(
            id,
            userId,
            Boolean(isRead)
        );

        if (!updated) {
            return res
                .status(404)
                .json({ error: "Notification not found for user" });
        }

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update notification" });
    }
});

export default router;
