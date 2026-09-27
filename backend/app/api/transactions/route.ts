import { createTransaction, getUserTransactions } from "@/lib/controllers/transaction.controller";

export async function POST(req: Request) {
  // NO verifyAuth HERE!
  return await createTransaction(req);
}

export async function GET(req: Request) {
  // NO verifyAuth HERE!
  return await getUserTransactions(req);
}