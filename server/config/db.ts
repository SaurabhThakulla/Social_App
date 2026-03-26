import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const connectDB = async function () {
    try {
        const client = await pool.connect();

        const info = await client.query(
            "SELECT current_user, current_database(), inet_server_addr()"
        );

        console.log("PostgreSQL configured", info.rows[0]);

        client.release();
    } catch (err) {
        console.error("DB Connection Failed", err);
    }
};