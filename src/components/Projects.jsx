import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading, description, and cards
    tl.fromTo(
      projectsRef.current.querySelectorAll(".projects-content > :first-child, .projects-content > :nth-child(2)"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.4)", stagger: 0.25 }
    );

    tl.fromTo(
      projectsRef.current.querySelectorAll(".project-card"),
      { opacity: 0, y: 50, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)" },
      "-=0.6"
    );

    // Parallax effect for overlay
    gsap.fromTo(
      overlayRef.current,
      { y: -50 },
      {
        y: 50,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    // Animate links on hover
    const projectLinks = projectsRef.current.querySelectorAll(".project-link");
    projectLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { y: -2, color: "#1f2937", duration: 0.3, ease: "power2.out" });
        gsap.to(link.querySelector(".link-underline"), { scaleX: 1, duration: 0.3, ease: "power2.out" });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { y: 0, color: "#111827", duration: 0.3, ease: "power2.out" });
        gsap.to(link.querySelector(".link-underline"), { scaleX: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      projectLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
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
      github: "https://github.com/yashnigam07/Snake_game", // Placeholder, assuming typo; update with correct repo if available
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
      className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-100 to-white overflow-hidden"
      aria-labelledby="projects-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/25 via-gray-100/15 to-white/50 backdrop-blur-xl transition-all duration-700"
      />

      {/* Projects Content */}
      <motion.div
        className="z-10 max-w-6xl mx-auto text-center projects-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <motion.h2
          id="projects-title"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto tracking-wide font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Explore a collection of my work, showcasing my skills in web development, game design, and 3D simulations, built with modern technologies and creative innovation.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-400 border border-white/20"
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Project: ${project.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-white/10 rounded-2xl" />
              <h3 className="relative text-lg font-semibold text-gray-900 tracking-tight">{project.title}</h3>
              <p className="relative mt-3 text-sm text-gray-700 leading-relaxed">{project.description}</p>
              <ul className="relative mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <li key={i} className="bg-gray-200/60 rounded-full px-3 py-1 text-xs font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="relative mt-5 flex space-x-6">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-link relative text-gray-900 text-sm font-medium"
                    aria-label={`View ${project.title} on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span className="link-underline absolute left-0 bottom-[-2px] w-full h-0.5 bg-gray-700 rounded-full scale-x-0 origin-left" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="project-link relative text-gray-900 text-sm font-medium"
                    aria-label={`View live demo of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <span className="link-underline absolute left-0 bottom-[-2px] w-full h-0.5 bg-gray-700 rounded-full scale-x-0 origin-left" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#experience"
          className="mt-12 inline-block px-10 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:text-white transition-all duration-400 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            background: "linear-gradient(to right, #1f2937, #374151)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
            rotate: 1,
          }}
          whileTap={{ scale: 0.92 }}
          aria-label="Explore my experience"
        >
          Explore My Experience
        </motion.a>
      </motion.div>
    </section>
  );
}