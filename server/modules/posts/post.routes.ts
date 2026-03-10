import { Router } from "express";
import { createPost } from "./post.service";

const router = Router();

router.post("/", async function (req, res) {
    const { userId, content } = req.body;

    try {
        const post = await createPost(userId, content);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export default router;