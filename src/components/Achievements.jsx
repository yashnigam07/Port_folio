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
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      achievementsEl.querySelectorAll(".achievements-content > :first-child, .achievements-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate achievement cards
    tl.fromTo(
      achievementsEl.querySelectorAll(".achievement-card"),
      { opacity: 0, y: 40, rotateX: 5 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
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
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="achievements-title"
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
        className="z-10 max-w-7xl mx-auto text-center achievements-content space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="achievements-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 glory-font"
        >
          My Achievements
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed glory-font"
        >
          A showcase of my academic and extracurricular accomplishments, reflecting my passion for innovation and creativity.
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {achievements.map((ach, index) => (
            <motion.div
              key={index}
              className="achievement-card relative bg-white/80 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                rotate: index % 2 === 0 ? 0.4 : -0.4,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Achievement: ${ach.title} at ${ach.organization}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-50/10 rounded-lg -z-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 glory-font">{ach.title}</h3>
              <p className="mt-1 text-sm text-gray-600 font-medium glory-font">{ach.organization}</p>
              <p className="text-sm text-gray-500 glory-font">{ach.period}</p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed glory-font">{ach.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          className="mt-8 inline-block px-6 py-3 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 glory-font"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get in touch"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
}