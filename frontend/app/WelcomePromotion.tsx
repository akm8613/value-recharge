export default function WelcomePromotion() {
  return (
    <section className="relative overflow-hidden bg-[#dff8f0] py-[90px] md:py-[120px]">
      {/* Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#c6f3e6]" />

        <div
          className="absolute right-[-120px] top-[-120px] h-[500px] w-[700px]"
          style={{
            background: "#7be5d6",
            borderBottomLeftRadius: "400px",
            transform: "rotate(-8deg)",
          }}
        />
        <div
          className="absolute right-[220px] top-[-100px] h-[420px] w-[420px]"
          style={{
            background: "#67d8f0",
            borderBottomLeftRadius: "320px",
            transform: "rotate(-20deg)",
            opacity: 0.7,
          }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center">
        <p className="mb-[4.5rem] text-[1.5rem] font-semibold leading-[32px] text-[rgb(0,44,72)]">  Welcome Promotion
        </p>
        <h1 className="mb-[48px] max-w-[1100px] text-[3rem] font-bold leading-[1.06] text-[#002c48]">
  Get a $5 discount on your first prepaid cell phone plan refill
</h1>
       <button className="mt-12 flex min-w-[296px] items-center justify-center rounded-[56px] bg-[#0660c6] px-6 py-4 text-center text-[20px] font-bold leading-6 text-white transition-all duration-300 ease-out hover:bg-[#0555ad]">
  Pay Cell Phone Bill
</button>
      </div>
    </section>
  );
}