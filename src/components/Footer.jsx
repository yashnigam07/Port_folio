import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const footerEl = footerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading
    tl.fromTo(
      footerEl.querySelector(".footer-content > :first-child"),
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate contact info and social links
    tl.fromTo(
      footerEl.querySelectorAll(".footer-content > :nth-child(2), .footer-content > :nth-child(3)"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power3.out" },
      "-=0.5"
    );

    // Animate copyright
    tl.fromTo(
      footerEl.querySelector(".footer-content > :last-child"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    );

    // Parallax effect for overlay
    gsap.fromTo(
      overlayRef.current,
      { y: -30 },
      {
        y: 30,
        scrollTrigger: {
          trigger: footerEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="footer-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
      />

      {/* Footer Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center footer-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="footer-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Let's Connect
        </motion.h2>

        {/* Contact Info */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <motion.a
            href="tel:+919810379355"
            className="flex items-center gap-3 text-sm font-medium hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Phone number: (+91)-9810379355"
          >
            <FaPhone className="text-lg text-gray-600" />
            (+91)-9810379355
          </motion.a>
          <motion.a
            href="mailto:nigam.yash7070@gmail.com"
            className="flex items-center gap-3 text-sm font-medium hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email: nigam.yash7070@gmail.com"
          >
            <FaEnvelope className="text-lg text-gray-600" />
            nigam.yash7070@gmail.com
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <motion.a
            href="https://linkedin.com/in/yashnigam04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visit Yash Nigam's LinkedIn profile"
          >
            <FaLinkedin className="text-3xl" />
          </motion.a>
          <motion.a
            href="https://github.com/yashnigam07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visit Yash Nigam's GitHub profile"
          >
            <FaGithub className="text-3xl" />
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="mt-8 text-sm text-gray-500 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          © {new Date().getFullYear()} Yash Nigam. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}