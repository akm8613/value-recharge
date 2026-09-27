"use client";

import { useEffect, useMemo, useState } from "react";

type Transaction = {
  id: number;
  phone_no: string;
  carrier_used: string;
  plan_chosen: string;
  offers: string;
  payment_gateway_used: string;
  status: string;
  ref_id: string;
  creation_time: string;
  updation_time: string;
};

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/admin/transactions"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch transactions");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error("Transaction API returned an error");
        }

        setTransactions(result.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load transaction data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const successfulTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) => transaction.status.toLowerCase() === "success"
    );
  }, [transactions]);

  const failedTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) => transaction.status.toLowerCase() === "failed"
    );
  }, [transactions]);

  const mostUsedCarrier = useMemo(() => {
    if (!transactions.length) return "—";

    const carrierCounts: Record<string, number> = {};

    transactions.forEach((transaction) => {
      carrierCounts[transaction.carrier_used] =
        (carrierCounts[transaction.carrier_used] || 0) + 1;
    });

    return Object.entries(carrierCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  }, [transactions]);

  const maskPhone = (phone: string) => {
    if (!phone) return "—";

    const lastFour = phone.slice(-4);

    return `******${lastFour}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-8 h-10 w-72 rounded-lg bg-gray-200" />

            <div className="grid gap-5 md:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-2xl bg-gray-200"
                />
              ))}
            </div>

            <div className="mt-8 h-96 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-8">
        <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
          <div className="mb-4 text-4xl">⚠️</div>

          <h1 className="text-xl font-semibold text-gray-900">
            Unable to load dashboard
          </h1>

          <p className="mt-2 text-gray-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:opacity-80"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            ValueRecharge
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Recharge Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor your recharge activity and transaction history.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Transactions
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {transactions.length}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              All recharge activity
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Successful
            </p>

            <p className="mt-3 text-3xl font-bold text-green-600">
              {successfulTransactions.length}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Completed transactions
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Failed
            </p>

            <p className="mt-3 text-3xl font-bold text-red-500">
              {failedTransactions.length}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Transactions requiring attention
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Most Used Carrier
            </p>

            <p className="mt-3 truncate text-2xl font-bold text-gray-900">
              {mostUsedCarrier}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Based on transaction volume
            </p>
          </div>

        </div>

        {/* Transactions */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Transactions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest recharge activity
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
              {transactions.length} records
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-left">

              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Carrier</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {transactions.map((transaction) => {

                  const successful =
                    transaction.status.toLowerCase() === "success";

                  return (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {maskPhone(transaction.phone_no)}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {transaction.carrier_used}
                      </td>

                      <td className="max-w-[250px] px-6 py-4 text-gray-600">
                        <div className="truncate">
                          {transaction.plan_chosen}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {transaction.payment_gateway_used}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            successful
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(transaction.creation_time)}
                      </td>
                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
}