// 
const API_BASE_URL = "https://klipsan-backend.onrender.com/api/v1";


const getHeaders = (token?: string | null) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};


export const apiPost = async (endpoint: string, body: any, token?: string | null) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network Error");
  }
};


export const apiGet = async (endpoint: string, token?: string | null) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(token),
    });

    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network Error");
  }
};