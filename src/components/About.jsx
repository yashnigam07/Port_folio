import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.5 });

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        aboutRef.current.querySelectorAll(".about-content > *"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }
      );

      return () => {
        tl.kill();
      };
    }
  }, [isInView]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="about-title"
      aria-describedby="about-description"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-gray-100/20 to-white/60 backdrop-blur-lg transition-all duration-500" />

      {/* About Content */}
      <motion.div
        className="z-10 max-w-5xl mx-auto text-center about-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          id="about-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          About Me
        </motion.h2>

        <motion.p
          id="about-description"
          className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          I'm Yash Nigam, a passionate B.Sc. Electronics student at Sri Venkateswara College, University of Delhi, graduating in 2026. As a Frontend Developer and Creative Technologist, I blend technology and creativity to build immersive digital experiences. My journey is fueled by innovation, from crafting elegant web interfaces to exploring 3D modeling and IoT solutions.
        </motion.p>

        {/* Education Section */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900">B.Sc. (H) Electronics</h3>
            <p className="text-sm text-gray-700 mt-2">Sri Venkateswara College, University of Delhi</p>
            <p className="text-sm text-gray-700">2023 – 2026 | 6.45 CGPA</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900">High School</h3>
            <p className="text-sm text-gray-700 mt-2">Kendriya Vidyalaya, Delhi</p>
            <p className="text-sm text-gray-700">Class XII (2022): 78% | Class X (2020): 79%</p>
          </div>
        </motion.div>

        <motion.a
          href="#skills"
          onClick={(e) => handleNavClick(e, "#skills")}
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/90 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explore my skills"
        >
          Explore My Skills
        </motion.a>
      </motion.div>
    </section>
  );
}