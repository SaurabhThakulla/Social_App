import { Router } from "express";
import {
    createNotification,
    markSyncRequestHandled,
} from "../notifications/notification.service";
import {
    createSyncRequest,
    getUserProfile,
    listSyncRequests,
    listUserSyncs,
    listUsers,
    syncUsers,
    unsyncUsers,
    updateSyncRequestStatus,
    updateUserProfile,
} from "./user.service";

const router = Router();

// ================= USERS LIST =================

router.get("/", async function (_req, res) {
    try {
        const users = await listUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// ================= SYNC REQUEST =================

router.post("/:userId/sync", async function (req, res) {
    const { userId: targetUserId } = req.params;
    const { userId: actorId } = req.body;

    if (!actorId) {
        return res.status(400).json({ error: "userId is required" });
    }

    if (actorId === targetUserId) {
        return res.status(400).json({ error: "Cannot sync yourself" });
    }

    try {
        const request = await createSyncRequest(actorId, targetUserId);

        if (request) {
            await createNotification({
                userId: targetUserId,
                actorId,
                type: "sync_request",
            });
        }

        return res.status(201).json({ requested: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to sync user" });
    }
});

// ================= SYNC REQUESTS LIST =================

router.get("/:userId/sync-requests", async function (req, res) {
    const { userId } = req.params;
    const direction =
        req.query.direction === "incoming" ? "incoming" : "outgoing";
    const status =
        typeof req.query.status === "string" ? req.query.status : "pending";

    try {
        const requests = await listSyncRequests(
            userId,
            direction,
            status as "pending" | "accepted" | "declined" | "all"
        );
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch sync requests" });
    }
});

// ================= USER SYNCS =================

router.get("/:userId/syncs", async function (req, res) {
    const { userId } = req.params;

    const limitRaw = Number(req.query.limit);
    const offsetRaw = Number(req.query.offset);
    const limit =
        Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 20;
    const offset =
        Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : 0;

    try {
        const syncs = await listUserSyncs(userId, limit, offset);
        res.json(syncs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch syncs" });
    }
});

// ================= UNSYNC USER =================

router.delete("/:userId/syncs/:targetUserId", async function (req, res) {
    const { userId, targetUserId } = req.params;

    if (userId === targetUserId) {
        return res.status(400).json({ error: "Cannot unsync yourself" });
    }

    try {
        const removed = await unsyncUsers(userId, targetUserId);

        if (!removed) {
            return res.status(404).json({ error: "Sync not found" });
        }

        return res.json({ unsynced: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to unsync user" });
    }
});
// ================= ACCEPT SYNC REQUEST =================

router.post(
    "/:userId/sync-requests/:requesterId/accept",
    async function (req, res) {
        const { userId: targetUserId, requesterId } = req.params;

        try {
            const updated = await updateSyncRequestStatus(
                requesterId,
                targetUserId,
                "accepted"
            );

            if (!updated) {
                return res.status(404).json({ error: "Sync request not found" });
            }

            await syncUsers(targetUserId, requesterId);
            await syncUsers(requesterId, targetUserId);

            await createNotification({
                userId: requesterId,
                actorId: targetUserId,
                type: "sync_accepted",
            });
            await markSyncRequestHandled(targetUserId, requesterId);
            await createNotification({
                userId: requesterId,
                actorId: targetUserId,
                type: "sync_declined",
            });

            res.json({ synced: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to accept sync request" });
        }
    }
);

// ================= DECLINE SYNC REQUEST =================

router.post(
    "/:userId/sync-requests/:requesterId/decline",
    async function (req, res) {
        const { userId: targetUserId, requesterId } = req.params;

        try {
            const updated = await updateSyncRequestStatus(
                requesterId,
                targetUserId,
                "declined"
            );

            if (!updated) {
                return res.status(404).json({ error: "Sync request not found" });
            }

            await markSyncRequestHandled(targetUserId, requesterId);
            await createNotification({
                userId: requesterId,
                actorId: targetUserId,
                type: "sync_declined",
            });
            res.json({ declined: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to decline sync request" });
        }
    }
);

// ================= USER PROFILE =================

router.get("/:userId", async function (req, res) {
    const { userId } = req.params;

    try {
        const profile = await getUserProfile(userId);
        if (!profile) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

router.patch("/:userId", async function (req, res) {
    const { userId } = req.params;
    const { name, username, bio, avatar } = req.body ?? {};

    if (
        name === undefined &&
        username === undefined &&
        bio === undefined &&
        avatar === undefined
    ) {
        return res.status(400).json({ error: "No profile fields to update" });
    }

    try {
        const updatedProfile = await updateUserProfile(userId, {
            name,
            username,
            bio,
            avatar,
        });

        if (!updatedProfile) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

export default router;





