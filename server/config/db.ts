import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    port: 5432,
});

export const connectDB = async function () {
    try {
        const client = await pool.connect();
        const info = await client.query(
            "select current_user, current_database()"
        );
        console.log("PostgreSQL configured", info.rows[0]);
        client.release();
    } catch (err) {
        console.error("DB Connection Failed", err);
    }
};
