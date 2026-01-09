import { useState, useEffect, useCallback } from 'react';
import { apiCall } from '@/lib/api';

export interface UserPoints {
  points: number;
  totalXp: number;
  name: string;
  completedModules: Array<{
    moduleName: string;
    pointsEarned: number;
    completedAt: string;
  }>;
}

export const useUserPoints = () => {
  const [points, setPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch of user points
  const fetchUserPoints = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiCall('/points/user-points', {
        method: 'GET',
      });
      setPoints(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch points');
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    fetchUserPoints();

    // Poll for updates every 30 seconds (less aggressive)
    const pollInterval = setInterval(fetchUserPoints, 30000);

    return () => clearInterval(pollInterval);
  }, [fetchUserPoints]);

  // Function to complete a module and get points
  const completeModule = useCallback(
    async (moduleName: string, pointsToAward: number) => {
      try {
        const response = await apiCall('/points/complete-module', {
          method: 'POST',
          body: JSON.stringify({ moduleName, pointsToAward }),
        });

        if (response.success) {
          // Immediately update local state
          setPoints((prev) =>
            prev
              ? {
                  ...prev,
                  points: prev.points + pointsToAward,
                  totalXp: prev.totalXp + pointsToAward,
                }
              : null,
          );
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to complete module';
        setError(errorMsg);
        throw err;
      }
    },
    [],
  );

  return {
    points,
    loading,
    error,
    fetchUserPoints,
    completeModule,
  };
};

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<
    Array<{
      id: string;
      name: string;
      points: number;
      totalXp: number;
      rank: number;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiCall('/points/leaderboard?limit=100', {
        method: 'GET',
      });
      setLeaderboard(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();

    // Poll for leaderboard updates every 30 seconds (less aggressive)
    const pollInterval = setInterval(fetchLeaderboard, 30000);

    return () => clearInterval(pollInterval);
  }, [fetchLeaderboard]);

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard,
  };
};
