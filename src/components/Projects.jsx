import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Throttle function using requestAnimationFrame
function throttleRAF(func) {
  let running = false;
  return (...args) => {
    if (running) return;
    running = true;
    requestAnimationFrame(() => {
      func(...args);
      running = false;
    });
  };
}

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const isInView = useInView(projectsRef, { once: true, amount: 0.3 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  const projects = useMemo(
    () => [
      {
        title: "Stock Market Simulator",
        description: "Real-time trading platform with dynamic charts and API-driven data.",
        github: "https://github.com/yashnigam07/Stockmarket_simulator",
        technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "Alpha Vantage API"],
      },
      {
        title: "Quantum Harvester",
        description: "Immersive sci-fi game with interactive mechanics and sleek visuals.",
        github: "https://github.com/yashnigam07/Quantum-Harvester",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "Snake Game",
        description: "Reimagined classic with fluid controls and modern aesthetics.",
        github: "https://github.com/yashnigam07/Snake_game",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "Interstellar (Solar System)",
        description: "3D cosmic simulation with smooth animations and orbit mechanics.",
        github: "https://github.com/yashnigam07/Interstellar",
        live: "https://galaxy-lac-ten.vercel.app/",
        technologies: ["Three.js", "GSAP", "HTML", "CSS", "JavaScript"],
      },
      {
        title: "Translink",
        description: "Elegant logistics site with seamless animations and bold UI.",
        live: "https://translink-mu.vercel.app/",
        technologies: ["React", "Tailwind", "Vercel"],
      },
      {
        title: "Bluebox",
        description: "Experimental UI/UX with creative transitions and vibrant design.",
        live: "https://blue-box-nu.vercel.app/",
        technologies: ["React", "Tailwind", "Vercel"],
      },
    ],
    []
  );

  useEffect(() => {
    if (!isInView) return;

    let scene, camera, renderer, starfield, lines, uniforms;
    const scrollTriggers = [];

    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        return !!new THREE.WebGLRenderer().getContext();
      } catch (e) {
        console.error("WebGL support check failed:", e.message);
        return false;
      }
    };

    if (!checkWebGLSupport()) {
      setIsWebGLSupported(false);
      return;
    }

    try {
      // Initialize Three.js
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // Starfield configuration
      const isMobile = window.innerWidth < 768;
      const starCount = isMobile ? 200 : 500;
      const starConfig = {
        spread: 30,
        velocityScale: 0.01,
        pointSize: 2.5,
      };

      // Starfield geometry
      const starPositions = new Float32Array(starCount * 3);
      const starVelocities = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * starConfig.spread;
        starPositions[i + 1] = (Math.random() - 0.5) * starConfig.spread;
        starPositions[i + 2] = (Math.random() - 0.5) * (starConfig.spread / 2);
        starVelocities[i] = (Math.random() - 0.5) * starConfig.velocityScale;
        starVelocities[i + 1] = (Math.random() - 0.5) * starConfig.velocityScale;
        starVelocities[i + 2] = (Math.random() - 0.5) * (starConfig.velocityScale / 2);
        starColors[i] = starColors[i + 1] = starColors[i + 2] = Math.random() * 0.5 + 0.5; // Grayscale
      }

      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute("velocity", new THREE.BufferAttribute(starVelocities, 3));
      starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

      uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Color(0xaaaaaa) }, // Light gray
        uPulse: { value: 0 },
      };

      const starMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          attribute vec3 velocity;
          attribute vec3 color;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uPulse;
          varying vec3 vColor;
          void main() {
            vec3 pos = position + velocity * uTime;
            float dist = length(pos.xy - uMouse);
            pos.z += sin(dist * 1.5 - uTime) * 0.3;
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = ${starConfig.pointSize} + sin(dist + uPulse) * 2.0;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform vec3 uColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(vColor * uColor, 0.8 - dist * 0.5);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      starfield = new THREE.Points(starGeometry, starMaterial);
      scene.add(starfield);

      // Connecting lines
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(starCount * 6); // Lines between pairs
      const lineIndices = [];
      for (let i = 0; i < starCount; i++) {
        for (let j = i + 1; j < starCount; j++) {
          const dist = Math.sqrt(
            (starPositions[i * 3] - starPositions[j * 3]) ** 2 +
            (starPositions[i * 3 + 1] - starPositions[j * 3 + 1]) ** 2 +
            (starPositions[i * 3 + 2] - starPositions[j * 3 + 2]) ** 2
          );
          if (dist < 3) {
            lineIndices.push(i, j);
          }
        }
      }
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      lineGeometry.setIndex(lineIndices);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.3,
      });
      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      let frameId;
      const clock = new THREE.Clock();
      const animate = () => {
        if (!canvasRef.current) return;
        const delta = clock.getDelta();
        uniforms.uTime.value += delta;
        uniforms.uPulse.value = Math.sin(uniforms.uTime.value * 0.5) * 0.5 + 0.5;
        starfield.rotation.y += 0.0002;
        lines.rotation.y += 0.0002;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const mouse = new THREE.Vector2();
      const onMouseMove = throttleRAF((e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        uniforms.uMouse.value.set(mouse.x * 5, mouse.y * 4);
      });
      window.addEventListener("mousemove", onMouseMove);

      const onTouchMove = throttleRAF((e) => {
        if (e.touches.length > 0) {
          mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
          uniforms.uMouse.value.set(mouse.x * 5, mouse.y * 4);
        }
      });
      window.addEventListener("touchmove", onTouchMove);

      const onResize = throttleRAF(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      window.addEventListener("resize", onResize);

      // GSAP scroll-triggered animations
      scrollTriggers.push(
        gsap.to(starfield.rotation, {
          y: "+=0.4",
          x: "+=0.2",
          scrollTrigger: {
            trigger: projectsRef.current,
            scrub: 1.5,
            start: "top bottom",
            end: "bottom top",
          },
        })
      );

      scrollTriggers.push(
        gsap.to(lines.rotation, {
          y: "+=0.4",
          x: "+=0.2",
          scrollTrigger: {
            trigger: projectsRef.current,
            scrub: 1.5,
            start: "top bottom",
            end: "bottom top",
          },
        })
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        projectsRef.current.querySelectorAll(".projects-content > :first-child, .projects-content > :nth-child(2)"),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3,
        }
      );

      tl.fromTo(
        projectsRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 60, rotateY: 10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

      scrollTriggers.push(
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0.2 },
          {
            opacity: 0.5,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )
      );

      return () => {
        tl.kill();
        scrollTriggers.forEach((st) => st.scrollTrigger?.kill());
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("touchmove", onTouchMove);
        cancelAnimationFrame(frameId);
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
        }
        if (starGeometry) starGeometry.dispose();
        if (starMaterial) starMaterial.dispose();
        if (lineGeometry) lineGeometry.dispose();
        if (lineMaterial) lineMaterial.dispose();
        if (scene) {
          scene.remove(starfield);
          scene.remove(lines);
        }
      };
    } catch (err) {
      console.error("WebGL initialization failed:", err.message, err.stack);
      setIsWebGLSupported(false);
    }
  }, [isInView]);

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="projects-title"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Glory:wght@300;400;500;600;700&display=swap');
          
          .glory-font {
            font-family: 'Glory', sans-serif;
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .project-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-style: preserve-3d;
          }
          .project-card:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          }
          .holo-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(200, 200, 200, 0.3));
            border-radius: 12px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .project-card:hover .holo-overlay {
            opacity: 0.7;
          }
          .custom-cursor:hover ~ .project-card .holo-overlay {
            opacity: 0.5;
          }
        `}
      </style>
      {!isWebGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-300/60 animate-pulse" />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-auto"
        aria-hidden="true"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] bg-gradient-to-br from-white/10 via-gray-100/5 to-white/20 backdrop-blur-2xl transition-opacity duration-700"
      />
      <div className="absolute top-0 h-24 sm:h-32 w-full z-[2] bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 h-24 sm:h-32 w-full z-[2] bg-gradient-to-t from-gray-200 to-transparent pointer-events-none" />

      <motion.div
        className="z-[3] max-w-7xl mx-auto text-center projects-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <motion.h2
          id="projects-title"
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 glory-font"
        >
          Galactic Creations
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed glory-font"
        >
          Systems and simulations crafted with precision, orbiting the future of innovation.
        </motion.p>

        <motion.div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card relative bg-white/90 backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/50"
              whileHover={{
                scale: 1.03,
                rotateY: index % 2 === 0 ? 5 : -5,
                rotateX: 3,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              tabIndex={0}
              role="group"
              aria-label={`Project: ${project.title}`}
              aria-describedby={`project-desc-${index}`}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: index % 2 === 0 ? 5 : -5,
                  rotateX: 3,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 0,
                  rotateX: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <div className="holo-overlay" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 glory-font">{project.title}</h3>
              <p
                id={`project-desc-${index}`}
                className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed glory-font"
              >
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="text-xs text-gray-600 bg-gray-100/90 px-3 py-1 rounded-full glory-font"
                    whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="mt-5 flex gap-5">
                {project.github && (
                  <motion.a
                    href={project.github}
                    className="text-sm text-gray-600 hover:text-gray-900 underline glory-font focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                    whileHover={{ color: "#db2777" }} // Pink cursor accent
                  >
                    GitHub
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    className="text-sm text-gray-600 hover:text-gray-900 underline glory-font focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    whileHover={{ color: "#db2777" }}
                  >
                    Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#experience"
          className="mt-10 inline-block px-8 py-4 text-base sm:text-lg text-white font-semibold bg-gray-900 rounded-full shadow-xl hover:shadow-2xl glory-font focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explore my journey"
        >
          Explore My Journey
        </motion.a>
      </motion.div>
    </section>
  );
}