import Header from "./_components/header";
import Hero from "./_components/hero";
import Features from "./_components/FeaturesSection";
import Benefits from "./_components/Benefits";
import Testimonials from "./_components/Testimonials";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-purple-900 dark:to-pink-950">
      {/*  Header */}
      <Header />

      {/*  Hero Section */}
      <Hero />

      {/*  Features */}
      <Features />

      {/* Benefits */}
      <Benefits />

      {/* Testimonials */}
      <Testimonials />

      {/*  Call to Action */}
      <CTA />


      <Footer/>
    </main>
  );
}

