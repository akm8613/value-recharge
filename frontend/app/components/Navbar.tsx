"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full">

        {/* Main Container */}
        <div
          className="
            flex
            items-center
            justify-between

            px-5
            py-4

            sm:px-8

            md:px-10

            lg:px-14

            xl:px-20
          "
        >

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">

              <>
                {/* Mobile Logo */}
                <Image
                  src="/Images/vr-icon.png"
                  alt="VR Logo"
                  width={70}
                  height={70}
                  priority
                  className="
                    block
                    sm:hidden
                    object-contain
                  "
                />

                {/* Desktop Logo */}
                <Image
                  src="/Images/Value_Recharge.webp"
                  alt="Value Recharge"
                  width={340}
                  height={120}
                  priority
                  className="
                    hidden
                    sm:block

                    h-auto
                    object-contain

                    w-[220px]

                    md:w-[270px]

                    lg:w-[320px]

                    xl:w-[360px]
                  "
                />
              </>

            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center">

            <Link href="/send-refill">

              <button
                className="
                  flex
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-[#5B6776]

                  bg-white

                  px-6
                  py-3

                  text-[15px]
                  font-semibold
                  text-[#002C48]

                  shadow-lg

                  transition-all
                  duration-300

                  hover:scale-[1.03]
                  hover:bg-[#002C48]
                  hover:text-white

                  sm:h-[52px]

                  sm:px-7

                  md:h-[58px]

                  md:px-8

                  lg:text-[16px]
                "
              >
                Get started
              </button>

            </Link>

          </div>

        </div>

      </header>
    </>
  );
}