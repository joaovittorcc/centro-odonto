import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import About from "./components/About";
import Services from "./components/Services";
import Differentials from "./components/Differentials";
import ScheduleForm from "./components/ScheduleForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <Services />
        <Differentials />
        <ScheduleForm />
      </main>
      <Footer />
    </>
  );
}
