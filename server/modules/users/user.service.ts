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
            COUNT(DISTINCT syncs.following_id)::int AS syncs_count

        FROM users

        LEFT JOIN posts
        ON posts.user_id = users.id

        LEFT JOIN follows AS syncs
        ON syncs.follower_id = users.id

        WHERE users.id = $1

        GROUP BY users.id`,
        [userId]
    );

    return result.rows[0] || null;
};


export const listUsers = async function () {
    const result = await pool.query(
        `SELECT
            id,
            username,
            avatar
        FROM users
        ORDER BY created_at DESC`
    );

    return result.rows;
};
export type SyncRequestStatus = "pending" | "accepted" | "declined";

export const createSyncRequest = async function (
    requesterId: string,
    targetId: string
) {
    const result = await pool.query(
        `INSERT INTO sync_requests (requester_id, target_id, status)
         VALUES ($1, $2, 'pending')
         ON CONFLICT (requester_id, target_id)
         DO UPDATE SET status = 'pending'
         RETURNING id, status`,
        [requesterId, targetId]
    );

    return result.rows[0] || null;
};

export const listSyncRequests = async function (
    userId: string,
    direction: "outgoing" | "incoming" = "outgoing",
    status: SyncRequestStatus | "all" = "pending"
) {
    const directionColumn = direction === "incoming" ? "target_id" : "requester_id";
    const params: Array<string> = [userId];
    const where: string[] = [`${directionColumn} = $1`];

    if (status !== "all") {
        params.push(status);
        where.push(`status = $${params.length}`);
    }

    const result = await pool.query(
        `SELECT
            id,
            requester_id,
            target_id,
            status,
            created_at
         FROM sync_requests
         WHERE ${where.join(" AND ")}
         ORDER BY created_at DESC`,
        params
    );

    return result.rows;
};


export const listUserSyncs = async function (
    userId: string,
    limit = 20,
    offset = 0
) {
    const result = await pool.query(
        `SELECT
            users.id,
            users.username,
            users.avatar
         FROM follows
         JOIN users
         ON users.id = follows.following_id
         WHERE follows.follower_id = $1
         ORDER BY users.created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
    );

    return result.rows;
};
export const updateSyncRequestStatus = async function (
    requesterId: string,
    targetId: string,
    status: SyncRequestStatus
) {
    const result = await pool.query(
        `UPDATE sync_requests
         SET status = $3
         WHERE requester_id = $1 AND target_id = $2 AND status = 'pending'
         RETURNING id`,
        [requesterId, targetId, status]
    );

    return Boolean(result.rows[0]);
};


export const cancelSyncRequest = async function (
    requesterId: string,
    targetId: string
) {
    const result = await pool.query(
        `DELETE FROM sync_requests
         WHERE requester_id = $1 AND target_id = $2 AND status = 'pending'
         RETURNING id`,
        [requesterId, targetId]
    );

    return Boolean(result.rows[0]);
};

export const syncUsers = async function (
    followerId: string,
    followingId: string
) {
    const result = await pool.query(
        `INSERT INTO follows (follower_id, following_id)
         VALUES ($1, $2)
         ON CONFLICT (follower_id, following_id) DO NOTHING
         RETURNING follower_id`,
        [followerId, followingId]
    );

    return Boolean(result.rows[0]);
};
export const unsyncUsers = async function (
    userId: string,
    targetUserId: string
) {
    const result = await pool.query(
        `DELETE FROM follows
         WHERE (follower_id = $1 AND following_id = $2)
            OR (follower_id = $2 AND following_id = $1)
         RETURNING follower_id`,
        [userId, targetUserId]
    );

    return result.rowCount > 0;
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

