import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full pt-16" style={{ backgroundColor: "hsl(0, 0%, 5%)"}}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* Left: Brand & Philosophy (~45%) */}
{/* Left: Brand & Philosophy (~45%) */}
<motion.div
  className="md:w-5/12 w-full flex items-center"
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <div className="w-full">

    {/* Eyebrow */}
    <div
      className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium mb-6 tracking-widest"
      style={{
        backgroundColor: "rgba(125,211,252,0.12)",
        border: "1px solid rgba(125,211,252,0.25)",
        color: "#7DD3FC",
      }}
    >
      SELF-DIRECTED • AI-POWERED • HARDWARE LEARNING
    </div>

    {/* Devanagari Brand */}
    <h1
      className="text-5xl md:text-6xl mb-2"
      style={{
        fontFamily: "'Noto Serif Devanagari', serif",
        color: "#E6EEF7",
        letterSpacing: "0.04em",
        textShadow: "0 0 18px rgba(125,211,252,0.12)",
      }}
    >
      स्वाध्याय
    </h1>

    {/* Latin Name */}
    <p
      className="uppercase text-xs tracking-[0.3em] mb-8"
      style={{ color: "#8FA6BF" }}
    >
      Swadhyay
    </p>

    {/* Core Statement */}
    <p
      className="text-base md:text-lg mb-7"
      style={{
        color: "#B8C7DA",
        lineHeight: 1.85,
        maxWidth: "38rem",
      }}
    >
      An AI-powered self-learning microcontroller tutor that enables students to
      <strong style={{ color: "#E6EEF7" }}> learn</strong>,
      <strong style={{ color: "#E6EEF7" }}> practice</strong>,
      <strong style={{ color: "#E6EEF7" }}> simulate</strong>, and
      <strong style={{ color: "#E6EEF7" }}> reflect</strong> independently —
      without a physical lab.
    </p>

    {/* Impact Points */}
    <ul
      className="space-y-3 text-sm"
      style={{ color: "#9FB4CC" }}
    >
      <li>• Personalized, self-paced embedded learning</li>
      <li>• Live simulations without hardware dependency</li>
      <li>• Inclusive, accessible, and sustainable education</li>
      <li>• Designed for the AI-driven learning era</li>
    </ul>

    {/* Divider */}
    <div
      className="h-px w-full mt-8"
      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
    />
  </div>
</motion.div>



          {/* Right: Video (~55%) */}
          <motion.div className="md:w-7/12 w-full flex items-center justify-center" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="w-full h-[56vh] md:h-[64vh] rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#EAF1FA' }}>
              <video
                src={encodeURI("/MC 8051 Transition.mp4")}
                autoPlay
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
