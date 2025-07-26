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
              number: { value: 25, density: { enable: true, value_area: 1200 } },
              size: { value: { min: 0.5, max: 4 }, random: true, anim: { enable: true, speed: 1, size_min: 0.3 } },
              color: { value: ["#4b5563", "#6b7280", "#374151"] },
              links: { enable: true, color: "#6b7280", distance: 130, opacity: 0.3, width: 0.6 },
              move: { 
                enable: true, 
                speed: { min: 0.05, max: 0.3 }, 
                outModes: { default: "out" },
                random: true,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
              },
            },
            interactivity: {
              detectsOn: "parent",
              events: { 
                onHover: { enable: true, mode: "grab" }, 
                onClick: { enable: true, mode: "bubble" } 
              },
              modes: { 
                grab: { distance: 150, links: { opacity: 0.4 } }, 
                bubble: { distance: 200, size: 6, duration: 0.8, opacity: 0.6 }
              },
            },
            background: { color: "transparent" },
            performance: { fpsLimit: 120, detectRetina: true },
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
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        heroRef.current.querySelectorAll(".hero-content > *"),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.2)", stagger: 0.25 }
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
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-gray-100/10 to-white/50 backdrop-blur-xl transition-all duration-700" />

      {/* Hero Content */}
      <motion.div
        className="z-10 max-w-6xl mx-auto hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <motion.h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Yash Nigam
        </motion.h1>

        <motion.p
          className="mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto tracking-wide font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Frontend Developer & Creative Technologist — crafting immersive, interactive, and elegant digital experiences with modern technology.
        </motion.p>

        <motion.a
          href="#projects"
          onClick={(e) => handleNavClick(e, "#projects")}
          whileHover={{ 
            scale: 1.08, 
            background: "linear-gradient(to right, #1f2937, #374151)", 
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)" 
          }}
          whileTap={{ scale: 0.92 }}
          className="mt-10 inline-block px-10 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:text-white transition-all duration-400 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          aria-label="View my projects"
        >
          View Projects
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        role="presentation"
        aria-hidden="true"
        whileHover={{ scale: 1.15 }}
      >
        <div className="w-6 h-12 border-2 border-gray-800 rounded-full flex items-start justify-center shadow-sm">
          <motion.div
            className="w-2 h-2 mt-2 bg-gray-800 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}