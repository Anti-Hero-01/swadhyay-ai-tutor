import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Cpu,
  Lightbulb,
  Thermometer,
  Cog,
  Clock,
  Wifi,
  ChevronRight,
} from "lucide-react";

const microcontrollerData: Record<string, { name: string; description: string; pinCount: number }> = {
  atmega328p: {
    name: "ATmega328P",
    description: "The ATmega328P is an 8-bit AVR microcontroller with 32KB Flash, 2KB SRAM, and 1KB EEPROM. It's the heart of Arduino Uno.",
    pinCount: 28,
  },
  "8051": {
    name: "8051",
    description: "The 8051 is an 8-bit microcontroller with 4KB ROM and 128 bytes of RAM. It's a classic in embedded systems education.",
    pinCount: 40,
  },
  "8085": {
    name: "8085",
    description: "The Intel 8085 is an 8-bit microprocessor that can address 64KB of memory. Ideal for learning computer architecture.",
    pinCount: 40,
  },
  pic18f: {
    name: "PIC18F",
    description: "The PIC18F is a high-performance 8-bit microcontroller with advanced peripherals and USB support.",
    pinCount: 28,
  },
};

const topics = [
  { id: "leds", name: "LEDs & Displays", icon: Lightbulb, color: "from-yellow-500 to-orange-500" },
  { id: "sensors", name: "Sensors", icon: Thermometer, color: "from-primary to-cyan-400" },
  { id: "motors", name: "Motors & Actuators", icon: Cog, color: "from-accent to-emerald-400" },
  { id: "timers", name: "Timers & Counters", icon: Clock, color: "from-purple-500 to-pink-500" },
  { id: "communication", name: "Communication", icon: Wifi, color: "from-blue-500 to-indigo-500" },
];

const MicrocontrollerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const mcData = microcontrollerData[id || "atmega328p"];

  if (!mcData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Microcontroller not found</h1>
          <Link to="/hub">
            <Button variant="hero">Back to Hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Generate pin positions for the chip visualization
  const leftPins = Array.from({ length: mcData.pinCount / 2 }, (_, i) => i + 1);
  const rightPins = Array.from({ length: mcData.pinCount / 2 }, (_, i) => mcData.pinCount - i);

  const pinLabels: Record<number, string> = {
    1: "RESET",
    2: "PD0 (RX)",
    3: "PD1 (TX)",
    7: "VCC",
    8: "GND",
    14: "PB0",
    19: "ADC6",
    20: "AVCC",
    21: "AREF",
    22: "GND",
    28: "PC5 (SCL)",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/hub">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold gradient-text">{mcData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Interactive Chip Diagram - Top 70% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 mb-12"
          style={{ minHeight: "60vh" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Interactive Pin Diagram</h2>
            <p className="text-muted-foreground">Hover over pins to see their functions</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Chip Body */}
              <div className="relative w-48 h-80 bg-secondary rounded-lg border-2 border-muted flex items-center justify-center">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-background rounded-b-full border-2 border-t-0 border-muted" />
                
                {/* Chip Label */}
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{mcData.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {mcData.pinCount}-PIN DIP
                  </div>
                </div>
              </div>

              {/* Left Pins */}
              <div className="absolute left-0 top-6 bottom-6 -translate-x-full pr-2 flex flex-col justify-between">
                {leftPins.map((pin) => (
                  <motion.div
                    key={pin}
                    onMouseEnter={() => setHoveredPin(pin)}
                    onMouseLeave={() => setHoveredPin(null)}
                    className="relative flex items-center gap-2 cursor-pointer group"
                  >
                    <span className={`text-xs font-mono transition-colors ${
                      hoveredPin === pin ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {pin}
                    </span>
                    <div className={`w-8 h-2 rounded-l transition-all ${
                      hoveredPin === pin 
                        ? "bg-primary glow-cyan" 
                        : "bg-muted-foreground/50"
                    }`} />
                    
                    {/* Tooltip */}
                    {hoveredPin === pin && pinLabels[pin] && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-full mr-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg whitespace-nowrap"
                      >
                        {pinLabels[pin]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Right Pins */}
              <div className="absolute right-0 top-6 bottom-6 translate-x-full pl-2 flex flex-col justify-between">
                {rightPins.map((pin) => (
                  <motion.div
                    key={pin}
                    onMouseEnter={() => setHoveredPin(pin)}
                    onMouseLeave={() => setHoveredPin(null)}
                    className="relative flex items-center gap-2 cursor-pointer group"
                  >
                    <div className={`w-8 h-2 rounded-r transition-all ${
                      hoveredPin === pin 
                        ? "bg-primary glow-cyan" 
                        : "bg-muted-foreground/50"
                    }`} />
                    <span className={`text-xs font-mono transition-colors ${
                      hoveredPin === pin ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {pin}
                    </span>
                    
                    {/* Tooltip */}
                    {hoveredPin === pin && pinLabels[pin] && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-full ml-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg whitespace-nowrap"
                      >
                        {pinLabels[pin]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            {mcData.description}
          </p>
        </motion.div>

        {/* Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Choose a Topic
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => navigate(`/level-select/${id}/${topic.id}`)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 hover:border-primary/50 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative z-10 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${topic.color}`}>
                    <topic.icon className="w-6 h-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{topic.name}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MicrocontrollerDetail;
