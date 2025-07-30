import { useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const skillsRef = useRef(null);
  const overlayRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.4 });

  const skills = useMemo(() => [
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
  ], []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isInView) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      skillsRef.current.querySelectorAll(".skills-content > :first-child, .skills-content > :nth-child(2)"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.4)", stagger: 0.25 }
    );

    tl.fromTo(
      skillsRef.current.querySelectorAll(".skill-card"),
      { opacity: 0, y: 50, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)" },
      "-=0.6"
    );

    gsap.fromTo(
      overlayRef.current,
      { y: -50 },
      {
        y: 50,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    // GSAP hover animation on skill items
    const skillItems = skillsRef.current.querySelectorAll(".skill-item");

    const hoverEnter = (e) =>
      gsap.to(e.currentTarget, { x: 10, scale: 1.05, duration: 0.4, ease: "back.out(1.4)" });
    const hoverLeave = (e) =>
      gsap.to(e.currentTarget, { x: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" });

    skillItems.forEach((item) => {
      item.addEventListener("mouseenter", hoverEnter);
      item.addEventListener("mouseleave", hoverLeave);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      skillItems.forEach((item) => {
        item.removeEventListener("mouseenter", hoverEnter);
        item.removeEventListener("mouseleave", hoverLeave);
      });
    };
  }, [isInView]);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="skills-title"
      aria-describedby="skills-description"
    >
      {/* Background Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/25 via-gray-100/15 to-white/50 backdrop-blur-xl"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="z-10 max-w-7xl mx-auto text-center skills-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          id="skills-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          My Skills
        </motion.h2>

        <motion.p
          id="skills-description"
          className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto tracking-wide font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          A versatile skill set spanning programming, web development, design, 3D modeling, and creative tools—backed by strong problem-solving and adaptability.
        </motion.p>

        {/* Skill Cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {skills.map((group, index) => (
            <motion.div
              key={index}
              className="skill-card relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-white/20"
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? 1 : -1,
                boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              role="group"
              tabIndex={0}
              aria-label={`Skills in ${group.category}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-white/10 rounded-2xl" />
              <h3 className="relative text-lg font-semibold text-gray-900 tracking-tight mb-5">
                {group.category}
              </h3>
              <ul className="relative text-sm text-gray-700 space-y-3">
                {group.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="skill-item flex items-center cursor-default"
                    tabIndex={0}
                  >
                    <span className="w-2.5 h-2.5 bg-gray-600 rounded-full mr-3.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.a
          href="#projects"
          onClick={(e) => handleNavClick(e, "#projects")}
          className="mt-12 inline-block px-10 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:text-white transition-all duration-400 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            background: "linear-gradient(to right, #1f2937, #374151)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
            rotate: 1,
          }}
          whileTap={{ scale: 0.92 }}
        >
          View My Projects
        </motion.a>
      </motion.div>
    </section>
  );
}
