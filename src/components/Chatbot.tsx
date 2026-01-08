import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Cpu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const getContextualResponse = (input: string, pathname: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Platform questions
  if (lowerInput.includes("earn") && lowerInput.includes("point")) {
    return "You earn XP by completing learning activities! Videos give 10%, articles 10%, simulations 50%, and quizzes 30% of a module's total points. First-attempt quiz passes earn maximum XP!";
  }
  
  if (lowerInput.includes("streak")) {
    return "Streaks reward daily consistency. Complete at least one activity each day to maintain your streak. Longer streaks unlock bonus XP multipliers!";
  }
  
  if (lowerInput.includes("lock") || lowerInput.includes("unlock")) {
    return "Modules unlock when you complete 80% of their prerequisites. If a quiz is locked, it means you've used all 3 attempts — wait 24 hours to try again.";
  }
  
  if (lowerInput.includes("attempt")) {
    return "You get 3 attempts per quiz. First attempt: full XP. Second: 75% XP. Third: 50% XP. After 3 fails, wait 24 hours. Study the material and come back stronger!";
  }
  
  // Learning questions
  if (lowerInput.includes("resistor") && lowerInput.includes("led")) {
    return "LEDs need resistors because they have very low resistance. Without one, too much current flows, destroying the LED. Use Ohm's Law: R = (V_supply - V_LED) / I_LED. For a typical 5V supply and red LED, ~220Ω works well.";
  }
  
  if (lowerInput.includes("digital") && lowerInput.includes("analog")) {
    return "Digital pins read/write HIGH (5V) or LOW (0V) — binary states. Analog pins read voltage levels (0-1023 on Arduino) using an ADC. Use digital for buttons/LEDs, analog for sensors like potentiometers or temperature sensors.";
  }
  
  if (lowerInput.includes("pwm")) {
    return "PWM (Pulse Width Modulation) simulates analog output using rapid on/off switching. The duty cycle (% of time ON) controls perceived brightness for LEDs or speed for motors. On Arduino, analogWrite() uses PWM on pins marked with ~.";
  }
  
  // Context-aware responses
  if (pathname.includes("hub")) {
    if (lowerInput.includes("start") || lowerInput.includes("begin")) {
      return "Great question! I'd recommend starting with ATmega328p — it's the heart of Arduino and perfect for beginners. Select it to see available topics like LEDs, sensors, and motors.";
    }
  }
  
  if (pathname.includes("dashboard")) {
    if (lowerInput.includes("improve") || lowerInput.includes("better")) {
      return "Looking at dashboards, focus on areas with lower accuracy. Daily practice maintains streaks. The simulation sections often give the best hands-on understanding. Keep pushing!";
    }
  }
  
  if (pathname.includes("simulation") || pathname.includes("module")) {
    return "You're in the simulation zone! Try modifying the code to see different behaviors. If something doesn't work, check your pin connections and make sure you're using the right resistor values.";
  }
  
  // Default helpful response
  return "I'm here to help with platform navigation, learning concepts, or study tips. Ask about XP, streaks, specific topics like LEDs or sensors, or how to progress through modules. What would you like to know?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your Swadhyay assistant. Ask me about the platform, learning tips, or microcontroller concepts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = getContextualResponse(input, location.pathname);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] glass-card rounded-2xl flex flex-col overflow-hidden border border-primary/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Swadhyay Assistant</h3>
                  <p className="text-xs text-muted-foreground">Your learning companion</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  variant="hero"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
