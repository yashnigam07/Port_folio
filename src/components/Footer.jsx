import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      footerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    return () => tl.kill();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-white py-16 px-4 sm:px-8 text-gray-800 shadow-inner"
    >
      {/* Background overlay with gradient & texture */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-white opacity-70 z-0" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Let's Connect
        </motion.h2>

        {/* Contact Info */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 text-gray-700"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 hover:text-gray-900 transition-colors">
            <FaPhone className="text-lg text-gray-600" />
            <a href="tel:+919810379355" aria-label="Phone">
              (+91)-9810379355
            </a>
          </div>
          <div className="flex items-center gap-3 hover:text-gray-900 transition-colors">
            <FaEnvelope className="text-lg text-gray-600" />
            <a href="mailto:nigam.yash7070@gmail.com" aria-label="Email">
              nigam.yash7070@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-8 flex justify-center gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.a
            href="https://linkedin.com/in/yashnigam04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-3xl" />
          </motion.a>
          <motion.a
            href="https://github.com/yashnigam07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.2, rotate: -5 }}
            aria-label="GitHub"
          >
            <FaGithub className="text-3xl" />
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="mt-10 text-sm text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          © {new Date().getFullYear()} Yash Nigam. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}
