import { Request, Response } from "express";
import pool from "../../lib/db";
import log from "../../lib/logger";

export const getAllPlatformTransactions = async (req: Request, res: Response) => {
  const C = "TransactionController";
  const F = "getAllPlatformTransactions";

  try {
    log.info(`[GET /api/admin/transactions] ➔ [${C} -> ${F}] Fetching all platform transaction logs.`);
    
    // SQL query to pull all entries from your pgAdmin table
    const sqlQuery = `SELECT * FROM transactions ORDER BY creation_time DESC;`;
    const result = await pool.query(sqlQuery);

    return res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error: any) {
    log.error(`[${C} -> ${F}] Database Exception: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error pulling platform records." });
  }
};

// Default export matches the import statement on your route.ts file
export default getAllPlatformTransactions;