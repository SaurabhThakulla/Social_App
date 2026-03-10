import { pool } from "../../config/db";

export const createPost = async function (userId: string, content: string) {

    const result = await pool.query(
        `INSERT INTO posts (user_id, content)
     VALUES ($1,$2)
     RETURNING *`,
        [userId, content]
    );

    return result.rows[0];
};