import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import log from "./lib/logger";
import { connectDB } from "./lib/db"; // Import our new SQL database pool starter
import transactionRoutes from "./routes/transactions.routes";
import carrierRoutes from "./routes/recharge.routes"; // your carrier routes file
import adminTransactionRoutes from "./app/api/admin/transactions/route";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/recharge", carrierRoutes);
app.use("/api/admin/transactions", adminTransactionRoutes);

const startServer = async () => {
  // 1. Fire up the PostgreSQL connection cluster pool
  await connectDB();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    log.info(`🚀 Server running cleanly on http://localhost:${PORT}`);
  });
};

startServer();