import Header from './components/Header';
import Hero from './components/Hero';
import VoltScene from './components/VoltScene';
import Services from './components/Services';
import FirstTen from './components/FirstTen';
import Winter from './components/Winter';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useReveal } from './components/useReveal';
import { useLenis } from './components/useLenis';

export default function App() {
  useLenis();
  useReveal('home');
  return (
    <>
      <a className="skip" href="#osnovnoe">К содержанию</a>
      <Header />
      <main id="osnovnoe">
        <Hero />
        <VoltScene />
        <Services />
        <FirstTen />
        <Winter />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
