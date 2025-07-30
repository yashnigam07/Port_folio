import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const achievementsRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const achievementsEl = achievementsRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: achievementsEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      achievementsEl.querySelectorAll(".achievements-content > :first-child, .achievements-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Animate achievement cards
    tl.fromTo(
      achievementsEl.querySelectorAll(".achievement-card"),
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
      "-=0.5"
    );

    // Parallax effect for overlay
    gsap.fromTo(
      overlayRef.current,
      { y: -30 },
      {
        y: 30,
        scrollTrigger: {
          trigger: achievementsEl,
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

  const achievements = [
    {
      title: "1st Position in Innovative Odyssey",
      organization: "Shaheed Rajguru College of Applied Sciences for Women",
      period: "Nov 2023",
      description: "Secured first place in a competitive event focused on innovative solutions and technical creativity.",
    },
    {
      title: "Research Poster Presentation",
      organization: "SVC Research Conclave 2025",
      period: "Feb 2025",
      description: "Presented a research poster showcasing advancements in 3D printing technology and design.",
    },
    {
      title: "College Prospectus Design",
      organization: "Sri Venkateswara College",
      period: "June 2024",
      description: "Designed the official college prospectus for 2024-2025, creating impactful visuals for outreach.",
    },
    {
      title: "National Science Day Volunteer",
      organization: "Sri Venkateswara College",
      period: "Feb 2024",
      description: "Contributed to the organization and execution of National Science Day 2024 events.",
    },
    {
      title: "IoTronics Training Program",
      organization: "DDUC, University of Delhi",
      period: "Oct 2023",
      description: "Participated in an IoT training program, gaining hands-on experience with IoT technologies.",
    },
  ];

  return (
    <section
      id="achievements"
      ref={achievementsRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="achievements-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
      />

      {/* Achievements Content */}
      <motion.div
        className="z-10 max-w-6xl mx-auto text-center achievements-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="achievements-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My Achievements
        </motion.h2>

        <motion.p
          className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A showcase of my academic and extracurricular accomplishments, reflecting my passion for innovation and creativity.
        </motion.p>

        {/* Achievements Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {achievements.map((ach, index) => (
            <motion.div
              key={index}
              className="achievement-card relative bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50"
              whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 0.5 : -0.5, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Achievement: ${ach.title} at ${ach.organization}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 to-white/10 rounded-xl -z-10" />
              <h3 className="text-xl font-semibold text-gray-800">{ach.title}</h3>
              <p className="mt-1 text-sm text-gray-600 font-medium">{ach.organization}</p>
              <p className="text-sm text-gray-500">{ach.period}</p>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{ach.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-800 text-gray-800 font-semibold bg-white/90 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get in touch"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
}