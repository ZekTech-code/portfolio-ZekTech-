import { MotionConfig } from "framer-motion";
import Layout from "./Components/Layout/Layout";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Hero from "./Components/Sections/Hero";
import About from "./Components/Sections/About";
import Contact from "./Components/Sections/Contact";
import ScrollToTop from "./Components/Common/ScrollToTop";
import FloatingBot from "./Components/Common/FloatingBot";
import Skills from "./Components/Sections/Skills";
import Projects from "./Components/Sections/Projects";
import Services from "./Components/Sections/Services";
import Process from "./Components/Sections/Process";

function App() {
  return (
    <MotionConfig reducedMotion="never">
      <Layout>
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Process />
          <Services />
          <Contact />
        </main>
        <Footer />
        <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 sm:bottom-6 md:bottom-8">
          <FloatingBot />
          <ScrollToTop />
        </div>
      </Layout>
    </MotionConfig>
  );
}

export default App;
