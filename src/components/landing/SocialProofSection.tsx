import { motion } from "framer-motion";

const metrics = [
  { value: "50+", label: "Modules" },
  { value: "100+", label: "Simulations" },
  { value: "10k+", label: "Students" },
  { value: "4.8", label: "Avg Rating" },
];

const SocialProofSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-semibold">Built for engineering students who want clarity, not chaos.</h3>
          <p className="text-muted-foreground mt-2">Focused tools, fewer distractions, measurable progress.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8"
        >
          {metrics.map((m) => (
            <div key={m.label} className="glass-card rounded-xl p-6 text-center">
              <div className="text-2xl font-bold gradient-text">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
