import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const projectsEl = projectsRef.current;
    const overlayEl = overlayRef.current;
    const projectLinks = projectsEl.querySelectorAll(".project-link");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      projectsEl.querySelectorAll(".projects-content > :first-child, .projects-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Animate project cards
    tl.fromTo(
      projectsEl.querySelectorAll(".project-card"),
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
      "-=0.5"
    );

    // Parallax effect for overlay
    gsap.fromTo(
      overlayEl,
      { y: -30 },
      {
        y: 30,
        scrollTrigger: {
          trigger: projectsEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    // Link hover animations
    projectLinks.forEach((link) => {
      const underline = link.querySelector(".link-underline");
      const onEnter = () => gsap.to(link, { y: -2, color: "#1f2937", duration: 0.25, ease: "power2.out" });
      const onLeave = () => gsap.to(link, { y: 0, color: "#374151", duration: 0.25, ease: "power2.out" });
      const onEnterUnderline = () => gsap.to(underline, { scaleX: 1, duration: 0.25, ease: "power2.out" });
      const onLeaveUnderline = () => gsap.to(underline, { scaleX: 0, duration: 0.25, ease: "power2.out" });

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseenter", onEnterUnderline);
      link.addEventListener("mouseleave", onLeave);
      link.addEventListener("mouseleave", onLeaveUnderline);

      return () => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseenter", onEnterUnderline);
        link.removeEventListener("mouseleave", onLeave);
        link.removeEventListener("mouseleave", onLeaveUnderline);
      };
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const projects = [
    {
      title: "Stock Market Simulator",
      description: "A web-based stock trading simulator with candlestick charts, real-time data via Alpha Vantage API, and trading functionality, built using HTML, CSS, JavaScript, and Chart.js.",
      github: "https://github.com/yashnigam07/Stockmarket_simulator",
      live: "",
      technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Alpha Vantage API"],
    },
    {
      title: "Quantum Harvester",
      description: "A futuristic game-like application showcasing interactive gameplay and modern web technologies, designed for an engaging user experience.",
      github: "https://github.com/yashnigam07/Quantum-Harvester",
      live: "",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Snake Game",
      description: "A classic Snake game implementation with smooth controls and responsive design, built using web technologies for an engaging gaming experience.",
      github: "https://github.com/yashnigam07/Snake_game",
      live: "",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Interstellar (Solar System)",
      description: "A 3D solar system simulation with realistic planetary orbits and interactive controls, built using Three.js and GSAP, offering a visually stunning galaxy experience.",
      github: "https://github.com/yashnigam07/Interstellar", // Corrected placeholder
      live: "https://galaxy-lac-ten.vercel.app/",
      technologies: ["Three.js", "GSAP", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "Translink",
      description: "A web application deployed on Vercel, designed to provide a seamless user experience, possibly for transportation or link-sharing functionalities.",
      github: "",
      live: "https://translink01.vercel.app/",
      technologies: ["React", "Tailwind CSS", "Vercel"],
    },
    {
      title: "Bluebox",
      description: "A creative web project with a unique UI, exploring innovative design and interactivity, deployed on Vercel for a polished experience.",
      github: "",
      live: "https://blue-box-nu.vercel.app/",
      technologies: ["React", "Tailwind CSS", "Vercel"],
    },
  ];

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="projects-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
      />

      {/* Projects Content */}
      <motion.div
        className="z-10 max-w-7xl mx-auto text-center projects-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="projects-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover my portfolio of web development, game design, and 3D simulations, crafted with modern technologies and creative innovation.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card relative bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50"
              whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 0.5 : -0.5, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Project: ${project.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 to-white/10 rounded-xl -z-10" />
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <li
                    key={i}
                    className="bg-gray-200/80 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex space-x-4">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-link relative text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span className="link-underline absolute left-0 bottom-[-2px] w-full h-0.5 bg-gray-800 rounded-full scale-x-0 origin-left" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="project-link relative text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors"
                    aria-label={`View live demo of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <span className="link-underline absolute left-0 bottom-[-2px] w-full h-0.5 bg-gray-800 rounded-full scale-x-0 origin-left" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#experience"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-800 text-gray-800 font-semibold bg-white/90 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explore my experience"
        >
          Explore My Experience
        </motion.a>
      </motion.div>
    </section>
  );
}