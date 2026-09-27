import { Request, Response } from "express";
import log from "../../lib/logger";

export const createPaymentIntent = async (req: Request, res: Response) => {
  const C = "PaymentController";
  const F = "createPaymentIntent";

  log.info(`[${C} -> ${F}] Initialized incoming payment request handler.`);

  try {
    const { amount, carrier, phone, gateway } = req.body;

    if (!amount || amount <= 0) {
      log.warn(`[${C} -> ${F}] Validation Failed: Aborting due to invalid amount.`);
      return res.status(400).json({ error: "Valid amount is required" });
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    log.info(`[${C} -> ${F}] [MOCK GATEWAY] Simulating $${amount} Payment Intent for Guest: ${phone} via ${gateway || "upi"}`);

    return res.status(200).json({
      clientSecret: "pi_mock_secret_9876543210_test_signature",
      message: "Mock payment intent created successfully."
    });

  } catch (error: any) {
    log.error(`[${C} -> ${F}] Exception encountered: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};