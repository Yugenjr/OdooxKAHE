import { createClient } from "@/lib/supabase/client";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Get Supabase auth token
export async function getAuthToken() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  return data?.session?.access_token;
}

// Generic API call with auth
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = await getAuthToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// GET request
export async function apiGet(endpoint: string) {
  return apiCall(endpoint, { method: "GET" });
}

// POST request
export async function apiPost(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT request
export async function apiPut(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE request
export async function apiDelete(endpoint: string) {
  return apiCall(endpoint, { method: "DELETE" });
}
