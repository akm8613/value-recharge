"use client";

import CarrierModal from "./Modals/CarrierModal";
import AmountModal from "./Modals/AmountModal";

import {
  ChevronRight,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SendRefillBox() {

  const [carrierModalOpen, setCarrierModalOpen] =
    useState(false);

  const [selectedCarrier, setSelectedCarrier] =
    useState<any>(null);

  const [amountModalOpen, setAmountModalOpen] =
    useState(false);

  const [error, setError] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const searchParams = useSearchParams();

  useEffect(() => {

    const phone =
      searchParams.get("phone");

    const openAmount =
      searchParams.get("openAmount");

    if (phone) {
      setPhoneNumber(phone);
    }

    if (openAmount === "true") {
      setAmountModalOpen(true);
    }

  }, [searchParams]);

  const handleContinue = () => {

    if (!phoneNumber.trim()) {

      setError(
        "Please enter your phone number"
      );

      return;
    }

    if (phoneNumber.length < 10) {

      setError(
        "Please enter a valid phone number"
      );

      return;
    }

    if (!selectedCarrier) {

      setError(
        "Please choose your carrier"
      );

      return;
    }

    setError("");
    setAmountModalOpen(true);
  };

  return (

    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center

        overflow-hidden

        px-4
        pt-[120px]
        pb-[60px]
      "
    >

      {/* BACKGROUND */}
      <Image
        src="/Images/newbg2.webp"
        alt="background"
        fill
        priority
        className="
          -z-20
          object-cover
          object-center
        "
      />

      {/* CARD */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-[540px]

          overflow-hidden
          rounded-[38px]

          border
          border-white/30

          bg-white/20

          backdrop-blur-2xl

          shadow-[0_20px_90px_rgba(0,0,0,0.18)]
        "
      >

        {/* HEADER */}
        <div
          className="
            border-b
            border-white/20

            px-6
            py-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div />

            <h2
              className="
                text-[28px]
                font-bold

                text-[#0F172A]
              "
            >
              Send Refill
            </h2>

            <div />

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8">

          {/* LABEL */}
          <div
            className="
              mb-4

              flex
              items-center
              gap-2
            "
          >

            <Sparkles
              size={18}
              className="text-[#2563EB]"
            />

            <span
              className="
                text-[12px]
                font-semibold
                uppercase

                tracking-[4px]

                text-[#2563EB]
              "
            >
              VALUE RECHARGE
            </span>

          </div>

          {/* HEADING */}
          <h1
            className="
              text-[42px]
              font-black
              leading-[1.05]

              text-[#0F172A]

              sm:text-[48px]
            "
          >
            Recharge{" "}
            instantly
          </h1>

          {/* SUBTEXT */}
          <p
            className="
              mt-3

              text-[15px]

              text-[#334155]
            "
          >
            Recharge your prepaid phone
            securely in seconds.
          </p>

          {/* PHONE INPUT */}
          <div className="mt-8">

            <p
              className="
                mb-3

                text-[15px]
                font-semibold

                text-[#0F172A]
              "
            >
              Mobile Number
            </p>

            <div
              className="
                flex
                h-[64px]
                items-center

                overflow-hidden
                rounded-[22px]

                border
                border-white/30

                bg-white/20

                backdrop-blur-xl
              "
            >

              {/* COUNTRY */}
              <div
                className="
                  flex
                  h-full
                  items-center

                  border-r
                  border-white/20

                  px-5

                  text-[16px]
                  font-semibold

                  text-[#0F172A]
                "
              >
                +1
              </div>

              {/* INPUT */}
              <input
                type="text"

                placeholder="Enter phone number"

                value={phoneNumber}

                onChange={(e) => {

                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                  setPhoneNumber(value);
                  setError("");

                }}

                className="
                  h-full
                  flex-1

                  bg-transparent

                  px-4

                  text-[17px]
                  font-semibold

                  text-[#0F172A]

                  outline-none

                  placeholder:text-[#64748B]
                "
              />

              <div className="pr-5">

                <Smartphone
                  size={20}
                  className="text-[#64748B]"
                />

              </div>

            </div>

          </div>

          {/* CARRIER */}
          <div className="mt-7">

            <p
              className="
                mb-3

                text-[15px]
                font-semibold

                text-[#0F172A]
              "
            >
              Carrier
            </p>

            <button
              onClick={() =>
                setCarrierModalOpen(true)
              }

              className="
                flex
                w-full
                items-center
                justify-between

                rounded-[24px]

                border
                border-white/30

                bg-white/20

                px-5
                py-5

                backdrop-blur-xl

                transition-all
                duration-300

                hover:bg-white/30
              "
            >

              {/* LEFT */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                {/* ICON */}
                <div
                  className="
                    flex
                    h-[56px]
                    w-[56px]
                    items-center
                    justify-center

                    rounded-full

                    bg-gradient-to-br
                    from-[#2563EB]
                    to-[#60A5FA]

                    text-white
                  "
                >

                  {selectedCarrier ? (

                    <Image
                      src={selectedCarrier.logo}
                      alt={selectedCarrier.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />

                  ) : (

                    <ShieldCheck size={26} />

                  )}

                </div>

                {/* TEXT */}
                <div className="text-left">

                  <p
                    className="
                      text-[17px]
                      font-semibold

                      text-[#0F172A]
                    "
                  >
                    {selectedCarrier
                      ? selectedCarrier.name
                      : "Choose carrier"}
                  </p>

                  <p
                    className="
                      mt-1

                      text-[13px]

                      text-[#64748B]
                    "
                  >
                    Verizon, AT&T,
                    T-Mobile & more
                  </p>

                </div>

              </div>

              <ChevronRight
                size={22}
                className="text-[#64748B]"
              />

            </button>

          </div>

          {/* ERROR */}
          {error && (

            <div
              className="
                mt-5

                rounded-[18px]

                border
                border-red-200

                bg-red-50/80

                px-4
                py-3

                text-[14px]
                text-red-600
              "
            >
              {error}
            </div>

          )}

          {/* 🚀 CONTINUE BUTTON (UPDATED WITH DISABLED STATE VALIDATION ROUTING) */}
          <button
            onClick={handleContinue}
            disabled={!selectedCarrier}
            className="
              mt-8

              h-[60px]
              w-full

              rounded-full

              bg-gradient-to-r
              from-[#0047CC]
              via-[#005EFF]
              to-[#60A5FA]

              text-[17px]
              font-semibold
              text-white

              shadow-[0_15px_45px_rgba(37,99,235,0.35)]

              transition-all
              duration-300

              hover:scale-[1.02]

              /* 🌟 Premium Disabled Overrides to Match Screenshot 2026-06-03 at 14.56.06.jpg */
              disabled:opacity-45
              disabled:pointer-events-none
              disabled:scale-100
              disabled:shadow-none
            "
          >
            Continue
          </button>

          {/* FOOTER */}
          <div
            className="
              mt-5

              flex
              items-center
              justify-center
              gap-2
            "
          >

            <ShieldCheck
              size={16}
              className="text-[#16A34A]"
            />

            <p
              className="
                text-[13px]

                text-[#475569]
              "
            >
              Secure & encrypted recharge
            </p>

          </div>

        </div>

      </div>

      {/* MODALS */}
      <CarrierModal
        open={carrierModalOpen}

        onClose={() =>
          setCarrierModalOpen(false)
        }

        onSelect={(carrier: any) => {

          setSelectedCarrier(carrier);

          setError("");

          setCarrierModalOpen(false);

        }}
      />

      <AmountModal
        open={amountModalOpen}

        onClose={() =>
          setAmountModalOpen(false)
        }

        selectedCarrier={selectedCarrier}

        phoneNumber={phoneNumber}
      />

    </div>
  );
}