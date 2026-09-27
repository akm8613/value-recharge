"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardNavbar() {

  const [mobileMenu, setMobileMenu] = useState(false);

  return (

    <header
  className="
    fixed
    top-0
    left-0
    z-50
    w-full

    border-b
    border-white/20

    bg-white/10

    backdrop-blur-md

    shadow-[0_4px_30px_rgba(0,0,0,0.08)]
  "
>

      {/* Bottom Glow Line */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-cyan-400/50
          to-transparent
        "
      />

      <div
        className="
          mx-auto
          flex
          h-[78px]
          max-w-[1400px]
          items-center
          justify-between

          px-5
          lg:px-10
        "
      >

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center

              rounded-full

              border
              border-cyan-400/20

              bg-white/5

              transition-all
              duration-300

              hover:border-cyan-400/40
              hover:bg-cyan-400/10

              md:hidden
            "
          >

            {mobileMenu ? (

              <X
                size={20}
                className="text-white"
              />

            ) : (

              <Menu
                size={20}
                className="text-white"
              />

            )}

          </button>

          {/* Logo */}
          <Link
            href="/"
            className="
              flex
              items-center
            "
          >

            <Image
              src="/Images/vr-icon.png"
              alt="ValueRecharge"
              width={80}
              height={80}
              priority
              className="
                h-auto
                w-[68px]

                object-contain

                transition-all
                duration-300

                hover:scale-105

                sm:w-[74px]
                md:w-[80px]
              "
            />

          </Link>

        </div>

        {/* Desktop Nav */}
        <div
          className="
            hidden
            items-center
            gap-8

            md:flex
          "
        >

          <button
            className="
              relative

              text-[15px]
              font-medium

              text-[#0F172A]

              transition-all
              duration-300

              hover:text-cyan-300
            "
          >
            Contacts
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (

        <div
          className="
            border-t
            border-white/10

            bg-[#dbeafe]/95

            px-6
            py-5

            md:hidden
          "
        >

          <button
            className="
              text-[15px]
              font-medium

              text-white/75

              transition-all
              duration-300

              hover:text-cyan-300
            "
          >
            Contacts
          </button>

        </div>

      )}

    </header>
  );
}