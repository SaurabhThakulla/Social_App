import { Router } from "express";
import { getUserProfile } from "./user.service";

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

export default router;
