import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Lock, CheckCircle } from "lucide-react";

interface Module {
  id: string;
  name: string;
  description: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  progress: number;
}

// Basic modules previously used for list view (kept for reference)
const mockModules: Module[] = [
  { id: "intro", name: "Introduction", description: "Basic concepts and setup", xp: 100, completed: true, locked: false, progress: 100 },
  { id: "basics", name: "Basic Circuits", description: "Your first LED circuit", xp: 150, completed: true, locked: false, progress: 100 },
  { id: "resistors", name: "Resistors & Current", description: "Understanding resistance", xp: 200, completed: false, locked: false, progress: 45 },
  { id: "pwm", name: "PWM Dimming", description: "Control LED brightness", xp: 250, completed: false, locked: true, progress: 0 },
  { id: "rgb", name: "RGB LEDs", description: "Mix colors with code", xp: 300, completed: false, locked: true, progress: 0 },
  { id: "matrix", name: "LED Matrix", description: "Display patterns", xp: 400, completed: false, locked: true, progress: 0 },
];

// New levels for LEDs Beginner — CandyCrush-style progression map
type Level = {
  id: string;
  index: number;
  title: string;
  xp: number;
  completed: boolean;
  quizScore: number; // 0-100
};

const initialLevels: Level[] = [
  { id: "led-1", index: 1, title: "LED ON / OFF", xp: 50, completed: false, quizScore: 0 },
  { id: "led-2", index: 2, title: "LED Blinking", xp: 60, completed: false, quizScore: 0 },
  { id: "led-3", index: 3, title: "LED Toggle (delay)", xp: 70, completed: false, quizScore: 0 },
  { id: "led-4", index: 4, title: "LED Toggle (Timer)", xp: 80, completed: false, quizScore: 0 },
  { id: "led-5", index: 5, title: "Pattern L → R", xp: 90, completed: false, quizScore: 0 },
  { id: "led-6", index: 6, title: "Pattern R → L", xp: 90, completed: false, quizScore: 0 },
  { id: "led-7", index: 7, title: "Knight Rider", xp: 120, completed: false, quizScore: 0 },
  { id: "led-8", index: 8, title: "LED w/ Interrupt", xp: 130, completed: false, quizScore: 0 },
  { id: "led-9", index: 9, title: "LED w/ External Switch", xp: 140, completed: false, quizScore: 0 },
  { id: "led-10", index: 10, title: "Mini LED Challenge", xp: 200, completed: false, quizScore: 0 },
];

const Modules = () => {
  const { mcId, topicId, levelId } = useParams();
  const navigate = useNavigate();

  // Levels state (local). Initialized from localStorage so progress persists across pages.
  const [levels, setLevels] = useState<Level[]>(() =>
    initialLevels.map((l) => {
      try {
        const comp = localStorage.getItem(`completed-${l.id}`);
        const quiz = localStorage.getItem(`quiz-${l.id}`);
        return {
          ...l,
          completed: comp === "true",
          quizScore: quiz ? parseInt(quiz, 10) : l.quizScore,
        };
      } catch (e) {
        return l;
      }
    })
  );
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Compute unlocked status: for now, lock all except first (per request).
  // This can be reverted to progression logic (previous completed && quizScore >=75) later.
  const unlocked = useMemo(() => {
    return levels.map((_, i) => i === 0);
  }, [levels]);

  const handleLevelClick = (levelIndex: number) => {
    const isUnlocked = unlocked[levelIndex - 1];
    if (!isUnlocked) return;
    // Preserve existing routing style — navigate to learn route using level id
    navigate(`/learn/${mcId}/${topicId}/led-${levelIndex}`);
  };

  // For compatibility with the old list view; not used in level-map but kept
  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      navigate(`/learn/${mcId}/${topicId}/${module.id}`);
    }
  };

  // Small inner component for rendering a node
  function LevelNode({ x, y, levelIndex }: { x: number; y: number; levelIndex: number }) {
    const idx = levelIndex - 1;
    const lvl = levels[idx];
    const isUnlocked = unlocked[idx];
    const isCompleted = lvl?.completed;

    return (
      <div
        className="absolute"
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
        onMouseEnter={() => setHoveredLevel(levelIndex)}
        onMouseLeave={() => setHoveredLevel(null)}
      >
        <button
          onClick={() => handleLevelClick(levelIndex)}
          disabled={!isUnlocked}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none ${
            isUnlocked
              ? isCompleted
                ? 'bg-gradient-to-br from-emerald-400 to-green-600 text-white scale-100 border-2 border-emerald-500'
                : 'bg-card text-foreground border border-primary/10 hover:scale-105'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isUnlocked ? (
            isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span className="font-semibold text-sm">{levelIndex}.</span>
            )
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </button>

        {/* Tooltip */}
        {hoveredLevel === levelIndex && (
          <div className="absolute left-1/2 top-[-110%] w-56 -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg text-sm">
            <div className="flex items-center justify-between mb-1">
              <div className="font-semibold">{lvl?.title}</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{lvl?.xp} XP</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {isUnlocked ? (isCompleted ? 'Completed' : 'Unlocked') : 'Locked — Score 75% in previous quiz to unlock'}
            </div>
          </div>
        )}
      </div>
    );
  }

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

      <main className="max-w-7xl mx-auto px-6 py-8">
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

        {/* Candy-Crush-style Level Map */}
        <div className="relative bg-card rounded-2xl p-6">
          <p className="text-sm text-muted-foreground mb-4">Follow the curved path to progress — unlock next level by scoring 75% in the previous quiz.</p>

          {/* SVG path background */}
          <div className="relative w-full h-[78vh]">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="g" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path d="M500,80 C480,140 520,220 500,280 C480,340 520,420 500,480 C480,540 520,620 500,680 C480,740 520,820 500,900" stroke="url(#g)" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.16" />
            </svg>

            {/* Nodes positioned vertically down the page (centered with slight zig-zag) */}
            {[
              [50, 8], [46, 17], [54, 26], [46, 35], [54, 44], [46, 53], [54, 62], [46, 71], [54, 80], [50, 90]
            ].map(([x, y], i) => {
              const idx = i + 1;
              return <LevelNode key={idx} x={x} y={y} levelIndex={idx} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Modules;
