import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Flame,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Lock,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

// Mock data
const weeklyProgress = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 80 },
  { day: "Wed", xp: 200 },
  { day: "Thu", xp: 150 },
  { day: "Fri", xp: 300 },
  { day: "Sat", xp: 180 },
  { day: "Sun", xp: 250 },
];

const accuracyData = [{ name: "Accuracy", value: 78, fill: "hsl(168, 100%, 50%)" }];

const stats = [
  { label: "Total XP", value: "2,450", icon: Zap, color: "text-primary" },
  { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-500" },
  { label: "Quiz Accuracy", value: "78%", icon: Target, color: "text-accent" },
  { label: "Rank", value: "#42", icon: Trophy, color: "text-yellow-500" },
];

const modules = [
  { name: "LED Basics", completed: true, xp: 100 },
  { name: "Digital I/O", completed: true, xp: 150 },
  { name: "Analog Sensors", completed: false, xp: 200, locked: false },
  { name: "PWM Control", completed: false, xp: 250, locked: true },
  { name: "Timers", completed: false, xp: 300, locked: true },
];

const Dashboard = () => {
  const completedModules = modules.filter((m) => m.completed).length;
  const lockedModules = modules.filter((m) => m.locked).length;

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
              <span className="text-xl font-bold gradient-text">Dashboard</span>
            </div>
          </div>
          <Link to="/hub">
            <Button variant="heroOutline" size="sm">
              Continue Learning
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* XP Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Weekly XP Progress
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(168, 100%, 50%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(168, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(0, 0%, 40%)"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(0, 0%, 40%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 5%)",
                      border: "1px solid hsl(0, 0%, 15%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(0, 0%, 98%)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="xp"
                    stroke="hsl(168, 100%, 50%)"
                    strokeWidth={2}
                    fill="url(#xpGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Accuracy Ring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quiz Accuracy
            </h3>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={accuracyData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: "hsl(0, 0%, 12%)" }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground">78%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modules Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Module Progress
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                <span className="text-accent font-medium">{completedModules}</span>{" "}
                Completed
              </span>
              <span className="text-muted-foreground">
                <span className="text-orange-500 font-medium">{lockedModules}</span>{" "}
                Locked
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {modules.map((module, index) => (
              <div
                key={module.name}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  module.completed
                    ? "bg-accent/10 border-accent/30"
                    : module.locked
                    ? "bg-secondary/50 border-border opacity-60"
                    : "bg-secondary border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      module.completed
                        ? "bg-accent/20 text-accent"
                        : module.locked
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {module.locked ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{module.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {module.xp} XP
                    </p>
                  </div>
                </div>
                {module.completed && (
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
