import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      projectsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
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
      className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-b from-gray-100 to-white"
      aria-labelledby="projects-title"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-gray-100/15 to-white/65 backdrop-blur-md" />

      {/* Projects Content */}
      <motion.div
        className="z-10 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          id="projects-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Explore a collection of my work, showcasing my skills in web development, game design, and 3D simulations, built with modern technologies and creative innovation.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              role="group"
              aria-label={`Project: ${project.title}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{project.description}</p>
              <ul className="mt-3 text-sm text-gray-600 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <li key={i} className="bg-gray-200/50 rounded-full px-3 py-1 text-xs">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex space-x-4">
                {project.github && (
                  <a
                    href={project.github}
                    className="text-gray-900 hover

:text-gray-700 text-sm font-medium"
                    aria-label={`View ${project.title} on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="text-gray-900 hover:text-gray-700 text-sm font-medium"
                    aria-label={`View live demo of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#experience"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/85 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explore my experience"
        >
          Explore My Experience
        </motion.a>
      </motion.div>
    </section>
  );
}