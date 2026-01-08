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

const quizQuestions: Question[] = 
[
  {
    id: 1,
    question: "Why is a delay required between turning the LED ON and OFF in an 8051 program?",
    options: [
      "To protect the microcontroller from overheating",
      "To make the LED brighter",
      "To allow the human eye to perceive the blinking",
      "To synchronize the crystal oscillator"
    ],
    correct: 2
  },
  {
    id: 2,
    question: "In the given circuit, the LED turns ON when the pin P2.0 is set to logic 0. What is the main reason for this configuration?",
    options: [
      "The LED is faulty",
      "The 8051 is better at sourcing current",
      "The 8051 sinks current more efficiently than it sources",
      "Logic 0 always represents ON in microcontrollers"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "What is the primary function of the resistor connected in series with the LED?",
    options: [
      "Increase LED brightness",
      "Limit current to prevent LED damage",
      "Reduce voltage for the microcontroller",
      "Improve clock accuracy"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "Which header file is required to access special function registers of the 8051?",
    options: [
      "<stdio.h>",
      "<8051.h>",
      "<micro.h>",
      "<reg51.h>"
    ],
    correct: 3
  },
  {
    id: 5,
    question: "What does the statement sbit LED_PIN = P2^0; accomplish?",
    options: [
      "It configures Port 2 as input",
      "It assigns the entire Port 2 to the LED",
      "It creates a bit-level alias for pin P2.0",
      "It initializes the LED to OFF state"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "If the delay function is completely removed from the program, what would most likely happen?",
    options: [
      "The LED will stop working",
      "The LED will blink very slowly",
      "The LED will appear dim or constantly ON",
      "The microcontroller will reset"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "What is the purpose of the while(1) loop in the main function?",
    options: [
      "To run the program once",
      "To prevent compilation errors",
      "To create an infinite execution loop",
      "To initialize hardware components"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "Why is an 11.0592 MHz crystal oscillator commonly used with the 8051?",
    options: [
      "It reduces power consumption",
      "It simplifies accurate timing and baud rate generation",
      "It increases GPIO speed",
      "It is mandatory for LED blinking"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "If the LED is moved from P2.0 to P1.4, which change is required in the code?",
    options: [
      "Modify the delay function",
      "Change the crystal frequency",
      "Update the sbit pin definition",
      "Replace <reg51.h>"
    ],
    correct: 2
  },
  {
    id: 10,
    question: "In the delay function, why are nested empty for loops used?",
    options: [
      "To reserve memory",
      "To generate an interrupt",
      "To waste CPU cycles and create time delay",
      "To improve code readability"
    ],
    correct: 2
  }
]

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
