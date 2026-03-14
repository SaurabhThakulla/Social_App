import { pool } from "../../config/db";

export const getUserProfile = async function (userId: string) {
    const result = await pool.query(
        `SELECT
            users.id,
            users.name,
            users.username,
            users.avatar,
            users.bio,
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

type UpdateUserProfileInput = {
    name?: string | null;
    username?: string | null;
    bio?: string | null;
    avatar?: string | null;
};

export const updateUserProfile = async function (
    userId: string,
    updates: UpdateUserProfileInput
) {
    const fields: string[] = [];
    const values: Array<string | null> = [];
    let index = 1;

    if (updates.name !== undefined) {
        fields.push(`name = $${index++}`);
        values.push(updates.name);
    }

    if (updates.username !== undefined) {
        fields.push(`username = $${index++}`);
        values.push(updates.username);
    }

    if (updates.bio !== undefined) {
        fields.push(`bio = $${index++}`);
        values.push(updates.bio);
    }

    if (updates.avatar !== undefined) {
        fields.push(`avatar = $${index++}`);
        values.push(updates.avatar);
    }

    if (!fields.length) {
        return null;
    }

    values.push(userId);

    const result = await pool.query(
        `UPDATE users
         SET ${fields.join(", ")}
         WHERE id = $${index}
         RETURNING id`,
        values
    );

    if (!result.rows[0]) return null;

    return getUserProfile(userId);
};
