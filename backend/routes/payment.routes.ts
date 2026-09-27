import { Router } from "express";
import log from "../lib/logger";

const router = Router();

// Notice it's router.post() instead of export async function POST()
router.post("/intent", async (req, res) => {
  try {

    const { amount, carrier, phone, gateway } = req.body;

    if (!amount || amount <= 0) {
      log.warn(`Invalid amount attempt for phone: ${phone}`);
      // In Express, we use res.status().json() instead of NextResponse
      return res.status(400).json({ error: "Valid amount is required" });
    }

    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 800)); 

    log.info(`Simulating $${amount} Payment Intent for Guest: ${phone} via ${gateway}`);

    return res.status(200).json({
      clientSecret: "pi_mock_secret_9876543210_test_signature",
      message: "Mock payment intent created successfully."
    });

  } catch (error: any) {
    log.error(`Payment Intent Error: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;