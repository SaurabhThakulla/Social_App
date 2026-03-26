import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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