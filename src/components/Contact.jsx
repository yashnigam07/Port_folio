import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const overlayRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const contactEl = contactRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactEl,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      contactEl.querySelectorAll(".contact-content > :first-child, .contact-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate form fields
    tl.fromTo(
      contactEl.querySelectorAll(".contact-form > div, .contact-form > button"),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Parallax overlay animation
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({});
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
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="contact-title"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Glory:wght@300;400;500;600;700&display=swap');
          
          .glory-font {
            font-family: 'Glory', sans-serif;
          }
        `}
      </style>
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/15 via-gray-50/10 to-white/30 backdrop-blur-xl transition-opacity duration-500"
      />

      <motion.div
        className="z-10 max-w-lg mx-auto text-center contact-content space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="contact-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 glory-font"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed glory-font"
        >
          I'm excited to connect and explore opportunities to collaborate on innovative projects. Drop me a message!
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="contact-form mt-10 bg-white/80 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 glory-font">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`mt-1 w-full p-3 rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent placeholder-gray-500 transition-all duration-300 glory-font`}
                placeholder="Your Name"
                aria-label="Your name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-600 glory-font" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 glory-font">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`mt-1 w-full p-3 rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent placeholder-gray-500 transition-all duration-300 glory-font`}
                placeholder="Your Email"
                aria-label="Your email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600 glory-font" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 glory-font">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className={`mt-1 w-full p-3 rounded-md border ${errors.message ? 'border-red-300' : 'border-gray-300'} bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent placeholder-gray-500 transition-all duration-300 glory-font`}
                placeholder="Your Message"
                rows="4"
                aria-label="Your message"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-600 glory-font" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-3 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 glory-font"
              aria-label="Submit contact form"
            >
              Send Message
            </motion.button>
          </div>

          <AnimatePresence>
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`mt-4 p-3 rounded-md text-sm font-medium glory-font ${
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