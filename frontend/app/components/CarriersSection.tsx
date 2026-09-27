'use client';

import Image from "next/image";

export default function CarriersSection() {

  const handleScroll = () => {
    const el = document.getElementById("all-carriers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="
        relative
        flex
        flex-col
        items-center
        bg-transparent
        px-4
        pb-8
        text-center
      "
    >

      {/* Heading */}
      <p
        className="
          mb-3
          text-[18px]
          font-semibold
          text-white
          drop-shadow-md

          sm:text-[20px]
          md:text-[22px]
          lg:text-[24px]
        "
      >
        All major US carriers supported
      </p>

      {/* Logos Container */}
      <div
        className="
          flex
          w-full
          max-w-[1100px]
          flex-wrap
          items-center
          justify-center

          gap-x-5
          gap-y-3

          sm:gap-x-7
          sm:gap-y-4

          md:gap-x-8
          md:gap-y-5
        "
      >

        {/* T-Mobile */}
        <Image
          src="/Images/t-mobile-white.webp"
          alt="T-Mobile"
          width={189}
          height={33}
          className="
            h-auto
            w-[105px]
            object-contain

            sm:w-[125px]

            md:w-[145px]

            lg:w-[170px]
          "
        />

        {/* AT&T */}
        <Image
          src="/Images/att-white.webp"
          alt="AT&T"
          width={137}
          height={57}
          className="
            h-auto
            w-[80px]
            object-contain

            sm:w-[95px]

            md:w-[110px]

            lg:w-[125px]
          "
        />

        {/* Metro */}
        <Image
          src="/Images/metro-white.webp"
          alt="Metro"
          width={149}
          height={57}
          className="
            h-auto
            w-[90px]
            object-contain

            sm:w-[105px]

            md:w-[120px]

            lg:w-[138px]
          "
        />

        {/* Verizon */}
        <Image
          src="/Images/verizon.webp"
          alt="Verizon"
          width={143}
          height={33}
          className="
            h-auto
            w-[85px]
            object-contain

            sm:w-[100px]

            md:w-[115px]

            lg:w-[130px]
          "
        />

      </div>

      {/* View All Carriers Button */}
      <button
        onClick={handleScroll}
        className="
          mt-3
          text-[15px]
          font-medium
          text-white
          underline
          underline-offset-4
          transition-all
          duration-300

          hover:opacity-80

          sm:text-[16px]

          md:text-[17px]
        "
      >
        View all carriers
      </button>

    </section>
  );
}