import { pool } from "../../config/db";

export const getUserProfile = async function (userId: string) {
    const result = await pool.query(
        `SELECT
            users.id,
            users.name,
            users.username,
            users.avatar,
            NULL::text AS bio,
            users.created_at,

            COUNT(DISTINCT posts.id)::int AS posts_count,
            COUNT(DISTINCT followers.follower_id)::int AS followers_count,
            COUNT(DISTINCT following.following_id)::int AS following_count

        FROM users

        LEFT JOIN posts
        ON posts.user_id = users.id

        LEFT JOIN follows AS followers
        ON followers.following_id = users.id

        LEFT JOIN follows AS following
        ON following.follower_id = users.id

        WHERE users.id = $1

        GROUP BY users.id`,
        [userId]
    );

    return result.rows[0] || null;
};
