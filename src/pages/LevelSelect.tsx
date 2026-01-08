import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Cpu,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Start from the basics. Perfect for those new to this topic.",
    xpMultiplier: "1x",
    icon: Star,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "You know the basics. Ready for more challenging concepts.",
    xpMultiplier: "1.5x",
    icon: Zap,
    color: "from-primary to-cyan-400",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Expert-level challenges. Complex circuits and optimizations.",
    xpMultiplier: "2x",
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
  },
];

const LevelSelect = () => {
  const { mcId, topicId } = useParams();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      localStorage.setItem(`swadhyay_level_${mcId}_${topicId}`, selectedLevel);
      navigate(`/modules/${mcId}/${topicId}/${selectedLevel}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={`/microcontroller/${mcId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Select Difficulty</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Level
          </h1>
          <p className="text-lg text-muted-foreground">
            Higher difficulty = More XP. Choose wisely!
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isSelected = selectedLevel === level.id;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedLevel(level.id)}
                className={`w-full flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left ${
                  isSelected
                    ? "border-primary bg-primary/10 glow-cyan"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${level.color}`}>
                  <Icon className="w-8 h-8 text-background" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-foreground">{level.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-primary">
                      {level.xpMultiplier} XP
                    </span>
                  </div>
                  <p className="text-muted-foreground">{level.description}</p>
                </div>
                <ChevronRight className={`w-6 h-6 transition-all ${
                  isSelected ? "text-primary translate-x-1" : "text-muted-foreground"
                }`} />
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            variant="hero"
            size="xl"
            disabled={!selectedLevel}
            onClick={handleContinue}
            className="w-full sm:w-auto"
          >
            Continue to Modules
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default LevelSelect;
