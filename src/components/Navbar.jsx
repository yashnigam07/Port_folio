import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl"
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <div className="bg-white/15 backdrop-blur-2xl rounded-full px-8 py-4 shadow-2xl flex justify-between items-center transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-white/20">
        {/* Logo */}
        <motion.div
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#hero"
            tabIndex={0}
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-2xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors duration-300"
            aria-label="Go to Home"
          >
            Portfolio
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-10">
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a
                href={item.href}
                className="text-sm font-medium text-gray-900 relative group tracking-wide"
                whileHover={{ y: -4, color: "#374151" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                <motion.span
                  className="absolute left-0 bottom-[-8px] w-full h-0.5 bg-gray-700 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Button */}
        <motion.button
          ref={buttonRef}
          className="lg:hidden p-3 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 relative overflow-hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-gray-200/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <svg
            className={`w-7 h-7 text-gray-900 z-10 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Menu */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="lg:hidden mt-4 bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-50"
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ul className="flex flex-col items-center py-8 space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    className="w-full"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={item.href}
                      className="block py-3 px-10 text-base font-medium text-gray-900 hover:bg-white/30 w-full text-center transition-all duration-300 hover:text-gray-700 tracking-wide"
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-label={item.label}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
