import Image from "next/image";

export default function SecuritySection() {
  return (
    <section
      className="
        bg-white

        py-[60px]

        sm:py-[75px]
        md:py-[90px]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-[1280px]
          flex-col
          items-center
          gap-10
          px-4
          text-center

          sm:px-6

          md:gap-14
          md:px-10

          lg:flex-row
          lg:justify-center
          lg:gap-[90px]
          lg:px-[90px]
          lg:text-left
        "
      >
        {/* Image */}
        <div className="shrink-0">
          <Image
            src="/Images/clock-desktop.webp"
            alt="Security Lock"
            width={280}
            height={280}
            className="
              h-auto
              w-[180px]
              object-contain

              sm:w-[220px]

              md:w-[250px]

              lg:w-[280px]
            "
          />
        </div>

        {/* Content */}
        <div className="max-w-[430px]">
          <h2
            className="
              font-[700]
              leading-[1.05]
              tracking-[0.5px]
              text-[#002C48]

              text-[2rem]

              sm:text-[2rem]

              md:text-[2.5rem]

              lg:text-[46px]
            "
          >
            Fast, secure and no hidden fees
          </h2>

          <p
            className="
              mt-5
              font-[300]
              leading-[1.6]
              tracking-[0.3px]
              text-[#002C48]

              text-[16px]

              sm:mt-6
              sm:text-[14px]

              md:mt-7
              md:text-[16px]

              lg:mt-8
              lg:text-[20px]
            "
          >
            We don't store your payment details.
            PayPal and all major debit & credit
            cards are supported. Confirmation in
            seconds via SMS, email or push
            notifications.
          </p>
        </div>
      </div>
    </section>
  );
}