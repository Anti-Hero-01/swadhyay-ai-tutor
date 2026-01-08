import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Trophy,
  Settings,
  LogOut,
  Cpu,
  ChevronRight,
} from "lucide-react";

interface Microcontroller {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  features: string[];
  color: string;
}

const microcontrollers: Microcontroller[] = [
  {
    id: "atmega328p",
    name: "ATmega328P",
    shortDesc: "Arduino's heart",
    description: "The backbone of Arduino Uno. Perfect for beginners with extensive community support and countless project tutorials.",
    features: ["8-bit AVR", "16MHz", "32KB Flash", "Arduino Compatible"],
    color: "from-primary to-cyan-400",
  },
  {
    id: "8051",
    name: "8051",
    shortDesc: "Industry classic",
    description: "A timeless classic in embedded systems. Master the fundamentals with this industry-standard architecture.",
    features: ["8-bit CISC", "12MHz", "4KB ROM", "128B RAM"],
    color: "from-accent to-emerald-400",
  },
  {
    id: "8085",
    name: "8085",
    shortDesc: "Academic favorite",
    description: "The ideal processor for understanding computer architecture fundamentals and assembly programming.",
    features: ["8-bit CPU", "3MHz", "64KB Address", "SOD/SID"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "pic18f",
    name: "PIC18F",
    shortDesc: "Industrial power",
    description: "High-performance microcontroller for industrial applications with advanced peripherals and low power consumption.",
    features: ["8-bit PIC", "40MHz", "128KB Flash", "USB Ready"],
    color: "from-orange-500 to-yellow-500",
  },
];

const Hub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "My Account", path: "/account" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold gradient-text">Swadhyay</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold gradient-text">Swadhyay</span>
            </div>
          </div>
          <Link to="/dashboard">
            <Button variant="heroOutline" size="sm">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Choose Your</span>{" "}
            <span className="gradient-text">Microcontroller</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a platform to begin your learning journey. Each comes with
            comprehensive modules, hands-on simulations, and quizzes.
          </p>
        </motion.div>

        {/* Microcontroller Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {microcontrollers.map((mc, index) => (
            <motion.div
              key={mc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(mc.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              <Link to={`/microcontroller/${mc.id}`}>
                <div
                  className={`relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 ${
                    hoveredCard === mc.id
                      ? "scale-105 border-primary/50"
                      : hoveredCard
                      ? "scale-95 opacity-60"
                      : ""
                  }`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Chip Icon */}
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${mc.color} mb-6`}
                    >
                      <Cpu className="w-8 h-8 text-background" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {mc.name}
                    </h2>
                    <p className="text-sm text-primary font-medium mb-4">
                      {mc.shortDesc}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {mc.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {mc.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Start Learning</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hub;
