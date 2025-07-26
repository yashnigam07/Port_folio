import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  // Handle smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // GSAP animation for navbar entrance
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: navRef.current,
          start: "top top",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="bg-white/20 backdrop-blur-xl rounded-full px-6 py-4 shadow-xl flex justify-between items-center transition-all duration-500 hover:shadow-2xl">
        {/* Logo/Brand */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#hero"
            className="text-xl font-extrabold text-gray-900 tracking-tight"
            aria-label="Brand logo"
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            Portfolio
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <motion.a
                href={item.href}
                className="text-sm font-semibold text-gray-900 relative group"
                whileHover={{ y: -2, color: "#4B5563" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label={item.label}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                <motion.span
                  className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-gray-700 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          ref={buttonRef}
          className="lg:hidden p-3 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-7 h-7 text-gray-900 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="lg:hidden mt-3 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ul className="flex flex-col items-center py-6 space-y-0">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  className="w-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ opacity: 0.5, duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="block py-2.5 px-8 text-base font-semibold text-gray-900 hover:bg-white/40 w-full text-center transition-all duration-300 hover:text-gray-800"
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-label={item.label}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}