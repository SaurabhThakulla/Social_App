import { Router } from "express";
import {
    createPost,
    getPosts,
    addPostComment,
    listPostComments,
    likePost,
    unlikePost,
    addPostMedia,
} from "./post.service";

const router = Router();


// ================= CREATE POST =================

router.post("/", async function (req, res) {
    const { userId, content } = req.body;

    if (!userId || !content) {
        return res.status(400).json({
            error: "userId and content are required",
        });
    }

    try {
        const post = await createPost(userId, content);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create post" });
    }
});


// ================= GET POSTS =================

router.get("/", async function (req, res) {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});


// ================= LIKE POST =================

router.post("/:postId/like", async function (req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "userId required" });
    }

    try {
        const like = await likePost(postId, userId);
        res.status(201).json(like);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to like post" });
    }
});


// ================= UNLIKE POST =================

router.delete("/:postId/like", async function (req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        await unlikePost(postId, userId);
        res.json({ message: "Post unliked" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to unlike post" });
    }
});


// ================= ADD COMMENT =================

router.post("/:postId/comments", async function (req, res) {
    const { postId } = req.params;
    const { userId, comment } = req.body;

    if (!userId || !comment) {
        return res
            .status(400)
            .json({ error: "userId and comment are required" });
    }

    try {
        const newComment = await addPostComment(postId, userId, comment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});


// ================= GET COMMENTS =================

router.get("/:postId/comments", async function (req, res) {
    const { postId } = req.params;

    const limitRaw = Number(req.query.limit);
    const offsetRaw = Number(req.query.offset);

    const limit =
        Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 20;

    const offset =
        Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : 0;

    try {
        const comments = await listPostComments(postId, limit, offset);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});


// ================= ADD MEDIA =================

router.post("/:postId/media", async function (req, res) {
    const { postId } = req.params;
    const { mediaUrl, mediaType } = req.body;

    if (!mediaUrl) {
        return res.status(400).json({ error: "mediaUrl required" });
    }

    try {
        const media = await addPostMedia(postId, mediaUrl, mediaType);
        res.status(201).json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add media" });
    }
});

export default router;