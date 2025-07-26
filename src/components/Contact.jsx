import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      contactRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
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

    // Clear status message after 5 seconds
    setTimeout(() => setFormStatus(null), 5000);
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.98 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-b from-gray-100 to-white"
      aria-labelledby="contact-title"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-gray-100/15 to-white/65 backdrop-blur-md" />

      {/* Contact Content */}
      <motion.div
        className="z-10 max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          id="contact-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          I'm excited to connect and explore opportunities to collaborate on innovative projects. Drop me a message!
        </motion.p>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 bg-white/40 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
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
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              placeholder="Your Name"
              aria-label="Name"
            />
          </motion.div>

          <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible" className="mt-4">
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
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              placeholder="Your Email"
              aria-label="Email"
            />
          </motion.div>

          <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className="mt-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              placeholder="Your Message"
              rows="4"
              aria-label="Message"
            />
          </motion.div>

          <motion.button
            type="submit"
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            className="mt-6 w-full px-4 py-2 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/85 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Submit message"
          >
            Send Message
          </motion.button>

          {/* Form Status Message */}
          <AnimatePresence>
            {formStatus && (
              <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`mt-4 p-3 rounded-md text-sm font-medium ${
                  formStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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