import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const achievementsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: achievementsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      achievementsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -2 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="achievements"
      ref={achievementsRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-b from-gray-100 to-white"
      aria-labelledby="achievements-title"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-gray-100/15 to-white/65 backdrop-blur-md" />

      {/* Achievements Content */}
      <motion.div
        className="z-10 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          id="achievements-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          My Achievements
        </motion.h2>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A showcase of my academic and extracurricular accomplishments, reflecting my passion for innovation and creativity.
        </motion.p>

        {/* Achievements Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {achievements.map((ach, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/40 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl hover:border-gray-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              role="group"
              aria-label={`Achievement: ${ach.title}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{ach.title}</h3>
              <p className="text-sm text-gray-600">{ach.organization}</p>
              <p className="text-sm text-gray-600">{ach.period}</p>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{ach.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/85 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label="Get in touch"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
}