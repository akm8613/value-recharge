import Image from "next/image";

export default function AutopaySection() {
  return (
    <section className="bg-white py-[90px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-[90px] px-[90px]">

        {/* Left Image */}
        <div className="shrink-0">
          <Image
            src="/Images/cyclic-calendar-desktop.webp"
            alt="Autopay"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="max-w-[430px]">
          <h2 className="text-[46px] font-[700] leading-[0.98] tracking-[0.5px] text-[#002C48]">
            Autopay with 5% Discount
          </h2>

          <p className="mt-8 text-[20px] font-[300] leading-[1.45] tracking-[0.5px] text-[#002C48]">
            Teloa makes monthly refills effortless.
            Set Autopay once and your{" "}
            <span className="font-[700]">
              prepaid plan renews automatically every 30 days
            </span>
            —with{" "}
            <span className="font-[700]">
              5% savings
            </span>{" "}
            on every payment. Cancel anytime,
            no commitments.
          </p>
        </div>

      </div>
    </section>
  );
}