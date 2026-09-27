import { Router } from "express";
import log from "../lib/logger";
import pool from "../lib/db";
import jwt from "jsonwebtoken";
import { verifyTransactionToken } from "../lib/middleware/transaction.middleware";

const router = Router();

/**
 * 1. STEP 1: INITIALIZE CHECKOUT & GENERATE SECURE JWT USER TOKEN
 * POST /api/transactions/initiate
 * 🔓 PUBLIC ROUTE: Runs before any token exists
 */
router.post("/initiate", (req, res) => {
  const C = "TransactionController";
  const F = "initiateCheckout";

  try {
    const { phone, carrierName, planName, planId, amount } = req.body;

    if (!phone || !carrierName || !planName || !planId || !amount) {
      log.warn(`[POST /api/transactions/initiate] ➔ [${C} -> ${F}] Status: [WARN] | Message: [Validation Failed: Missing setup parameters.]`);
      return res.status(400).json({ error: "Missing plan configuration fields." });
    }

    log.info(`[POST /api/transactions/initiate] ➔ [${C} -> ${F}] Status: [INITIATED] | Phone: [${phone}] | Carrier: [${carrierName}] | Plan Name: [${planName}] | Plan ID: [${planId}] | Amount: [$${amount}]`);

    // Generate JWT token explicitly configured with your structural payload mapping snippet
    const secureUserToken = jwt.sign(
      {
        id: phone,
        type: "USER",
        platform: "WEB",
        phone,
        carrierName,
        planName,
        planId,
        amount
      },
      process.env.TOKEN_SECRET || "value_recharge_super_secret_key_123",
      {
        expiresIn: (process.env.TOKEN_EXPIRY as any) || "10m" 
      }
    );

    return res.status(200).json({
      success: true,
      checkoutToken: secureUserToken,
      displayDetails: {
        phone,
        carrierName,
        planName,
        planId,
        amount: `$${amount}`
      }
    });

  } catch (error: any) {
    log.error(`[POST /api/transactions/initiate] ➔ [${C} -> ${F}] Status: [ERROR] | Message: [System Error: ${error.message}]`);
    return res.status(500).json({ error: "Internal Server Error establishing checkout lock." });
  }
});

/**
 * =========================================================================
 * 🚧 THE SECURITY GATEWAY
 * Activates middleware across all downstream endpoints automatically.
 * =========================================================================
 */
router.use(verifyTransactionToken);

/**
 * 2. STEP 2: COMPLETE TRANSACTION
 * POST /api/transactions
 * 🔒 PROTECTED ROUTE: Inherits security tracking automatically from the middleware layer above
 */
router.post("/", async (req, res) => {
  const C = "TransactionController";
  const F = "saveTransaction";

  try {
    const { gateway, status, referenceId, verifiedUserPhone, verifiedCarrier, verifiedPlan, tokenVerificationStatus } = req.body;

    const paymentGateway = gateway || "mock_gateway";
    const paymentStatus = status || "SUCCESS";
    const trxRefId = referenceId || `pi_mock_${Date.now()}`;

    // Query to write safely structured records to pgAdmin
    const sqlQuery = `
      INSERT INTO transactions (phone_no, carrier_used, plan_chosen, payment_gateway_used, status, ref_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, creation_time;
    `;

    const result = await pool.query(sqlQuery, [
      verifiedUserPhone, 
      verifiedCarrier, 
      verifiedPlan, 
      paymentGateway, 
      paymentStatus, 
      trxRefId
    ]);
    
    const assignedRowId = result.rows[0].id;

    // Unified single-line console status block for audit tracking
    log.info(`[POST /api/transactions] ➔ [${C} -> ${F}] ID: [${assignedRowId}] | Phone: [${verifiedUserPhone}] | Carrier: [${verifiedCarrier}] | Plan: [${verifiedPlan}] | Gateway: [${paymentGateway}] | Token Status: [${tokenVerificationStatus}]`);

    return res.status(200).json({
      success: true,
      message: "Identity verified via JWT middleware framework. Saved to Postgres.",
      recordId: assignedRowId
    });

  } catch (error: any) {
    log.error(`[POST /api/transactions] ➔ [${C} -> ${F}] Status: [ERROR] | Message: [SQL Insertion Exception: ${error.message}]`);
    return res.status(500).json({ error: "Internal Server Error completing database purchase write." });
  }
});

/**
 * 3. STEP 3: DOWNSTREAM TRANSACTION AUDIT EXTRA ROAD (Optional Demo Route)
 * POST /api/transactions/status-check
 * 🔒 PROTECTED ROUTE: Also automatically inherits security validation check!
 */
router.post("/status-check", async (req, res) => {
  const C = "TransactionController";
  const F = "checkStatus";
  
  const { verifiedUserPhone, verifiedPlan } = req.body;
  
  log.info(`[POST /api/transactions/status-check] ➔ [${C} -> ${F}] Session Verified for Downstream Routing Profile: [${verifiedUserPhone}] | Plan: [${verifiedPlan}]`);
  
  return res.status(200).json({ 
    success: true, 
    message: "Identity token verified 'all the way' through downstream sub-routes successfully." 
  });
});

export default router;