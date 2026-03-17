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
export const listNotifications = async function (
    userId: string,
    limit = 20,
    offset = 0
) {
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
         WHERE n.user_id = $1
         ORDER BY n.created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
    );

    return result.rows;
};

