import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu, GraduationCap, Briefcase, Wrench, Target, Rocket, Brain, ChevronRight, Sparkles } from "lucide-react";

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const questions: Question[] = [
  {
    id: "profession",
    title: "What describes you best?",
    subtitle: "We'll personalize your experience",
    options: [
      { id: "student", label: "Student", description: "Currently studying electronics or engineering", icon: GraduationCap },
      { id: "professional", label: "Professional", description: "Working in tech or engineering field", icon: Briefcase },
      { id: "hobbyist", label: "Hobbyist", description: "Building projects for fun and learning", icon: Wrench },
    ],
  },
  {
    id: "goal",
    title: "What's your main goal?",
    subtitle: "This helps us recommend the right path",
    options: [
      { id: "academics", label: "Academics", description: "Prepare for exams and coursework", icon: GraduationCap },
      { id: "career", label: "Career Growth", description: "Advance my professional skills", icon: Rocket },
      { id: "robotics", label: "Robotics & IoT", description: "Build robots and smart devices", icon: Brain },
    ],
  },
  {
    id: "experience",
    title: "Your experience level?",
    subtitle: "We'll start you at the right level",
    options: [
      { id: "beginner", label: "Beginner", description: "New to microcontrollers", icon: Sparkles },
      { id: "intermediate", label: "Intermediate", description: "Know the basics, want to go deeper", icon: Target },
      { id: "advanced", label: "Advanced", description: "Looking for complex challenges", icon: Rocket },
    ],
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSelect = (optionId: string) => {
    const questionId = questions[currentStep].id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      // Save to localStorage and navigate
      localStorage.setItem("swadhyay_onboarding", JSON.stringify({ ...answers, [questionId]: optionId }));
      setTimeout(() => navigate("/hub"), 500);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Swadhyay</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Question */}
              <div className="text-center mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                >
                  {currentQuestion.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  {currentQuestion.subtitle}
                </motion.p>
              </div>

              {/* Options */}
              <div className="grid gap-4">
                {currentQuestion.options.map((option, index) => {
                  const Icon = option.icon;
                  const isSelected = answers[currentQuestion.id] === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      onClick={() => handleSelect(option.id)}
                      className={`group w-full flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 text-left ${
                        isSelected
                          ? "border-primary bg-primary/10 glow-cyan"
                          : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-xl transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground group-hover:text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {option.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 transition-all ${
                          isSelected
                            ? "text-primary translate-x-1"
                            : "text-muted-foreground group-hover:text-primary group-hover:translate-x-1"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
