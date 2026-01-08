import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Cpu,
  Lock,
  CheckCircle,
  Play,
  ChevronRight,
} from "lucide-react";

interface Module {
  id: string;
  name: string;
  description: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  progress: number;
}

const mockModules: Module[] = [
  { id: "intro", name: "Introduction", description: "Basic concepts and setup", xp: 100, completed: true, locked: false, progress: 100 },
  { id: "basics", name: "Basic Circuits", description: "Your first LED circuit", xp: 150, completed: true, locked: false, progress: 100 },
  { id: "resistors", name: "Resistors & Current", description: "Understanding resistance", xp: 200, completed: false, locked: false, progress: 45 },
  { id: "pwm", name: "PWM Dimming", description: "Control LED brightness", xp: 250, completed: false, locked: true, progress: 0 },
  { id: "rgb", name: "RGB LEDs", description: "Mix colors with code", xp: 300, completed: false, locked: true, progress: 0 },
  { id: "matrix", name: "LED Matrix", description: "Display patterns", xp: 400, completed: false, locked: true, progress: 0 },
];

const Modules = () => {
  const { mcId, topicId, levelId } = useParams();
  const navigate = useNavigate();

  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      navigate(`/learn/${mcId}/${topicId}/${module.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/level-select/${mcId}/${topicId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold gradient-text">Modules</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground capitalize">
            {levelId} Level
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            LEDs & Displays
          </h1>
          <p className="text-muted-foreground">
            Master LED control from basic blinks to complex animations
          </p>
        </motion.div>

        {/* Modules List */}
        <div className="space-y-4">
          {mockModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleModuleClick(module)}
                disabled={module.locked}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left ${
                  module.locked
                    ? "border-border bg-secondary/30 opacity-60 cursor-not-allowed"
                    : module.completed
                    ? "border-accent/50 bg-accent/5 hover:border-accent"
                    : "border-border bg-card hover:border-primary/50 hover:scale-[1.02]"
                }`}
              >
                {/* Status Icon */}
                <div className={`p-3 rounded-xl ${
                  module.locked
                    ? "bg-muted text-muted-foreground"
                    : module.completed
                    ? "bg-accent/20 text-accent"
                    : "bg-primary/20 text-primary"
                }`}>
                  {module.locked ? (
                    <Lock className="w-5 h-5" />
                  ) : module.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{module.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {module.xp} XP
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{module.description}</p>
                  
                  {/* Progress Bar */}
                  {!module.locked && module.progress > 0 && module.progress < 100 && (
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${module.progress}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  )}
                </div>

                {/* Arrow */}
                {!module.locked && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Modules;
