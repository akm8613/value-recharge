import { Router } from "express";
import { getCarriers } from "../src/controllers/carrier.controller";

const router = Router();

// This handles: GET http://localhost:5001/api/recharge/carriers
router.get("/carriers", getCarriers);

export default router;