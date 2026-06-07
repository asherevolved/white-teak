import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ArrivalsSection from "@/components/ArrivalsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "New Arrivals — The Summer Affair | White Teak Coffee Roasters",
  description:
    "Discover The Summer Affair — our new mango-inspired arrivals: cakes, cheesecakes, lattes, pancakes, waffles, bowls and more.",
};

export default function ArrivalsPage() {
  return (
    <div className="bg-[#FFCB2D]">
      <Navbar />
      <main>
        <ArrivalsSection />
      </main>
      <Footer />
    </div>
  );
}
