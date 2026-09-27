'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import CarriersSection from "./CarriersSection"; 

export default function HeroSection() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRedirect = () => {
    if (phoneNumber.length !== 10) return;
    router.push(`/send-refill?phone=${phoneNumber}`);
  };

  return (
    <section className="relative overflow-hidden pt-[70px] sm:pt-[80px] lg:pt-[95px]">

      {/* Primary Background Image Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Images/newbg2.webp')",
        }}
      />

      {/* Hero Content Wrapper */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100vh]
          w-full
          max-w-[1440px]
          items-center
          px-5
          pb-40
          sm:px-8
          md:min-h-[88vh]
          md:px-12
          lg:px-20
          xl:px-28
        "
      >
        {/* 🌟 PREMIUM GLASSMORPHIC CARD CONTROL WRAPPER */}
        <div className="w-full max-w-[840px] bg-white/30 backdrop-blur-xl border border-white/40 rounded-[40px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          
          {/* Left Content Column */}
          <div className="w-full max-w-[720px]">

            {/* Darker, High-Contrast Crisp Heading */}
            <h1
              className="
                max-w-[780px]
                text-[38px]
                font-black
                leading-[1.05]
                tracking-[-2px]
                text-[#0F172A] 
                sm:text-[50px]
                md:text-[62px]
                lg:text-[68px]
                xl:text-[72px]
              "
            >
              Recharge your US
              <br />
              <span className="bg-gradient-to-r from-[#0021A5] via-[#0052D4] to-[#00A6FF] bg-clip-text text-transparent drop-shadow-sm py-1 inline-block">
                prepaid mobile
              </span>
              <br />
              in seconds
            </h1>

            {/* Darker Subtitle Label */}
            <p
              className="
                mt-8
                mb-2
                text-[14px]
                font-bold
                uppercase
                tracking-widest
                text-[#1E3A8A]
                opacity-90
                sm:text-[15px]
              "
            >
              Enter your US mobile number
            </p>

            {/* Input + Button Interactivity Group */}
            <div
              className="
                mt-4
                flex
                w-full
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
              "
            >
              {/* Input Box Wrapper */}
              <div className="relative w-full sm:max-w-[360px]">
                <div
                  className="
                    flex
                    h-[56px]
                    w-full
                    items-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/90
                    shadow-md
                    transition-all
                    focus-within:border-[#0052D4]
                    focus-within:ring-2
                    focus-within:ring-blue-500/20
                  "
                >
                  {/* Country Code Prefix */}
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      whitespace-nowrap
                      pl-4
                      pr-2
                      text-[16px]
                      font-bold
                      text-[#03254A]
                    "
                  >
                    +1
                  </div>

                  {/* Main Text Input */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setPhoneNumber(value);
                    }}
                    className="
                      h-full
                      w-full
                      bg-transparent
                      pr-[12px]
                      text-[16px]
                      font-bold
                      text-[#03254A]
                      outline-none
                      placeholder:text-slate-400
                    "
                  />
                </div>
              </div>

              {/* Action Checkout Trigger Button */}
              <button
                onClick={handleRedirect}
                disabled={phoneNumber.length !== 10}
                className="
                  flex
                  h-[56px]
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#0047AB]
                  to-[#0056FF]
                  px-[32px]
                  text-[16px]
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  hover:from-[#003ba0]
                  hover:to-[#004be6]
                  active:scale-[0.98]
                  disabled:opacity-40
                  disabled:pointer-events-none
                  sm:w-auto
                "
              >
                Pay Mobile Phone Bill
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Carriers Slider Anchor */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/30 via-black/10 to-transparent pt-20 pb-6">
        <CarriersSection />
      </div>

    </section>
  );
}