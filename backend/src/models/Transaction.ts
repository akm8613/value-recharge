import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    // 1. MAKE USER OPTIONAL (remove required: true)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // 2. ADD A GUEST PHONE FIELD to track the order
    guestPhone: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    carrier: { type: String, required: true },
    planId: { type: String, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    referenceId: { type: String, required: true }
  },
  { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;