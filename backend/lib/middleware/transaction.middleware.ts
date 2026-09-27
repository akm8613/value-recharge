import { Request, Response, NextFunction } from "express";
import log from "../logger"; 
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "value_recharge_super_secret_key_123";

export const verifyTransactionToken = (req: Request, res: Response, next: NextFunction) => {
  const C = "TransactionMiddleware";
  const F = "verifyToken";
  const { checkoutToken } = req.body;

  if (!checkoutToken) {
    log.warn(`[POST /api/transactions] ➔ [${C} -> ${F}] Status: [WARN] | Message: [Security Rejection: Missing validation token.]`);
    return res.status(401).json({ error: "Security validation token required to verify user identity." });
  }

  try {
    // Decrypt and cryptographically verify the JWT signature status
    const decoded = jwt.verify(checkoutToken, TOKEN_SECRET) as any;

    // Map verified properties directly out of the secure token container onto the body object
    req.body.verifiedUserPhone = decoded.phone;
    req.body.verifiedCarrier = decoded.carrierName;
    req.body.verifiedPlan = decoded.planName ? `${decoded.planName} ($${decoded.amount})` : `${decoded.planId} - Prepaid Refill $${decoded.amount}`;
    req.body.tokenVerificationStatus = "100% Cryptographically Verified via JWT Middleware";

    next();
  } catch (tokenError: any) {
    log.error(`[POST /api/transactions] ➔ [${C} -> ${F}] Status: [ERROR] | Message: [JWT Verification Failed: ${tokenError.message}]`);
    return res.status(403).json({ error: "Verification token expired or altered. Identity compromise detected." });
  }
};