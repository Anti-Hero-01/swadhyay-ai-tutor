import { useEffect, useState } from "react";

/* =======================
   Types
======================= */

export interface WeeklyXp {
  day: string;
  xp: number;
}

/* =======================
   Hook
======================= */

export function useWeeklyXp(token: string) {
  const [weeklyXp, setWeeklyXp] = useState<WeeklyXp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchWeeklyXp() {
      try {
        const res = await fetch(
          "http://localhost:3000/points/weekly-xp",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch weekly XP");
        }

        const data: WeeklyXp[] = await res.json();
        setWeeklyXp(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load weekly progress");
      } finally {
        setLoading(false);
      }
    }

    fetchWeeklyXp();
  }, [token]);

  return { weeklyXp, loading, error };
}
