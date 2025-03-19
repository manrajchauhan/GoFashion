import About from "./components/About/About";
import AppDemo from "./components/App/App";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HowWorks from "./components/How/HowWorks";
import { DragCards } from "./components/ui/cards";
import RandomScroll from "./components/ui/random";

export default function Home() {
  return (
        <>
        <Header/>
        <Hero/>
        <AppDemo/>
        <DragCards/>
        <RandomScroll/>
        <HowWorks/>
        <About/>
        <Footer/>
        </>
  );
}
