/* eslint-disable @typescript-eslint/no-explicit-any */

const API_URL = "http://localhost:3000";

/* =======================
   Token Helpers
======================= */

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function clearToken(): void {
  localStorage.removeItem("token");
}

/* =======================
   Auth APIs
======================= */

export async function loginUser(email: string, password: string): Promise<{
  token: string;
}> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  // 🔑 STORE TOKEN IMMEDIATELY
  if (data.token) {
    setToken(data.token);
  }

  return { token: data.token };
}

export async function signupUser(
  name: string,
  email: string,
  password: string,
): Promise<{
  id: string;
  name: string;
  email: string;
}> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
}

/* =======================
   Generic Authenticated API
======================= */

export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API Error: ${response.status}`);
  }

  return response.json();
}

/* =======================
   Points APIs
======================= */

export function getUserPoints() {
  return apiCall<{
    points: number;
    totalXp: number;
    name: string;
    completedModules: {
      moduleName: string;
      pointsEarned: number;
      completedAt: string;
    }[];
  }>("/points/user-points");
}

export function getPointsHistory(limit = 10) {
  return apiCall<
    {
      points: number;
      reason: string;
      moduleName: string | null;
      createdAt: string;
    }[]
  >(`/points/history?limit=${limit}`);
}

export function getWeeklyXp() {
  return apiCall<{ day: string; xp: number }[]>(
    "/points/weekly-xp",
  );
}

export function getLeaderboard(limit = 100) {
  return apiCall<
    {
      id: string;
      name: string;
      points: number;
      totalXp: number;
      rank: number;
    }[]
  >(`/points/leaderboard?limit=${limit}`);
}

/* =======================
   Chat API
======================= */

export async function sendChatMessage(
  message: string,
  context?: Record<string, unknown>,
) {
  return apiCall("/chat", {
    method: "POST",
    body: JSON.stringify({ message, context }),
  });
}
