import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const overlayRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.5 });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    if (!isInView || !aboutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.4)",
          stagger: 0.25,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        overlayRef.current,
        { y: -50 },
        {
          y: 50,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert(); // cleans all effects within context
  }, [isInView]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="about-title"
      aria-describedby="about-description"
    >
      {/* Parallax Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-gray-100/20 to-white/50 backdrop-blur-xl"
        aria-hidden="true"
      />

      <motion.div
        className="about-content relative z-10 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          id="about-title"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          About Me
        </motion.h2>

        <motion.p
          id="about-description"
          className="mt-8 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          I'm <strong className="text-gray-900">Yash Nigam</strong>, a B.Sc. Electronics student at Sri Venkateswara College, University of Delhi (Graduating 2026). As a <strong>Frontend Developer</strong> and <strong>Creative Technologist</strong>, I thrive on blending creativity with technology to craft immersive, aesthetic digital experiences. From elegant web design to interactive 3D visuals and IoT integrations, my projects reflect curiosity and innovation.
        </motion.p>

        {/* Education Cards */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* College Card */}
          <motion.div
            className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white/20"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              B.Sc. (H) Electronics
            </h3>
            <p className="text-sm text-gray-700 mt-3">
              Sri Venkateswara College, University of Delhi
            </p>
            <p className="text-sm text-gray-700">2023 – 2026 | 6.45 CGPA</p>
          </motion.div>

          {/* High School Card */}
          <motion.div
            className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white/20"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              High School
            </h3>
            <p className="text-sm text-gray-700 mt-3">Kendriya Vidyalaya, Delhi</p>
            <p className="text-sm text-gray-700">
              Class XII (2022): 78% <br />
              Class X (2020): 79%
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#skills"
          onClick={(e) => handleNavClick(e, "#skills")}
          className="mt-12 inline-block px-10 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white hover:bg-gray-900 hover:text-white transition-all shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#111827",
            color: "#fff",
          }}
          whileTap={{ scale: 0.94 }}
          aria-label="Explore my skills"
        >
          Explore My Skills
        </motion.a>
      </motion.div>
    </section>
  );
}
