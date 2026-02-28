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
        await pool.connect();
        console.log("PostgreSQL configured");
    } catch (err) {
        console.error("DB Connection Failed", err);
    }
};