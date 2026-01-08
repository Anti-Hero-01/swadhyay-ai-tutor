import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What component is required when connecting an LED to a microcontroller?",
    options: ["Capacitor", "Resistor", "Inductor", "Transistor"],
    correct: 1,
  },
  {
    id: 2,
    question: "What is the typical forward voltage of a red LED?",
    options: ["0.7V", "1.8-2.2V", "3.3V", "5V"],
    correct: 1,
  },
  {
    id: 3,
    question: "Which pin on an LED is the cathode?",
    options: ["The longer leg", "The shorter leg", "The colored leg", "The flat side"],
    correct: 1,
  },
  {
    id: 4,
    question: "What happens if you connect an LED without a current-limiting resistor?",
    options: ["Nothing", "It dims", "It may burn out", "It blinks"],
    correct: 2,
  },
  {
    id: 5,
    question: "In Arduino, which function turns a digital pin HIGH?",
    options: ["analogWrite()", "digitalWrite()", "pinWrite()", "setHigh()"],
    correct: 1,
  },
];

const Quiz = () => {
  const { mcId, topicId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const passingScore = Math.ceil(quizQuestions.length * 0.75);
  const passed = score >= passingScore;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correct;
    if (isCorrect) setScore(score + 1);
    
    setAnswers([...answers, selectedAnswer]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
        if (score + (isCorrect ? 1 : 0) >= passingScore) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00FFD1", "#39FF14", "#00D4FF"],
          });
        }
      }
    }, 1500);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 max-w-md w-full text-center"
        >
          {passed ? (
            <>
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h1>
              <p className="text-muted-foreground mb-6">
                You passed with {score}/{quizQuestions.length} correct answers!
              </p>
              <div className="text-4xl font-bold gradient-text mb-8">
                +{score * 50} XP
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Keep Trying!</h1>
              <p className="text-muted-foreground mb-6">
                You got {score}/{quizQuestions.length}. You need {passingScore} to pass.
              </p>
            </>
          )}

          <div className="flex flex-col gap-3">
            {!passed && (
              <Button variant="hero" size="lg" onClick={handleRetry}>
                <RotateCcw className="w-5 h-5" />
                Try Again
              </Button>
            )}
            <Button
              variant={passed ? "hero" : "heroOutline"}
              size="lg"
              onClick={() => navigate(`/modules/${mcId}/${topicId}/beginner`)}
            >
              Back to Modules
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              Score: {score}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8">
                {question.question}
              </h2>

              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correct;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(index)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        showCorrect
                          ? "border-accent bg-accent/20"
                          : showWrong
                          ? "border-destructive bg-destructive/20"
                          : isSelected
                          ? "border-primary bg-primary/20"
                          : "border-border bg-secondary hover:border-primary/50"
                      }`}
                      disabled={showResult}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        showCorrect
                          ? "bg-accent text-accent-foreground"
                          : showWrong
                          ? "bg-destructive text-destructive-foreground"
                          : isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {showCorrect ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showWrong ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              <Button
                variant="hero"
                size="lg"
                onClick={handleNext}
                disabled={selectedAnswer === null || showResult}
                className="w-full"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
