// src/api/auth.ts
import  type { RegisterRequest, LoginRequest, AuthResponse } from "../types/types";


export async function registerAdmin(data: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function loginAdmin(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}
