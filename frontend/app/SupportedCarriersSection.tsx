import Image from "next/image";

const carriers = [
  {
    name: "T-Mobile",
    image: "/Images/t-mobile-Carriers.webp",
  },
  {
    name: "AT&T",
    image: "/Images/att-Carriers .webp",
  },
  {
    name: "Metro",
    image: "/Images/metro-Carriers.webp",
  },
  {
    name: "Cricket",
    image: "/Images/cricket-Carriers.webp",
  },
  {
    name: "Simple Mobile",
    image: "/Images/simple-mobile-Carriers.webp",
  },
  {
    name: "Verizon",
    image: "/Images/verizon-Carriers.webp",
  },
  {
    name: "Boost",
    image: "/Images/boost-Carriers.webp",
  },
  {
    name: "H2O Wireless",
    image: "/Images/h2o-Carriers.webp",
  },
  {
    name: "Lyca",
    image: "/Images/lyca-Carriers.webp",
  },
];

export default function SupportedCarriersSection() {
  return (
    <section
      id="all-carriers"
      className="
        bg-white
        py-[50px]

        sm:py-[60px]
        md:py-[75px]
        lg:py-[90px]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1280px]
          px-4

          sm:px-6
          md:px-10
          lg:px-16
          xl:px-[120px]
        "
      >
        {/* Heading */}
        <h2
          className="
            mb-8
            text-center
            font-[600]
            leading-tight
            tracking-[0.25px]
            text-[#002C48]

            text-[24px]

            sm:text-[26px]
            md:text-[30px]
            lg:text-[32px]
          "
        >
          US Carriers Supported
        </h2>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-2
            gap-4

            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-3
          "
        >
          {carriers.map((carrier) => (
            <div
              key={carrier.name}
              className="
                flex
                h-[95px]
                items-center
                justify-center
                rounded-[12px]
                border
                border-[#D7DEE5]
                bg-white
                p-4
                transition-all
                duration-300
                hover:shadow-md

                sm:h-[105px]
                md:h-[115px]
                lg:h-[120px]
              "
            >
              <Image
                src={carrier.image}
                alt={carrier.name}
                width={130}
                height={40}
                className="
                  h-auto
                  w-[90px]
                  object-contain

                  sm:w-[100px]
                  md:w-[115px]
                  lg:w-[130px]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}