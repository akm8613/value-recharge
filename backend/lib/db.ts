import { Pool } from "pg";
import log from "./logger";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    log.info("📡 [Database] Successfully linked to the PostgreSQL Cluster Pool.");
    client.release();
  } catch (error: any) {
    // Log the error clearly but do NOT run process.exit(1).
    // This keeps port 5001 alive so the frontend doesn't get a "Failed to Fetch" error.
    log.error(`⚠️ [Database] Connection warning: ${error.message}`);
  }
};

export default pool;