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

const handleResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  
  if (!res.ok) {
    // LOG THE REAL ERROR
    console.error(`API Error (${res.status}):`, text);
    throw new Error(text || `API Error: ${res.status}`);
  }

  try {
    return text ? JSON.parse(text) : ({} as T);
  } catch (err) {
    // If parsing fails, but the text is just a message, we can't guarantee it matches T.
    // This part of the logic might need adjustment based on your API's error responses.
    // For now, we'll throw so the caller knows the expected type wasn't returned.
    throw new Error(`Failed to parse JSON response: ${text}`);
  }
};

export const apiPost = async <T, B>(endpoint: string, body: B, token?: string | null): Promise<T> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(body),
    });
    return await handleResponse<T>(res);
  } catch (error) {
    // Pass the specific message up
    throw new Error(error instanceof Error ? error.message : "Network Error");
  }
};

export const apiGet = async <T>(endpoint: string, token?: string | null): Promise<T> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return await handleResponse<T>(res);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Network Error");
  }
};