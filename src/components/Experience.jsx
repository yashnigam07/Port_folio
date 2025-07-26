import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experienceRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experienceRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      experienceRef.current,
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

  const experiences = [
    {
      title: "Crowdfunding Intern",
      organization: "Muskurahat Foundation",
      period: "Feb 2025 – Present",
      description: "Assisted in fundraising initiatives, donor outreach, and campaign management to support underprivileged children’s education.",
    },
    {
      title: "3D Printing Workshop Facilitator",
      organization: "IGDTUW",
      period: "Jan 2025",
      description: "Led a hands-on 3D printing workshop, guiding participants through hardware assembly, firmware configuration, and troubleshooting, fostering technical collaboration and problem-solving skills.",
    },
    {
      title: "Research Intern",
      organization: "Sri Venkateswara College",
      period: "Jul 2024 – Sep 2024",
      description: "Conducted design and analysis of 3D printers under faculty mentorship as part of SRIVIPRA 2024-25 research internship.",
    },
    {
      title: "Graphic and Design Head",
      organization: "Equally Opportunity Cell, Sri Venkateswara College",
      period: "Jan 2022 – Present",
      description: "Led design and branding initiatives, enhancing outreach through impactful visuals, and contributed to organizing the annual fest ‘Lahar’ in 2023, 2024, and 2025.",
    },
    {
      title: "Creative Head, DoE Students Council",
      organization: "Sri Venkateswara College",
      period: "Oct 2023 – May 2024",
      description: "Designed social media posts and posters, and effectively led and organized the Amplifier 2024 annual event.",
    },
    {
      title: "Creative Head, Editorial Board Aanvik 2024",
      organization: "Sri Venkateswara College",
      period: "Feb 2024 – May 2024",
      description: "Led the team in designing and implementing sustainable solutions for the editorial board.",
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
      id="experience"
      ref={experienceRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-b from-gray-100 to-white"
      aria-labelledby="experience-title"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-gray-100/15 to-white/65 backdrop-blur-md" />

      {/* Experience Content */}
      <motion.div
        className="z-10 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          id="experience-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          My Experience
        </motion.h2>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A blend of technical expertise and creative leadership, from research and workshops to event organization and impactful design.
        </motion.p>

        {/* Experience Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {experiences.map((exp, index) => (
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
              aria-label={`Experience: ${exp.title}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.organization}</p>
              <p className="text-sm text-gray-600">{exp.period}</p>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#achievements"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium bg-white/85 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label="View my achievements"
        >
          View My Achievements
        </motion.a>
      </motion.div>
    </section>
  );
}