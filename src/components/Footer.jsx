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
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-white py-12 px-4 text-gray-800"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white to-gray-50 opacity-50" />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Get in Touch
        </motion.h2>
        <motion.div
          className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <FaPhone className="text-lg text-gray-600" aria-hidden="true" />
            <a
              href="tel:+919810379355"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              aria-label="Phone number: +91-9810379355"
            >
              (+91)-9810379355
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-lg text-gray-600" aria-hidden="true" />
            <a
              href="mailto:nigam.yash7070@gmail.com"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              aria-label="Email: nigam.yash7070@gmail.com"
            >
              nigam.yash7070@gmail.com
            </a>
          </div>
        </motion.div>
        <motion.div
          className="mt-6 flex justify-center gap-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://linkedin.com/in/yashnigam04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="text-2xl" />
          </motion.a>
          <motion.a
            href="https://github.com/yashnigam07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub profile"
          >
            <FaGithub className="text-2xl" />
          </motion.a>
        </motion.div>
        <motion.p
          className="mt-8 text-sm text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          © {new Date().getFullYear()} Yash Nigam. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}