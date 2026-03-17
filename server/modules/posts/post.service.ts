import { pool } from "../../config/db";
import { createNotification } from "../notifications/notification.service";


// ================= CREATE POST =================

export const createPost = async function (userId: string, content: string) {
    const result = await pool.query(
        `INSERT INTO posts (user_id, content)
         VALUES ($1,$2)
         RETURNING *`,
        [userId, content ?? null]
    );

    return result.rows[0];
};



// ================= GET FEED =================

export const getPosts = async function (
    userId: string | null,
    limit = 10,
    offset = 0
) {
    const result = await pool.query(
        `SELECT
            posts.id,
            posts.user_id,
            posts.content,
            posts.created_at,

            users.name,
            users.username,
            users.avatar,

            COUNT(DISTINCT post_likes.id)::int AS likes_count,
            COUNT(DISTINCT post_comments.id)::int AS comments_count,
            COALESCE(
                BOOL_OR(post_likes.user_id = $1::uuid),
                false
            ) AS liked_by_user,

            COALESCE(
                json_agg(
                    DISTINCT jsonb_build_object(
                        'url', post_media.media_url,
                        'type', post_media.media_type
                    )
                ) FILTER (WHERE post_media.id IS NOT NULL),
                '[]'
            ) AS media

        FROM posts

        JOIN users
        ON posts.user_id = users.id

        LEFT JOIN post_likes
        ON post_likes.post_id = posts.id

        LEFT JOIN post_comments
        ON post_comments.post_id = posts.id

        LEFT JOIN post_media
        ON post_media.post_id = posts.id

        GROUP BY posts.id, posts.user_id, users.name, users.username, users.avatar

        ORDER BY posts.created_at DESC
        LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
    );

    return result.rows;
};



// ================= LIKE POST =================

export const likePost = async function (
    postId: string,
    userId: string
) {
    const result = await pool.query(
        `INSERT INTO post_likes (post_id, user_id)
         VALUES ($1,$2)
         ON CONFLICT (post_id, user_id) DO NOTHING
         RETURNING *`,
        [postId, userId]
    );

    const like = result.rows[0] || null;

    if (like) {
        const ownerResult = await pool.query(
            `SELECT user_id FROM posts WHERE id = $1`,
            [postId]
        );
        const postOwnerId = ownerResult.rows[0]?.user_id || null;

        if (postOwnerId && postOwnerId !== userId) {
            await createNotification({
                userId: postOwnerId,
                actorId: userId,
                type: "like_post",
                postId,
            });
        }
    }

    return like;
};



// ================= UNLIKE POST =================

export const unlikePost = async function (
    postId: string,
    userId: string
) {
    await pool.query(
        `DELETE FROM post_likes
         WHERE post_id = $1 AND user_id = $2`,
        [postId, userId]
    );
};



// ================= ADD COMMENT =================

export const addPostComment = async function (
    postId: string,
    userId: string,
    comment: string
) {
    const result = await pool.query(
        `INSERT INTO post_comments (post_id, user_id, comment)
         VALUES ($1, $2, $3)
         RETURNING id, post_id, user_id, comment, created_at`,
        [postId, userId, comment]
    );

    return result.rows[0];
};



// ================= GET COMMENTS =================

export const listPostComments = async function (
    postId: string,
    limit = 20,
    offset = 0
) {
    const result = await pool.query(
        `SELECT
            post_comments.id,
            post_comments.comment,
            post_comments.created_at,

            users.username,
            users.avatar

        FROM post_comments

        JOIN users
        ON users.id = post_comments.user_id

        WHERE post_comments.post_id = $1

        ORDER BY post_comments.created_at DESC

        LIMIT $2 OFFSET $3`,
        [postId, limit, offset]
    );

    return result.rows;
};



// ================= ADD MEDIA =================

export const addPostMedia = async function (
    postId: string,
    mediaUrl: string,
    mediaType: string
) {
    const result = await pool.query(
        `INSERT INTO post_media (post_id, media_url, media_type)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [postId, mediaUrl, mediaType]
    );

    return result.rows[0];
};

// ================= DELETE POST =================

export const deletePost = async function (
    postId: string,
    userId: string
) {
    const result = await pool.query(
        `DELETE FROM posts
         WHERE id = $1 AND user_id = $2
         RETURNING id`,
        [postId, userId]
    );

    return result.rows[0] || null;
};



// ================= GET MEDIA =================

export const getPostMedia = async function (postId: string) {
    const result = await pool.query(
        `SELECT
            id,
            media_url,
            media_type
         FROM post_media
         WHERE post_id = $1`,
        [postId]
    );

    return result.rows;
};
