"use client";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";

interface CarrierModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (carrier:any) => void
}

const carriers = [
  {
    name: "Metro by T-Mobile",
    logo: "carriers/metro_logo.svg",
  },
  {
    name: "AT&T",
    logo: "carriers/at_t_logo.svg",
  },
  {
    name: "Verizon",
    logo: "/carriers/verizon_logo.svg",
  },
  {
    name: "H2O Wireless",
    logo: "/carriers/h2o_wireless_logo.svg",
  },
  {
    name: "Cricket",
    logo: "/carriers/cricket_wireless_logo.svg",
  },
  {
    name: "Simple Mobile",
    logo: "/carriers/simple_mobile_logo.svg",
  },
  {
    name: "T-Mobile",
    logo: "/carriers/t_mobile_logo.svg",
  },
  {
    name: "Boost Mobile",
    logo: "/carriers/boost_logo.svg",
  },
  {
    name: "Lyca Mobile",
    logo: "/carriers/lyca_logo.svg",
  },
];

export default function CarrierModal({
  open,
  onClose,
  onSelect
}: CarrierModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative h-[92vh] w-full max-w-[420px] overflow-hidden rounded-[28px] bg-[#F8FAFC] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-5">

          {/* Back */}
          <button
            onClick={onClose}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F1F5F9] transition hover:bg-[#E2E8F0]"
          >
            <X size={18} className="text-[#475569]" />
          </button>

          {/* Title */}
          <h2 className="text-[20px] font-bold text-[#0F172A]">
            Choose Carrier
          </h2>

          {/* Empty spacing */}
          <div className="h-[38px] w-[38px]" />
        </div>

        {/* Content */}
        <div className="h-[calc(92vh-88px)] overflow-y-auto px-5 py-6">

          {/* Subtitle */}
          <div className="mb-6">
            <p className="text-[15px] text-[#64748B]">
              Select your mobile network provider
            </p>
          </div>

          {/* Carrier Cards */}
          <div className="space-y-4">
            {carriers.map((carrier, index) => (
              <button
                key={index}
                onClick={()=>onSelect(carrier)}
                className="group flex w-full items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all duration-200 hover:-translate-y-[2px] hover:border-[#2563EB] hover:shadow-lg active:scale-[0.99]"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">

                  {/* Logo Box */}
                  <div className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">

                    {/* Logo */}
                    <Image
                      src={carrier.logo}
                      alt={carrier.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>

                  {/* Carrier Name */}
                  <div className="text-left">
                    <h3 className="text-[18px] font-semibold text-[#0F172A]">
                      {carrier.name}
                    </h3>

                    <p className="mt-1 text-[14px] text-[#64748B]">
                      Prepaid recharge available
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={22}
                  className="text-[#94A3B8] transition group-hover:translate-x-1 group-hover:text-[#2563EB]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}