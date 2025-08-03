import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    if (!timeout) {
      func(...args);
      timeout = setTimeout(() => (timeout = null), wait);
    }
  };
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.2 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  const fullSubtitle = "Frontend Developer & Creative Technologist — crafting immersive digital experiences.";

  useEffect(() => {
    if (!isInView) return;

    // Typing animation
    let index = 0;
    const intervalId = setInterval(() => {
      if (subtitleRef.current && index <= fullSubtitle.length) {
        subtitleRef.current.textContent = fullSubtitle.slice(0, index++);
      } else {
        clearInterval(intervalId);
        gsap.to(".cursor", { opacity: 0, duration: 0.3 });
      }
    }, 25);

    // WebGL setup
    let scene, camera, renderer, particles, uniforms, frameId;

    try {
      const testCanvas = document.createElement("canvas");
      if (!testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl")) {
        setIsWebGLSupported(false);
        return;
      }

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const count = window.innerWidth < 768 ? 100 : 250;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 5;
        positions[i + 2] = (Math.random() - 0.5) * 6;
        velocities[i] = (Math.random() - 0.5) * 0.01;
        velocities[i + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

      uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Color(0.7, 0.7, 0.7) },
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
            pos.z += sin(dist * 2.0 - uTime) * 0.2;
            vColor = vec3(0.6);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 2.0 + sin(dist * 2.0) * 1.5;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform vec3 uColor;
          void main() {
            gl_FragColor = vec4(vColor * uColor, 0.7);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const clock = new THREE.Clock();
      const animate = () => {
        uniforms.uTime.value += clock.getDelta();
        particles.rotation.y += 0.0003;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const mouse = new THREE.Vector2();
      const onMouseMove = throttle((e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        uniforms.uMouse.value.set(mouse.x * 4, mouse.y * 3);
      }, 16);
      window.addEventListener("mousemove", onMouseMove);

      const onResize = throttle(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 200);
      window.addEventListener("resize", onResize);

      gsap.to(particles.rotation, {
        y: "+=0.3",
        x: "+=0.15",
        scrollTrigger: {
          trigger: heroRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
      });

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        if (renderer) renderer.dispose();
        if (scene && particles) scene.remove(particles);
      };
    } catch (err) {
      console.error("WebGL error:", err);
      setIsWebGLSupported(false);
    }
  }, [isInView]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100 overflow-hidden"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Glory:wght@300;400;600;800&display=swap');
          .font-glory {
            font-family: 'Glory', sans-serif;
            font-synthesis: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      </style>

      {!isWebGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-300/50 animate-pulse" />
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 h-20 sm:h-28 w-full z-[2] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 h-20 sm:h-28 w-full z-[2] bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />

      <motion.div
        className="z-[3] max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-glory font-extrabold tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          role="heading"
          aria-level="1"
        >
          Yash Nigam
        </motion.h1>

        <div className="mt-3 sm:mt-5 flex items-center justify-center">
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-glory max-w-2xl mx-auto leading-relaxed"
            aria-live="polite"
          />
          <span className="cursor text-pink-600 font-mono text-base sm:text-lg ml-1 animate-pulse">|</span>
        </div>

        <motion.a
          ref={ctaRef}
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 sm:mt-8 inline-block px-6 py-2 sm:px-8 sm:py-3 text-white text-sm sm:text-base font-semibold bg-gray-900 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl font-glory focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Explore my projects"
        >
          Discover My Work
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-[3]"
        animate={{ y: [0, 12, 0], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="w-6 h-12 border-2 border-gray-700 rounded-full flex items-start justify-center bg-white/20 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-1.5 mt-2 bg-gray-700 rounded-full shadow-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
