import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodGallery from "@/components/FoodGallery";
import NatureSection from "@/components/NatureSection";
import StorySection from "@/components/StorySection";
import FarmSection from "@/components/FarmSection";
import FeatureCards from "@/components/FeatureCards";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";
import ScrollGradient from "@/components/ScrollGradient";

export default function Home() {
  return (
    <>
      <ScrollGradient />
      <Navbar />
      <main>
        <HeroSection />
        <FoodGallery />
        <NatureSection />
        <StorySection />
        <FarmSection />
        <FeatureCards />
        <GoogleReviews />
        <Footer />
      </main>
    </>
  );
}
