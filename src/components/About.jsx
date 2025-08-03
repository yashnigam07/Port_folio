import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Custom throttle function
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (!timeout) {
      timeout = setTimeout(later, wait);
      func(...args);
    }
  };
}

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const ctaRef = useRef(null);
  const cardTweens = useRef([]);
  const ctaTween = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Utility to split text into words with spans
  const splitIntoWords = (text, className) =>
    text.split(" ").map((word, index) => (
      <span
        key={`${className}-${index}`}
        className={`${className} inline-block font-glory`}
        style={{ fontWeight: 300 }} // Initial light weight
        aria-hidden={className === "description-word" ? "true" : undefined}
      >
        {word}&nbsp;
      </span>
    ));

  const headingText = "About Me";
  const descriptionText =
    "I'm Yash Nigam, a B.Sc. Electronics student at Sri Venkateswara College, University of Delhi (Graduating 2026). As a Frontend Developer and Creative Technologist, I thrive on blending creativity with technology to craft immersive, aesthetic digital experiences. From elegant web design to interactive 3D visuals and IoT integrations, my projects reflect curiosity and innovation.";

  useLayoutEffect(() => {
    if (!isInView || !aboutRef.current) return;

    const ctx = gsap.context(() => {
      // Content stagger animation
      gsap.fromTo(
        ".about-content > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Word-by-word font weight animation
      gsap.fromTo(
        ".heading-word",
        { fontWeight: 300 },
        {
          fontWeight: 800,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "70% center", // Complete at 70% section visibility
            scrub: 1,
            pinSpacing: false,
          },
        }
      );

      gsap.fromTo(
        ".description-word",
        { fontWeight: 300 },
        {
          fontWeight: 800,
          duration: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "70% center", // Complete at 70% section visibility
            scrub: 1,
            pinSpacing: false,
          },
        }
      );

      // Parallax overlay
      gsap.fromTo(
        overlayRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Initialize card tweens
      cardTweens.current = gsap.utils.toArray(".education-card").map((card, index) =>
        gsap.to(card, {
          scale: 1.05,
          rotate: index % 2 === 0 ? 2 : -2,
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out",
          paused: true,
        })
      );

      // Initialize CTA tween
      ctaTween.current = gsap.to(ctaRef.current, {
        scale: 1.05,
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        backgroundColor: "#111827",
        color: "#fff",
        duration: 0.3,
        ease: "power2.out",
        paused: true,
      });
    }, aboutRef);

    return () => ctx.revert();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !isWebGLSupported) return;

    // WebGL Particle System
    let scene, camera, renderer, particles, uniforms;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 50 : 150;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 6;
        positions[i + 2] = (Math.random() - 0.5) * 8;
        velocities[i] = (Math.random() - 0.5) * 0.005;
        velocities[i + 1] = (Math.random() - 0.5) * 0.005;
        velocities[i + 2] = (Math.random() - 0.5) * 0.005;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

      uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Color(0x999999) },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          attribute vec3 velocity;
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec3 vColor;
          void main() {
            vec3 pos = position + velocity * uTime;
            float dist = length(pos.xy - uMouse);
            pos.z += sin(dist * 1.5 - uTime) * 0.15;
            vColor = vec3(0.6, 0.6, 0.6);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 1.5 + sin(dist * 1.5) * 1.0;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform vec3 uColor;
          void main() {
            gl_FragColor = vec4(vColor * uColor, 0.6);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let frameId;
      const clock = new THREE.Clock();
      const animate = () => {
        if (!canvasRef.current) return;
        const delta = clock.getDelta();
        uniforms.uTime.value += delta;
        particles.rotation.y += 0.0002;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const mouse = new THREE.Vector2();
      const onMouseMove = throttle((e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        uniforms.uMouse.value.set(mouse.x * 5, mouse.y * 4);
      }, 16);
      window.addEventListener("mousemove", onMouseMove);

      const onResize = throttle(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
      window.addEventListener("resize", onResize);

      gsap.to(particles.rotation, {
        y: "+=0.2",
        x: "+=0.1",
        scrollTrigger: {
          trigger: aboutRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
      });

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(frameId);
        if (renderer) renderer.dispose();
        if (scene && particles) scene.remove(particles);
      };
    } catch (err) {
      console.error("WebGL error:", err);
      setIsWebGLSupported(false);
    }
  }, [isInView, isWebGLSupported]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white to-gray-100 overflow-hidden"
      aria-labelledby="about-title"
      aria-describedby="about-description"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Glory:wght@300;400;600;800&display=swap');
          .font-glory {
            font-family: 'Glory', sans-serif;
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      </style>

      {/* Fallback background if WebGL fails */}
      {!isWebGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 animate-pulse" />
      )}

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[0] pointer-events-none"
        aria-hidden="true"
      />

      {/* Parallax Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] bg-gradient-to-b from-white/40 via-gray-100/30 to-white/50 backdrop-blur-lg"
        aria-hidden="true"
      />

      <motion.div
        className="about-content relative z-[2] max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <motion.h2
          id="about-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-glory font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          {splitIntoWords(headingText, "heading-word")}
        </motion.h2>

        <motion.p
          id="about-description"
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-glory font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {splitIntoWords(descriptionText, "description-word")}
        </motion.p>

        {/* Education Cards */}
        <motion.div
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* College Card */}
          <motion.div
            className="education-card relative bg-white/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 transition-all"
            onMouseEnter={(e) => cardTweens.current[0]?.play()}
            onMouseLeave={(e) => cardTweens.current[0]?.reverse()}
            role="region"
            aria-labelledby="college-title"
          >
            <h3 id="college-title" className="text-base sm:text-lg font-glory font-semibold text-gray-900 tracking-tight">
              B.Sc. (H) Electronics
            </h3>
            <p className="text-sm text-gray-700 mt-2 font-glory">
              Sri Venkateswara College, University of Delhi
            </p>
            <p className="text-sm text-gray-700 font-glory">2023 – 2026 | 6.45 CGPA</p>
          </motion.div>

          {/* High School Card */}
          <motion.div
            className="education-card relative bg-white/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/30 transition-all"
            onMouseEnter={(e) => cardTweens.current[1]?.play()}
            onMouseLeave={(e) => cardTweens.current[1]?.reverse()}
            role="region"
            aria-labelledby="highschool-title"
          >
            <h3 id="highschool-title" className="text-base sm:text-lg font-glory font-semibold text-gray-900 tracking-tight">
              High School
            </h3>
            <p className="text-sm text-gray-700 mt-2 font-glory">Kendriya Vidyalaya, Delhi</p>
            <p className="text-sm text-gray-700 font-glory">
              Class XII (2022): 78% <br />
              Class X (2020): 79%
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          ref={ctaRef}
          href="#skills"
          onClick={(e) => handleNavClick(e, "#skills")}
          className="mt-10 sm:mt-12 inline-block px-8 py-3 sm:px-10 sm:py-4 rounded-full border border-gray-900 text-gray-900 text-sm sm:text-base font-glory font-semibold bg-white/80 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          onMouseEnter={() => ctaTween.current?.play()}
          onMouseLeave={() => ctaTween.current?.reverse()}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          aria-label="Explore my skills"
        >
          Explore My Skills
        </motion.a>
      </motion.div>
    </section>
  );
}