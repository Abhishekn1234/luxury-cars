// src/api/auth.ts
import type { RegisterRequest, LoginRequest, AuthResponse } from "../types/types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  let data: any = {};
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function registerAdmin(data: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function loginAdmin(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

