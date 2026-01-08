import { motion } from "framer-motion";
import { Bot, Gamepad2, Cpu, Zap, Target, Trophy } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Mentor",
    description: "Get personalized guidance from our intelligent assistant that understands your learning pace and adapts in real-time.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Cpu,
    title: "Live Simulation",
    description: "Build and test real circuits with Wokwi integration. Write code, see it run, and learn from instant feedback.",
    gradient: "from-accent to-neon-purple",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn XP, maintain streaks, climb leaderboards, and unlock achievements as you master each concept.",
    gradient: "from-neon-purple to-primary",
  },
  {
    icon: Target,
    title: "Adaptive Difficulty",
    description: "Our diagnostic tests place you at the right level, ensuring you're always challenged but never overwhelmed.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Know immediately if your circuit works. Debug in real-time with helpful hints and explanations.",
    gradient: "from-accent to-neon-purple",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Visualize your journey with detailed analytics, completion rates, and skill trees for each microcontroller.",
    gradient: "from-neon-purple to-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-elevated/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Learn Different,</span>{" "}
            <span className="gradient-text">Learn Better</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Swadhyay combines cutting-edge AI with proven learning science to create 
            an experience that's both effective and addictively fun.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full card-interactive">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-background" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
