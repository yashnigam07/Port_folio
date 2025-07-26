import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"; // Install if not present
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";

// Lazy-loaded components
const Hero = React.lazy(() => import("./components/Hero"));
const Skills = React.lazy(() => import("./components/Skills"));
const Projects = React.lazy(() => import("./components/Projects"));
const Experience = React.lazy(() => import("./components/Experience"));
const Achievements = React.lazy(() => import("./components/Achievements"));
const Contact = React.lazy(() => import("./components/Contact"));

// Error fallback component
function ErrorFallback({ error }) {
  return (
    <div className="text-center p-4 text-red-600">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-gray-900 text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="relative font-sans min-h-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar />
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;