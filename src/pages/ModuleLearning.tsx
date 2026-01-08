import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Cpu,
  Video,
  FileText,
  Code,
  HelpCircle,
  CheckCircle,
  X,
  Play,
} from "lucide-react";
import AICodeMentor from "@/components/AICodeMentor";

const ModuleLearning = () => {
  const { mcId, topicId, moduleId } = useParams();
  const [activeTab, setActiveTab] = useState("video");
  const [completedSections, setCompletedSections] = useState<string[]>(() => {
    try {
      if (!moduleId) return [];
      const secs = ["video", "article", "simulation", "quiz"];
      return secs.filter((s) => localStorage.getItem(`completed-${moduleId}-${s}`) === "true");
    } catch (e) {
      return [];
    }
  });

  const progress = {
    video: completedSections.includes("video") ? 100 : 0,
    article: completedSections.includes("article") ? 100 : 0,
    simulation: completedSections.includes("simulation") ? 100 : 0,
    quiz: completedSections.includes("quiz") ? 100 : 0,
  };

  const totalProgress = 
    (progress.video * 0.1) + 
    (progress.article * 0.1) + 
    (progress.simulation * 0.5) + 
    (progress.quiz * 0.3);

  const markComplete = (section: string) => {
    if (!moduleId) return;
    try {
      localStorage.setItem(`completed-${moduleId}-${section}`, "true");
    } catch (e) {
      // ignore
    }
    setCompletedSections((prev) => (prev.includes(section) ? prev : [...prev, section]));
  };

  const navigate = useNavigate();

  // Mark the full module as completed (persisted) and go to next level automatically
  const markModuleCompleted = () => {
    if (!moduleId) return;
    try {
      localStorage.setItem(`completed-${moduleId}`, "true");
      // assume full completion implies max quiz score for unlock purposes
      localStorage.setItem(`quiz-${moduleId}`, "100");
    } catch (e) {
      // ignore storage failures
    }

    // ensure simulation section is marked locally too
    if (!completedSections.includes("simulation")) setCompletedSections([...completedSections, "simulation"]);

    // compute next module (supports led-<n> pattern)
    const m = moduleId.match(/led-(\d+)/);
    if (m && m[1]) {
      const n = parseInt(m[1], 10);
      const next = n + 1;
      if (next <= 10) {
        navigate(`/learn/${mcId}/${topicId}/led-${next}`);
        return;
      }
    }

    // fallback to modules overview
    navigate(`/modules/${mcId}/${topicId}/beginner`);
  };

  const tabs = [
    { id: "video", label: "Video", icon: Video, weight: "10%" },
    { id: "article", label: "Article", icon: FileText, weight: "10%" },
    { id: "simulation", label: "Simulation", icon: Code, weight: "50%" },
    { id: "quiz", label: "Quiz", icon: HelpCircle, weight: "30%" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link to={`/modules/${mcId}/${topicId}/beginner`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-foreground capitalize">
                  {moduleId?.replace(/-/g, " ")}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-lg font-bold text-primary">{Math.round(totalProgress)}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid grid-cols-4 mb-6 bg-secondary p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isCompleted = completedSections.includes(tab.id);
              
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="relative flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="text-xs opacity-60">({tab.weight})</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8 h-full"
            >
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                <video
                  ref={useRef<HTMLVideoElement | null>(null)}
                  id="module-video"
                  className="w-full h-full object-cover rounded-lg"
                  preload="metadata"
                  controls={true}
                  poster="/placeholder.svg"
                >
                  <source src="/Arduino_Blink__First_Circuit.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Centered play overlay for accessibility and clearer affordance on mobile */}
                <div
                  role="button"
                  aria-label="Play video"
                  onClick={() => {
                    const v = document.getElementById("module-video") as HTMLVideoElement | null;
                    if (v) {
                      if (v.paused) v.play();
                      else v.pause();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
              <Button
                variant="hero"
                onClick={() => markComplete("video")}
                disabled={completedSections.includes("video")}
              >
                {completedSections.includes("video") ? "Completed ✓" : "Mark as Watched"}
              </Button>
            </motion.div>
          </TabsContent>

          {/* Article Tab */}
          <TabsContent value="article" className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <article className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">Understanding LEDs</h2>
                <p className="text-muted-foreground mb-4">
                  A Light Emitting Diode (LED) is a semiconductor device that emits light when current flows through it. 
                  LEDs are used everywhere in electronics, from indicator lights to displays.
                </p>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Concepts</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong className="text-foreground">Polarity:</strong> LEDs have an anode (+) and cathode (-). Connect them correctly!</li>
                  <li><strong className="text-foreground">Forward Voltage:</strong> Typically 1.8V-3.3V depending on color</li>
                  <li><strong className="text-foreground">Current Limiting:</strong> Always use a resistor to limit current</li>
                </ul>
                <h3 className="text-xl font-semibold text-foreground mb-3">Calculating Resistor Value</h3>
                <div className="bg-secondary rounded-lg p-4 font-mono text-sm mb-4">
                  R = (V_supply - V_LED) / I_LED<br/>
                  R = (5V - 2V) / 0.02A = 150Ω
                </div>
              </article>
                <article className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-foreground mb-4">LED ON and OFF Using 8051 Microcontroller</h2>

                  <h3 className="text-lg font-semibold text-foreground mb-2">What Does <b>LED ON/OFF</b> Mean?</h3>
                  <p className="text-muted-foreground mb-4">
                    <b>LED ON/OFF</b> means controlling an LED so that it can be:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Turned <b>ON</b> by the microcontroller</li>
                    <li>Turned <b>OFF</b> by the microcontroller</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">Unlike blinking, here the LED does not toggle automatically. Instead, it turns ON or OFF based on program logic.</p>

                  <h3 className="text-lg font-semibold text-foreground mb-2">Why Start With LED ON/OFF in 8051?</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>It teaches how output pins work</li>
                    <li>It shows how software controls hardware</li>
                    <li>It builds confidence before moving to blinking, timers, or interrupts</li>
                    <li>Every complex project starts from this concept</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground mb-2">Understanding the LED</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li><b>Anode (+)</b> → Longer leg</li>
                    <li><b>Cathode (–)</b> → Shorter leg</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">LED Behavior: <b>HIGH (1)</b> → LED turns <b>ON</b>, <b>LOW (0)</b> → LED turns <b>OFF</b></p>

                  <h3 className="text-lg font-semibold text-foreground mb-2">8051 Output Pins Explained</h3>
                  <p className="text-muted-foreground mb-2">The 8051 has four ports: <b>P0</b>, <b>P1</b>, <b>P2</b>, <b>P3</b>. Each port has 8 pins. Example: <b>P1.0</b> → Pin 0 of Port 1.</p>
                  <p className="text-muted-foreground mb-4">If an LED is connected to <b>P1.0</b>: <b>P1.0 = 1</b> → LED ON, <b>P1.0 = 0</b> → LED OFF</p>

                  <h3 className="text-lg font-semibold text-foreground mb-2">Circuit Connection</h3>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                    <li>Connect LED anode to <b>P1.0</b></li>
                    <li>Connect LED cathode to 330Ω resistor</li>
                    <li>Connect resistor to GND</li>
                    <li>Power the 8051 with 5V</li>
                  </ol>

                  <h3 className="text-lg font-semibold text-foreground mb-2">LED ON Program</h3>
                  <pre className="bg-secondary rounded-lg p-4 font-mono text-sm mb-4">
  {`#include <reg51.h>
  void main() {
      P1 = 0x01;   // Turn LED ON
      while(1);    // Stay here forever
  }`}
                  </pre>

                  <h3 className="text-lg font-semibold text-foreground mb-2">LED OFF Program</h3>
                  <pre className="bg-secondary rounded-lg p-4 font-mono text-sm mb-4">
  {`#include <reg51.h>
  void main() {
      P1 = 0x00;   // Turn LED OFF
      while(1);    // Stay here forever
  }`}
                  </pre>

                  <h3 className="text-lg font-semibold text-foreground mb-2">Try This Yourself</h3>
                  <p className="text-muted-foreground mb-4">Change <b>P1 = 0x01</b> to <b>P1 = 0x02</b> → LED should be connected to <b>P1.1</b>.</p>
                </article>
              <Button
                variant="hero"
                onClick={() => markComplete("article")}
                disabled={completedSections.includes("article")}
                className="mt-6"
              >
                {completedSections.includes("article") ? "Completed ✓" : "Mark as Read"}
              </Button>
            </motion.div>
          </TabsContent>

          {/* Simulation Tab */}
          <TabsContent value="simulation" className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-4 h-full flex flex-col"
            >
              <div className="flex-1 rounded-xl overflow-hidden bg-secondary min-h-[500px] relative">
                <iframe
                  src="https://wokwi.com/projects/new/arduino-uno?embed=1&theme=dark"
                  className="w-full h-full border-0"
                  title="Wokwi Simulation"
                  allow="clipboard-write"
                />
                {/* (removed inline mentor) previously placed inside editor — mentor now renders fixed at viewport level */}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Build your circuit and write code in the simulator above
                </p>
                <Button
                  variant="hero"
                  onClick={() => markComplete("simulation")}
                  disabled={completedSections.includes("simulation")}
                >
                  {completedSections.includes("simulation") ? "Completed ✓" : "Mark Complete"}
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Module Quiz</h2>
              <p className="text-muted-foreground mb-8">
                Test your understanding with this 10-question quiz. You need 75% to pass.
              </p>
              <Link to={`/quiz/${mcId}/${topicId}/${moduleId}`}>
                <Button variant="hero" size="lg">
                  Start Quiz
                </Button>
              </Link>
            </motion.div>
          </TabsContent>
        </Tabs>
        {/* Global AI Code Mentor button (fixed) - placed outside the Wokwi iframe */}
        <AICodeMentor />
      </main>

      {/* Fullscreen simulation overlay when Simulation tab is active */}
      {activeTab === "simulation" && (
        <div className="fixed inset-0 z-50 bg-background/90 p-4 flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setActiveTab("video")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold text-foreground">Wokwi Simulation</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => markComplete("simulation")}>
                {completedSections.includes("simulation") ? "Completed ✓" : "Mark Complete"}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab("video")}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 max-w-7xl mx-auto w-full">
            <div className="h-[calc(100vh-96px)] rounded-xl overflow-hidden bg-secondary">
              <iframe
                src="https://wokwi.com/projects/new/arduino-uno?embed=1&theme=dark"
                className="w-full h-full border-0"
                title="Wokwi Simulation"
                allow="clipboard-write"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleLearning;
