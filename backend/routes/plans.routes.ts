import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  // Put your plans array or database fetch logic here!
  const mockPlans = [
    { id: "1", name: "Basic Refill", price: 10 },
    { id: "2", name: "Super Refill", price: 25 }
  ];
  res.status(200).json(mockPlans);
});

export default router;