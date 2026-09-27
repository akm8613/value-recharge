import Image from "next/image";

export default function CashbackSection() {
  return (
    <section className="bg-white py-[90px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-[90px] px-[90px]">

        <div className="max-w-[430px]">
          <h2 className="text-[46px] font-[700] leading-[0.98] tracking-[0.5px] text-[#002C48]">
            3% back on every refill
          </h2>

          <p className="mt-8 text-[20px] font-[300] leading-[1.45] tracking-[0.5px] text-[#002C48]">
            Accrue{" "}
            <span className="font-[700]">
              3% of Teloa credit
            </span>{" "}
            after every refill. Invite family and
            friends to Teloa to earn{" "}
            <span className="font-[700]">
              $5 credit
            </span>.
            They also get a $5 discount on their
            first refill. Your credit never expires.
          </p>
        </div>

        <div className="shrink-0">
          <Image
            src="/Images/safe-deposit-desktop.jpeg"
            alt="Cashback"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}