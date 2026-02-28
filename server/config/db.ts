import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export const connectDB = async function () {
    try {
        await pool.connect();
        console.log("✅ PostgreSQL Connected");
        console.log("DATABASE_URL:", process.env.DATABASE_URL);
    } catch (err) {
        console.error("❌ DB Connection Failed", err);
    }
};