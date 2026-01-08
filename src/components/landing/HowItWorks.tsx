import { motion } from "framer-motion";
import { Check, Play, Cpu, Terminal } from "lucide-react";

const steps = [
  { title: "Choose Level", desc: "Beginner → Advanced placement tests to set your path.", icon: Check },
  { title: "Learn via Modules", desc: "Structured lessons: video, article, and guided tasks.", icon: Play },
  { title: "Practice with Simulation", desc: "Run code in-browser with accurate hardware sims.", icon: Cpu },
  { title: "Get AI Feedback & Progress", desc: "Receive targeted hints, fixes, and XP for improvement.", icon: Terminal },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold">How it works</h3>
          <p className="text-muted-foreground mt-3">A clear, four-step path from learning to mastery.</p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex-1 md:flex-1 md:text-center md:odd:border-r md:odd:pr-8 md:even:pl-8`}
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/40 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">{s.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
