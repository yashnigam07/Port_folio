import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experienceRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const experienceEl = experienceRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experienceEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and description
    tl.fromTo(
      experienceEl.querySelectorAll(".experience-content > :first-child, .experience-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Animate experience cards
    tl.fromTo(
      experienceEl.querySelectorAll(".experience-card"),
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
          trigger: experienceEl,
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

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="experience-title"
    >
      {/* Glass Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 via-gray-100/10 to-white/40 backdrop-blur-lg transition-opacity duration-500"
      />

      {/* Experience Content */}
      <motion.div
        className="z-10 max-w-6xl mx-auto text-center experience-content space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="experience-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My Experience
        </motion.h2>

        <motion.p
          className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A blend of technical expertise and creative leadership, from research and workshops to event organization and impactful design.
        </motion.p>

        {/* Experience Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card relative bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50"
              whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 0.5 : -0.5, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Experience: ${exp.title} at ${exp.organization}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 to-white/10 rounded-xl -z-10" />
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <p className="mt-1 text-sm text-gray-600 font-medium">{exp.organization}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#achievements"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-gray-800 text-gray-800 font-semibold bg-white/90 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="View my achievements"
        >
          View My Achievements
        </motion.a>
      </motion.div>
    </section>
  );
}