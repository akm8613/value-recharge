"use client";

import Image from "next/image";
import { ChevronRight, ArrowLeft, X, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "../DashboardNavbar";

interface AmountModalProps {
  open: boolean;
  onClose: () => void;
  selectedCarrier: any;
  phoneNumber: string;
}

export default function AmountModal({
  open,
  onClose,
  selectedCarrier,
  phoneNumber,
}: AmountModalProps) {
  const router = useRouter();

  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  
  const [fetchedPlans, setFetchedPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New spinner state for token generation

  useEffect(() => {
    if (open && selectedCarrier) {
      const fetchPlans = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`http://localhost:5001/api/recharge/carriers?mobilenumber=${phoneNumber}`, {
            method: "GET",
          });

          const data = await res.json();
          
          if (res.ok && data.carriers) {
            const normalize = (str: string) => 
              str ? str.toLowerCase().replace(/[^a-z0-9]/g, "").trim() : "";

            const targetName = normalize(selectedCarrier.name);

            const currentCarrier = data.carriers.find((c: any) => {
              const backendName = normalize(c.name);
              return backendName === targetName || backendName.includes(targetName) || targetName.includes(backendName);
            });
            
            if (currentCarrier) {
              setFetchedPlans(currentCarrier.plans);
            } else {
              console.warn(`⚠️ Safe-match skipped: No direct mapping for carrier name: "${selectedCarrier.name}"`);
              if (data.carriers.length > 0) {
                setFetchedPlans(data.carriers[0].plans);
              }
            }
          } else {
            console.error("Failed to fetch plans:", data?.error);
          }
        } catch (error) {
          console.error("Network error connecting to backend server:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPlans();
    }
  }, [open, selectedCarrier, phoneNumber]);

  if (!open) return null;

  // --- CONVERTED TO ASYNC TO GENERATE SECURITY TOKEN BEFORE ROUTING ---
  const handleContinue = async () => {
    if (!selectedCarrier || !selectedCarrier.name) {
      setError("Please select a carrier to continue.");
      return;
    }

    if (!customAmount.trim()) {
      setError("Please enter an amount");
      return;
    }

    const number = Number(customAmount);

    if (number < 10) {
      setError("Minimum recharge is $10");
      return;
    }

    if (number > 100) {
      setError("Maximum recharge is $100");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Find if the typed amount matches an existing plan profile object
      const matchedPlan = fetchedPlans.find((p) => Number(p.amount) === number);
      
      const planName = matchedPlan ? matchedPlan.name : "Custom Amount Refill";
      const planId = matchedPlan ? matchedPlan.id : `custom-${number}`;

      // Hit our verification route to generate the token bound to this user
      const response = await fetch("http://localhost:5001/api/transactions/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          carrierName: selectedCarrier.name,
          planName: planName,
          planId: planId,
          amount: number,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Safe to route! Append the cryptographic verification token string to the URL params
        router.push(
          `/payment?amount=${number}&phone=${phoneNumber}&carrier=${encodeURIComponent(
            selectedCarrier.name
          )}&token=${encodeURIComponent(data.checkoutToken)}`
        );
      } else {
        setError(data.error || "Failed to secure validation token. Try again.");
      }
    } catch (err) {
      console.error("Identity verification connection dropped:", err);
      setError("Server connection issue. Could not sign security authorization token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-cover bg-center md:bg-right bg-no-repeat"
      style={{ backgroundImage: "url('/Images/newbg2.webp')" }}
    >
      <DashboardNavbar />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-[100px] sm:pt-[120px] pb-[40px] sm:pb-[60px]">
        <div className="w-full max-w-[620px] overflow-hidden rounded-[26px] sm:rounded-[32px] lg:rounded-[38px] border border-white/40 bg-white/65 backdrop-blur-2xl shadow-[0_25px_120px_rgba(0,0,0,0.18)]">
          
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#DDE7F3] px-4 py-4 sm:px-6 sm:py-5">
            <button onClick={onClose} className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/70 transition-all duration-300 hover:bg-white">
              <ArrowLeft size={18} className="text-[#0F172A]" />
            </button>
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#0F172A]">
              Send refill
            </h2>
            <button onClick={onClose} className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/70 transition-all duration-300 hover:bg-white">
              <X size={18} className="text-[#0F172A]" />
            </button>
          </div>

          {/* USER INFO */}
          <div className="flex items-center justify-between border-b border-[#DDE7F3] px-4 py-5 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] shadow-[0_8px_24px_rgba(37,99,235,0.35)]">
                <span className="text-[18px] font-bold text-white">👤</span>
              </div>
              <div>
                <p className="text-[16px] sm:text-[18px] font-semibold text-[#0F172A]">
                  Your Number
                </p>
                <p className="mt-1 text-[13px] sm:text-[14px] text-[#475569]">
                  {phoneNumber}
                </p>
              </div>
            </div>

            {selectedCarrier && (
              <div className="flex h-[56px] w-[84px] sm:h-[64px] sm:w-[92px] items-center justify-center rounded-[18px] border border-[#DDE7F3] bg-white">
                <Image
                  src={selectedCarrier.logo}
                  alt={selectedCarrier.name}
                  width={58}
                  height={34}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="px-4 py-5 sm:px-6 sm:py-7">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={18} className="text-[#2563EB]" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[4px] text-[#2563EB]">
                VALUE RECHARGE
              </span>
            </div>

            <h3 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black leading-[1.05] text-[#0F172A]">
              Choose Refill Amount
            </h3>

            <p className="mt-3 text-[14px] sm:text-[15px] text-[#64748B]">
              Enter an amount between $10 and $100
            </p>

            {/* INPUT ROW */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row">
              <div className="flex h-[60px] sm:h-[68px] lg:h-[72px] flex-1 items-center rounded-[20px] sm:rounded-[24px] border border-[#DDE7F3] bg-white/70 px-5 sm:px-6">
                <span className="mr-4 text-[28px] sm:text-[34px] font-bold text-[#64748B]">
                  $
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  disabled={isSubmitting}
                  value={customAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!/^\d*\.?\d*$/.test(value)) return;
                    
                    setCustomAmount(value);
                    
                    if (value === "") {
                      setError("");
                      return;
                    }
                    const number = Number(value);
                    if (number < 10) setError("Minimum recharge is $10");
                    else if (number > 100) setError("Maximum recharge is $100");
                    else setError("");
                  }}
                  className="h-full w-full bg-transparent text-[20px] sm:text-[24px] lg:text-[26px] font-bold text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={isSubmitting}
                className="flex h-[60px] sm:h-[68px] lg:h-[72px] items-center justify-center rounded-[20px] sm:rounded-[24px] bg-gradient-to-r from-[#0047CC] via-[#005EFF] to-[#3B82F6] px-6 sm:px-8 lg:px-10 text-[15px] sm:text-[16px] font-bold text-white shadow-[0_15px_60px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.03] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-white" size={20} />
                ) : (
                  "Continue"
                )}
              </button>
            </div>

            <p className="mt-3 text-[12px] sm:text-[13px] text-[#64748B]">
              Minimum recharge $10 • Maximum recharge $100
            </p>

            {error && <p className="mt-3 text-[14px] text-red-500 font-medium">{error}</p>}

            {/* PLANS */}
            <div className="mt-10 space-y-5">
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="animate-spin text-[#2563EB]" size={32} />
                  <span className="ml-3 text-gray-500 font-medium">Loading plans...</span>
                </div>
              ) : (
                fetchedPlans.map((plan) => (
                  <button
                    key={plan.id}
                    disabled={isSubmitting}
                    onClick={() => {
                      setCustomAmount(plan.amount.toString());
                      setError("");
                    }}
                    className="group flex w-full items-center justify-between rounded-[22px] sm:rounded-[28px] border border-[#DDE7F3] bg-white/55 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#2563EB] hover:bg-white/80 disabled:opacity-60"
                  >
                    <div className="text-left">
                      <p className="text-[11px] sm:text-[12px] uppercase tracking-[2px] text-[#2563EB]">
                        {plan.name}
                      </p>
                      <p className="mt-2 text-[28px] sm:text-[34px] lg:text-[38px] font-black text-[#0F172A]">
                        ${plan.amount}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-[14px] sm:text-[16px] text-[#475569]">
                          Instant Refill
                        </span>
                      </div>
                    </div>
                    <div className="flex h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] items-center justify-center rounded-full bg-[#EFF6FF] transition-all duration-300 group-hover:bg-[#2563EB]">
                      <ChevronRight size={22} className="text-[#2563EB] group-hover:text-white" />
                    </div>
                  </button>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}