import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // 🌟 Import the premium font engine

// Configure the font subsets and display optimization
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Value Recharge - Instant Prepaid Mobile Refills",
  description: "Refill your US prepaid mobile wireless plans in seconds safely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* 🌟 Apply the font class globally to the body element element */}
      <body className={plusJakartaSans.className}>
        <div 
          className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col relative"
          style={{ backgroundImage: "url('/Images/newbg2.webp')" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}