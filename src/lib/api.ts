// src/lib/api.ts

const API_URL = "http://localhost:3000";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json(); // { access_token: string }
}
export async function signupUser(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
}
