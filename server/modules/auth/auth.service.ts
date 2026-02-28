import { pool } from "../../config/db";

export const findUserByEmail = async function (email: string) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};

export const createUser = async function (
    name: string,
    username: string,
    email: string,
    password: string
) {
    const result = await pool.query(
        `INSERT INTO users (name, username, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, username, email`,
        [name, username, email, password]
    );

    return result.rows[0];
};