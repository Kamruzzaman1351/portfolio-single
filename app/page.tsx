import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function Page() {
  return (
    <>
      {/* JSON-LD structured data — injected into <head> before page paint */}
      <SchemaMarkup />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        {/* FAQ — visible content that also feeds FAQPage schema for SGE/AI answers */}
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
