import { useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const ref = useRef(null);
  const overlayRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isMobile = window.innerWidth < 640;

  const skills = useMemo(() => [
    { category: "Programming", items: ["C", "C++", "Python", "R", "LaTeX"] },
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Flutter"] },
    { category: "Backend", items: ["Django", "Node.js"] },
    { category: "Databases", items: ["MySQL"] },
    { category: "Version Control", items: ["Git", "GitHub"] },
    { category: "AI Tools", items: ["ChatGPT", "Midjourney", "Copilot"] },
    { category: "3D & Design", items: ["Fusion 360", "Figma", "Wix"] },
    { category: "Soft Skills", items: ["Problem Solving", "Time Management", "Adaptability"] },
  ], []);

  useEffect(() => {
    if (!isInView) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      ref.current.querySelectorAll(".skills-content > :first-child, .skills-content > :nth-child(2)"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 }
    );

    if (!isMobile) {
      tl.fromTo(
        ref.current.querySelectorAll(".skill-card"),
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" },
        "-=0.6"
      );
    }

    // Parallax overlay
    gsap.fromTo(
      overlayRef.current,
      { y: -30 },
      {
        y: 30,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isInView, isMobile]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen py-20 px-6 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
    >
      {/* Adaptive blur for larger screens only */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 z-0 bg-gradient-to-br from-white/25 via-gray-100/15 to-white/50 ${
          isMobile ? "" : "backdrop-blur-xl"
        }`}
        aria-hidden="true"
      />

      <motion.div
        className="z-10 max-w-6xl mx-auto text-center skills-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          My Skills
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-gray-700 font-medium max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Clean code meets creativity — a dynamic blend of frontend, backend, AI, and design.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {skills.map((group, index) => (
            <motion.div
              key={index}
              className="skill-card relative bg-white/50 rounded-xl p-6 text-left shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
              whileHover={!isMobile ? { scale: 1.05, rotate: index % 2 ? 1 : -1 } : {}}
              whileTap={{ scale: 0.97 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{group.category}</h3>
              <ul className="text-sm text-gray-800 space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-14 inline-block px-8 py-3 text-white bg-gray-900 rounded-full font-medium shadow hover:scale-105 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          See My Projects →
        </motion.a>
      </motion.div>
    </section>
  );
}
