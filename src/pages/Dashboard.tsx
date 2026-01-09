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
  Loader,
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
import { useUserPoints, useLeaderboard } from "@/hooks/usePoints";
import { useWeeklyXp } from "@/hooks/useWeeklyXp";

/* =======================
   Helpers
======================= */

function calculateDayStreak(
  weeklyXp: { day: string; xp: number }[],
): number {
  let streak = 0;
  for (let i = weeklyXp.length - 1; i >= 0; i--) {
    if (weeklyXp[i].xp > 0) streak++;
    else break;
  }
  return streak;
}

/* =======================
   Static Catalog (NO STATE)
======================= */

const MODULE_CATALOG = [
  { name: "LED Basics", xp: 100 },
  { name: "Digital I/O", xp: 150 },
  { name: "Analog Sensors", xp: 200 },
  { name: "PWM Control", xp: 250 },
  { name: "Timers", xp: 300 },
];

const accuracyData = [
  { name: "Accuracy", value: 78, fill: "hsl(168, 100%, 50%)" },
];

/* =======================
   Component
======================= */

const Dashboard = () => {
  const { points, loading: pointsLoading } = useUserPoints();
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard();

  const token = localStorage.getItem("token") ?? "";
  const { weeklyXp, loading: weeklyXpLoading } = useWeeklyXp(token);

  if (pointsLoading || weeklyXpLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  /* =======================
     DERIVED STATE (IMPORTANT)
  ======================= */

  const completedModuleNames = new Set(
    points?.completedModules?.map((m) => m.moduleName) ?? [],
  );

  const derivedModules = MODULE_CATALOG.map((module, index) => {
    const completed = completedModuleNames.has(module.name);
    const locked =
      index !== 0 &&
      !completedModuleNames.has(MODULE_CATALOG[index - 1].name);

    return { ...module, completed, locked };
  });

  const completedModules = derivedModules.filter((m) => m.completed).length;
  const lockedModules = derivedModules.filter((m) => m.locked).length;

  const totalXp = points?.totalXp ?? 0;
  const dayStreak = calculateDayStreak(weeklyXp);

  const userRank =
    leaderboard.findIndex((u) => u.name === points?.name) + 1 || "—";

  const stats = [
    { label: "Total XP", value: totalXp, icon: Zap, color: "text-primary" },
    { label: "Day Streak", value: dayStreak, icon: Flame, color: "text-orange-500" },
    { label: "Quiz Accuracy", value: "78%", icon: Target, color: "text-accent" },
    { label: "Rank", value: `#${userRank}`, icon: Trophy, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex items-center gap-4">
            <Link to="/hub">
              <Button variant="ghost" size="icon">
                <ArrowLeft />
              </Button>
            </Link>
            <Cpu className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Dashboard</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-xl">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div className="text-3xl font-bold mt-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-semibold">Module Progress</h3>
            <span className="text-sm text-muted-foreground">
              {completedModules} Completed · {lockedModules} Locked
            </span>
          </div>

          <div className="space-y-3">
            {derivedModules.map((module) => (
              <div
                key={module.name}
                className={`flex justify-between p-4 rounded-xl border ${
                  module.completed
                    ? "bg-accent/10 border-accent/30"
                    : module.locked
                    ? "opacity-60"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="flex gap-3">
                  {module.locked ? <Lock /> : <BookOpen />}
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {module.xp} XP
                    </div>
                  </div>
                </div>
                {module.completed && (
                  <span className="text-accent font-medium">Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        {!leaderboardLoading && leaderboard.length > 0 && (
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Top Learners</h3>
            {leaderboard.slice(0, 5).map((user) => (
              <div key={user.id} className="flex justify-between p-3">
                <span>{user.name}</span>
                <span>{user.points} pts</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
