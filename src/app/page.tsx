import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodGallery from "@/components/FoodGallery";
import CategoryLinks from "@/components/CategoryLinks";
import NatureSection from "@/components/NatureSection";
import StorySection from "@/components/StorySection";
import FarmSection from "@/components/FarmSection";
import FeatureCards from "@/components/FeatureCards";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FoodGallery />
        <CategoryLinks />
        <NatureSection />
        <StorySection />
        <FarmSection />
        <FeatureCards />
        <GoogleReviews />
      </main>
      <Footer />
    </>
  );
}
