import { Router } from "express";
import { getUserProfile, updateUserProfile } from "./user.service";

const router = Router();

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
