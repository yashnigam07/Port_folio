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
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate header and intro
    tl.fromTo(
      experienceEl.querySelectorAll(".experience-content > :first-child, .experience-content > :nth-child(2)"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate experience cards
    tl.fromTo(
      experienceEl.querySelectorAll(".experience-card"),
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
      organization: "Equal Opportunity Cell, SVC",
      period: "Jan 2022 – Present",
      description: "Led design and branding initiatives, enhancing outreach through impactful visuals and helped organize the annual fest ‘Lahar’.",
    },
    {
      title: "Creative Head, DoE Students Council",
      organization: "Sri Venkateswara College",
      period: "Oct 2023 – May 2024",
      description: "Designed social media content and coordinated the Amplifier 2024 annual event.",
    },
    {
      title: "Creative Head, Editorial Board Aanvik 2024",
      organization: "Sri Venkateswara College",
      period: "Feb 2024 – May 2024",
      description: "Led the team in designing and implementing sustainable editorial solutions.",
    },
  ];

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden"
      aria-labelledby="experience-title"
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
        className="z-10 max-w-7xl mx-auto text-center experience-content space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          id="experience-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 glory-font"
        >
          My Experience
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed glory-font"
        >
          A blend of technical expertise and creative leadership, from research and workshops to event organization and impactful design.
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card relative bg-white/80 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                rotate: index % 2 === 0 ? 0.4 : -0.4,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              role="group"
              aria-label={`Experience: ${exp.title} at ${exp.organization}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-50/10 rounded-lg -z-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 glory-font">{exp.title}</h3>
              <p className="mt-1 text-sm text-gray-600 font-medium glory-font">{exp.organization}</p>
              <p className="text-sm text-gray-500 glory-font">{exp.period}</p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed glory-font">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#achievements"
          className="mt-8 inline-block px-6 py-3 rounded-full border border-gray-900 text-gray-900 font-semibold bg-white/95 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 glory-font"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View my achievements"
        >
          View My Achievements
        </motion.a>
      </motion.div>
    </section>
  );
}