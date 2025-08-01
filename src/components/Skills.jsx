import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";

export default function Skills() {
  const scrollerRef = useRef(null);
  const canvasRef = useRef(null);

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

  const infiniteSkills = useMemo(() => [...skills, ...skills], [skills]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });

    // Particle background (same as Hero)
    let scene, camera, renderer, particles;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, 500);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const particleCount = 300;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 4;
        positions[i + 2] = (Math.random() - 0.5) * 8;

        const color = new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.7, 0.5);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const animate = () => {
        if (particles) {
          particles.rotation.y += 0.0008;
          particles.rotation.x += 0.0003;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    } catch (err) {
      console.error("Particle error:", err);
    }

    return () => {
      if (renderer) renderer.dispose();
      if (scene && particles) scene.remove(particles);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-[70vh] py-28 bg-gradient-to-b from-white to-gray-100 overflow-hidden font-[Glory]"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-[500px] w-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Heading */}
      <div className="text-center mb-16 z-20 relative">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
          Skills Snapshot
        </h2>
        <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide">
          Clean, effective, and ever-evolving — blending logic, creativity, and craftsmanship.
        </p>
      </div>

      {/* Infinite Scroller */}
      <div className="relative overflow-hidden w-full z-20">
        <div
          ref={scrollerRef}
          className="flex w-max gap-6 items-stretch filter blur-[0.3px]"
        >
          {infiniteSkills.map((group, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-72 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-xl p-6 shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                {group.category}
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-700 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20 z-20 relative">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block px-10 py-4 text-white text-base lg:text-lg font-semibold bg-gray-900 rounded-full hover:scale-105 transition-all duration-300 shadow-md"
        >
          View Projects →
        </a>
      </div>
    </section>
  );
}
