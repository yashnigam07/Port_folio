import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.5 });

  // Handle smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isInView) {
      const loadParticles = async () => {
        try {
          await loadFull(tsParticles);
          await tsParticles.load("tsparticles", {
            fullScreen: false,
            particles: {
              number: { value: 20, density: { enable: true, value_area: 1000 } },
              size: { value: { min: 1, max: 3 }, random: true },
              color: { value: "#4b5563" },
              links: { enable: true, color: "#6b7280", distance: 120, opacity: 0.4, width: 0.8 },
              move: { enable: true, speed: { min: 0.1, max: 0.4 }, outModes: { default: "out" } },
            },
            interactivity: {
              detectsOn: "parent",
              events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
              modes: { grab: { distance: 140, links: { opacity: 0.5 } }, push: { quantity: 1 } },
            },
            background: { color: "transparent" },
            performance: { fpsLimit: 60, detectRetina: true },
          });
        } catch (error) {
          console.error("Failed to load tsparticles:", error);
          if (particlesRef.current) {
            particlesRef.current.innerHTML = "<p class='text-gray-600 text-sm text-center'>Background effect unavailable</p>";
          }
        }
      };
      loadParticles();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        heroRef.current.querySelector(".hero-content"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.2 }
      );

      return () => {
        tl.kill();
        if (tsParticles) tsParticles.dom().forEach((t) => t.destroy());
      };
    }
  }, [isInView]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-200 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Particle Background */}
      <div
        id="tsparticles"
        ref={particlesRef}
        className="absolute inset-0 z-0 pointer-events-auto"
        role="presentation"
        aria-hidden="true"
      />

      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-gray-100/20 to-white/60 backdrop-blur-lg transition-all duration-500" />

      {/* Hero Content */}
      <motion.div
        className="z-10 max-w-5xl mx-auto hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Yash Nigam
        </motion.h1>

        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Frontend Developer & Creative Technologist — crafting immersive, interactive, and elegant digital experiences with modern technology.
        </motion.p>

        <motion.a
          href="#projects"
          onClick={(e) => handleNavClick(e, "#projects")}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/90 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          aria-label="View my projects"
        >
          View Projects
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        role="presentation"
        aria-hidden="true"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-5 h-10 border-2 border-gray-800 rounded-full flex items-start justify-center">
          <motion.div
            className="w-1.5 h-1.5 mt-1.5 bg-gray-800 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}