import { Router } from "express";
import pool from "../../../../lib/db"; // Points to your secure PostgreSQL client pool
import log from "../../../../lib/logger";

const router = Router();

// This handles: GET http://localhost:5001/api/admin/transactions
router.get("/", async (req, res) => {
  const C = "AdminAPI";
  const F = "GET";

  try {
    log.info(`[GET /api/admin/transactions] ➔ [${C} -> ${F}] Express endpoint pulling platform logs.`);

    // Query your pgAdmin transactions table directly
    const sqlQuery = `SELECT * FROM transactions ORDER BY creation_time DESC;`;
    const result = await pool.query(sqlQuery);

    // Return using native Express JSON formatting syntax
    return res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });

  } catch (error: any) {
    log.error(`[${C} -> ${F}] Database Exception: ${error.message}`);
    return res.status(500).json({ 
      error: "Internal Server Error pulling platform records." 
    });
  }
});

export default router;