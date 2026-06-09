import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodGallery from "@/components/FoodGallery";
import NatureSection from "@/components/NatureSection";
import StorySection from "@/components/StorySection";
import FarmSection from "@/components/FarmSection";
import FeatureCards from "@/components/FeatureCards";
import GoogleReviews from "@/components/GoogleReviews";
import LocationsSection from "@/components/LocationsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ScrollGradient from "@/components/ScrollGradient";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
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
        <LocationsSection />
        <NewsletterSection />
        <Footer />
      </main>
    </>
  );
}
