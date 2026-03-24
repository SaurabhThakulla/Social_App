import { pool } from "../../config/db";

type CreateNotificationInput = {
    userId: string;
    actorId: string;
    type: string;
    postId?: string | null;
};

export const createNotification = async function (
    input: CreateNotificationInput
) {
    const { userId, actorId, type, postId = null } = input;
    const result = await pool.query(
        `INSERT INTO notifications (user_id, actor_id, type, post_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [userId, actorId, type, postId]
    );

    return result.rows[0] || null;
};


export const markSyncRequestHandled = async function (
    userId: string,
    actorId: string
) {
    await pool.query(
        `UPDATE notifications
         SET is_read = true
         WHERE user_id = $1 AND actor_id = $2 AND type = 'sync_request'`,
        [userId, actorId]
    );
};

export const deleteSyncRequestNotification = async function (
    userId: string,
    actorId: string
) {
    const result = await pool.query(
        `DELETE FROM notifications
         WHERE user_id = $1 AND actor_id = $2 AND type = 'sync_request'`,
        [userId, actorId]
    );

    return result.rowCount > 0;
};

export const listNotifications = async function (
    userId: string,
    limit = 20,
    offset = 0,
    status: "all" | "read" | "unread" = "all"
) {
    const conditions = ["n.user_id = $1"];
    const params: (string | number | boolean)[] = [userId];

    if (status === "read" || status === "unread") {
        params.push(status === "read");
        conditions.push(`n.is_read = $${params.length}`);
    }

    const limitIndex = params.length + 1;
    const offsetIndex = params.length + 2;

    const result = await pool.query(
        `SELECT
            n.id,
            jsonb_build_object(
                'id', u.id,
                'name', u.name,
                'avatar', u.avatar
            ) AS "user",
            n.type,
            n.is_read AS "isRead",
            n.created_at AS "createdAt"
         FROM notifications n
         JOIN users u
         ON u.id = n.actor_id
         WHERE ${conditions.join(" AND ")}
         ORDER BY n.created_at DESC
         LIMIT $${limitIndex} OFFSET $${offsetIndex}`,
        [...params, limit, offset]
    );

    return result.rows;
};

export const updateNotificationReadStatus = async function (
    notificationId: string,
    userId: string,
    isRead: boolean
) {
    const result = await pool.query(
        `UPDATE notifications
         SET is_read = $1
         WHERE id = $2 AND user_id = $3
         RETURNING id, is_read AS "isRead"`,
        [isRead, notificationId, userId]
    );

    return result.rows[0] || null;
};

