import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SecuritySection from "./components/SecuritySection";
import SupportedCarriersSection from "./SupportedCarriersSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
        </div>
        <div className="relative z-20">
          <Navbar />
          <HeroSection />
        </div>
      </main>
      <div className="bg-white">
        <SecuritySection />
        <SupportedCarriersSection />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}