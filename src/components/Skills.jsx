import { useEffect, useRef, useMemo } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import * as THREE from "three";

export default function Skills() {
  const scrollerRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const skills = useMemo(
    () => [
      {
        category: "Programming",
        items: [
          { name: "C", icon: "simple-icons:c" },
          { name: "C++", icon: "simple-icons:cplusplus" },
          { name: "Python", icon: "logos:python" },
          { name: "R", icon: "simple-icons:r" },
          { name: "LaTeX", icon: "simple-icons:latex" },
        ],
      },
      {
        category: "Frontend",
        items: [
          { name: "HTML", icon: "vscode-icons:file-type-html" },
          { name: "CSS", icon: "vscode-icons:file-type-css" },
          { name: "JavaScript", icon: "logos:javascript" },
          { name: "React", icon: "logos:react" },
          { name: "Tailwind", icon: "logos:tailwindcss-icon" },
          { name: "Flutter", icon: "logos:flutter" },
        ],
      },
      {
        category: "Backend",
        items: [
          { name: "Django", icon: "logos:django" },
          { name: "Node.js", icon: "logos:nodejs-icon" },
        ],
      },
      {
        category: "Databases",
        items: [{ name: "MySQL", icon: "logos:mysql" }],
      },
      {
        category: "Version Control",
        items: [
          { name: "Git", icon: "logos:git-icon" },
          { name: "GitHub", icon: "logos:github-icon" },
        ],
      },
      {
        category: "AI Tools",
        items: [
          { name: "ChatGPT", icon: "logos:openai-icon" },
          { name: "Midjourney", icon: "fluent:paint-brush-20-regular" },
          { name: "Copilot", icon: "devicon:githubcopilot" },
        ],
      },
      {
        category: "3D & Design",
        items: [
          { name: "Fusion 360", icon: "mdi:engine-outline" },
          { name: "Figma", icon: "logos:figma" },
          { name: "Wix", icon: "logos:wix" },
        ],
      },
      {
        category: "Soft Skills",
        items: [
          { name: "Problem Solving", icon: "material-symbols:psychology-alt-rounded" },
          { name: "Time Management", icon: "mdi:clock-time-eight-outline" },
          { name: "Adaptability", icon: "mdi:progress-clock" },
        ],
      },
    ],
    []
  );

  const infiniteSkills = useMemo(() => [...skills, ...skills], [skills]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // GSAP infinite scroll with pause on hover
    const scrollTl = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });

    el.addEventListener("mouseenter", () => scrollTl.pause());
    el.addEventListener("mouseleave", () => scrollTl.resume());

    // WebGL particle system with custom shader
    let scene, camera, renderer, particles;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });

      const updateRendererSize = () => {
        const width = window.innerWidth;
        const height = Math.min(600, window.innerHeight * 0.5);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      updateRendererSize();

      window.addEventListener("resize", updateRendererSize);

      const particleCount = 150; // Further optimized
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const time = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 12;
        positions[i + 1] = (Math.random() - 0.5) * 6;
        positions[i + 2] = (Math.random() - 0.5) * 12;

        const color = new THREE.Color().setHSL(Math.random() * 0.3 + 0.4, 0.9, 0.7);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        sizes[i / 3] = Math.random() * 0.05 + 0.02;
        time[i / 3] = Math.random() * 100;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("time", new THREE.BufferAttribute(time, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute float time;
          varying vec3 vColor;
          uniform float uTime;
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.y += sin(time + uTime * 0.5) * 0.2;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(vColor, 0.8 * (1.0 - dist * 2.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const clock = new THREE.Clock();
      const animate = () => {
        material.uniforms.uTime.value = clock.getElapsedTime();
        particles.rotation.y += 0.0004;
        particles.rotation.x += 0.0002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      // Mouse interaction
      const handleMouseMove = (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        gsap.to(particles.rotation, {
          x: mouseY * 0.4,
          y: mouseX * 0.6,
          duration: 1.2,
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("resize", updateRendererSize);
        window.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", () => scrollTl.pause());
        el.removeEventListener("mouseleave", () => scrollTl.resume());
        if (renderer) renderer.dispose();
        if (scene && particles) scene.remove(particles);
      };
    } catch (err) {
      console.error("Particle error:", err);
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-[80vh] py-20 bg-gradient-to-b from-gray-50 to-gray-300 overflow-hidden font-[Glory] sm:py-28"
      aria-labelledby="skills-heading"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-[600px] w-full pointer-events-none z-0 opacity-75"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      <motion.div
        className="text-center mb-12 sm:mb-16 z-20 relative"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 id="skills-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Skills Snapshot
        </h2>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide">
          A curated showcase of technical expertise, creative design, and strategic problem-solving.
        </p>
      </motion.div>

      <div className="relative overflow-hidden w-full z-20 px-4 sm:px-6">
        <div
          ref={scrollerRef}
          className="flex w-max gap-4 sm:gap-6 items-stretch"
          role="region"
          aria-label="Skills carousel"
        >
          {infiniteSkills.map((group, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-60 sm:w-72 rounded-2xl border border-gray-200 bg-white/85 backdrop-blur-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{ y: parallaxY }}
              whileHover={{ scale: 1.06, rotate: 1.5 }}
              whileTap={{ scale: 0.97 }}
              role="group"
              aria-label={`Skill category: ${group.category}`}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                {group.category}
              </h3>
              <ul className="space-y-3 text-gray-700">
                {group.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-sm sm:text-base font-medium"
                    whileHover={{ x: 6, color: "#1f2937" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      icon={item.icon}
                      className="w-5 h-5 text-gray-700 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="text-center mt-16 sm:mt-20 z-20 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold bg-gray-900 rounded-full hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
          aria-label="View projects section"
        >
          Explore Projects →
        </a>
      </motion.div>
    </section>
  );
}