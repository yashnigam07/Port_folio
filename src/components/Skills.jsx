import { useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.4 });

  // Memoize skills array to prevent re-renders
  const skills = useMemo(
    () => [
      { category: "Programming", items: ["C", "Embedded C", "C++", "R", "Python", "LaTeX"] },
      { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "React", "Flutter"] },
      { category: "Backend", items: ["Django", "Node.js"] },
      { category: "Databases", items: ["MySQL"] },
      { category: "Version Control", items: ["Git", "GitHub"] },
      { category: "Python Libraries", items: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Tkinter", "Turtle"] },
      { category: "Design", items: ["Canva", "Figma"] },
      { category: "Website Builders", items: ["WordPress", "Wix"] },
      { category: "3D Modeling", items: ["Fusion 360", "Pronterface", "3D Slicer"] },
      { category: "AI Tools", items: ["ChatGPT", "Perplexity", "Claude", "Midjourney", "GitHub Copilot"] },
      { category: "Soft Skills", items: ["Problem Solving", "Adaptability", "Time Management", "Active Listening"] },
    ],
    []
  );

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
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate heading and description
      tl.fromTo(
        skillsRef.current.querySelectorAll(".skills-content > :first-child, .skills-content > :nth-child(2)"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }
      );

      // Animate skill cards
      tl.fromTo(
        skillsRef.current.querySelectorAll(".skill-card"),
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

      // Animate individual skill items on hover
      const skillItems = skillsRef.current.querySelectorAll(".skill-item");
      skillItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { x: 8, duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      return () => {
        tl.kill();
        skillItems.forEach((item) => {
          item.removeEventListener("mouseenter", () => {});
          item.removeEventListener("mouseleave", () => {});
        });
      };
    }
  }, [isInView]);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200"
      aria-labelledby="skills-title"
      aria-describedby="skills-description"
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/40 via-gray-100/20 to-white/60 backdrop-blur-lg transition-all duration-500" />

      {/* Skills Content */}
      <motion.div
        className="z-10 max-w-6xl mx-auto text-center skills-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          id="skills-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          My Skills
        </motion.h2>

        <motion.p
          id="skills-description"
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A versatile skill set spanning programming, web development, design, and 3D modeling, driven by strong problem-solving and adaptability.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              className="skill-card bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/50"
              whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Skills in ${skillGroup.category}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.focus()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{skillGroup.category}</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {skillGroup.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="skill-item flex items-center transition-colors duration-200"
                    whileHover={{ color: "#1f2937" }}
                    tabIndex={0}
                    role="listitem"
                    onKeyDown={(e) => e.key === "Enter" && e.currentTarget.focus()}
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#projects"
          onClick={(e) => handleNavClick(e, "#projects")}
          className="mt-12 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/90 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="View my projects"
        >
          View My Projects
        </motion.a>
      </motion.div>
    </section>
  );
}