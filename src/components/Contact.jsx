import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const overlayRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const contactEl = contactRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      contactEl.querySelectorAll(".contact-content > :first-child, .contact-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Animate form fields
    tl.fromTo(
      contactEl.querySelectorAll(".contact-form > div, .contact-form > button"),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" },
      "-=0.5"
    );

    // Parallax effect for overlay
    gsap.fromTo(
      overlayRef.current,
      { y: -30 },
      {
        y: 30,
        scrollTrigger: {
          trigger: contactEl,
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xdkdgzyp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus({ type: "error", message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      setFormStatus({ type: "error", message: "An error occurred. Please try again later." });
    }

    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="contact-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
      />

      {/* Contact Content */}
      <motion.div
        className="z-10 max-w-lg mx-auto text-center contact-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="contact-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          I'm excited to connect and explore opportunities to collaborate on innovative projects. Drop me a message!
        </motion.p>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="contact-form mt-12 bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-200/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-500 transition-all duration-300"
                placeholder="Your Name"
                aria-label="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-500 transition-all duration-300"
                placeholder="Your Email"
                aria-label="Your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-gray-500 transition-all duration-300"
                placeholder="Your Message"
                rows="4"
                aria-label="Your message"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-3 rounded-full border border-gray-800 text-gray-800 font-semibold bg-white/90 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              aria-label="Submit contact form"
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Form Status Message */}
          <AnimatePresence>
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`mt-4 p-3 rounded-md text-sm font-medium ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
                role="alert"
                aria-live="polite"
              >
                {formStatus.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </section>
  );
}