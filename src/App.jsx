import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import SocialProof from "./components/SocialProof";
import About from "./components/About";
import Services from "./components/Services";
import Differentials from "./components/Differentials";
import Testimonials from "./components/Testimonials";
import ScheduleForm from "./components/ScheduleForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <SocialProof />
        <About />
        <Services />
        <Differentials />
        <Testimonials />
        <ScheduleForm />
      </main>
      <Footer />
    </>
  );
}
