import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QueryForm from "@/components/QueryForm";
import ZonalGatesSection from "@/components/ZonalGatesSection";
import LocationsSection from "@/components/LocationsSection";
import ZiyaratLocationsSection from "@/components/ZiyaratLocationsSection";
import ArrivalScanningSection from "@/components/ArrivalScanningSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <QueryForm />
        <ZonalGatesSection/>
        <LocationsSection />
        <ZiyaratLocationsSection />
        <ArrivalScanningSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
