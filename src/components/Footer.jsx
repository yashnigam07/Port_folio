import { useEffect, useRef } from "react";
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

    tl.fromTo(
      footerEl.querySelector("h2"),
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        footerEl.querySelector(".contact-info"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        footerEl.querySelector(".social-links"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        footerEl.querySelector("p"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

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
    <>
      {/* Glory Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Glory:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <footer
        ref={footerRef}
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden font-[Glory]"
        aria-labelledby="footer-title"
      >
        {/* Glass Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
        />

        {/* Footer Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center footer-content space-y-10">
          <h2
            id="footer-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          >
            Let's Connect
          </h2>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-gray-600 contact-info">
            <a
              href="tel:+919810379355"
              className="flex items-center gap-3 text-sm font-medium hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              aria-label="Phone number: (+91)-9810379355"
            >
              <FaPhone className="text-lg" />
              (+91)-9810379355
            </a>
            <a
              href="mailto:nigam.yash7070@gmail.com"
              className="flex items-center gap-3 text-sm font-medium hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              aria-label="Email: nigam.yash7070@gmail.com"
            >
              <FaEnvelope className="text-lg" />
              nigam.yash7070@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 social-links">
            <a
              href="https://linkedin.com/in/yashnigam04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300 transform hover:scale-125 hover:rotate-3"
              aria-label="Visit LinkedIn"
            >
              <FaLinkedin className="text-3xl" />
            </a>
            <a
              href="https://github.com/yashnigam07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300 transform hover:scale-125 hover:-rotate-3"
              aria-label="Visit GitHub"
            >
              <FaGithub className="text-3xl" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} Yash Nigam. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
