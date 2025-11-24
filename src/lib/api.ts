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
  if (!res.ok) {
    const text = await res.text();
    console.error(`API Error (${res.status}):`, text);
    throw new Error(text || `API Error: ${res.status}`);
  }

  // Handle cases with no content in the response body.
  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return {} as T; // Or null, depending on desired behavior for empty responses
  }

  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    // The response was not valid JSON, which is an error in this strict setup.
    console.error("Failed to parse JSON response:", text);
    throw new Error("Invalid JSON response from server.");
  }
};

export const apiPost = async <T, B>(endpoint: string, body: B, token?: string | null): Promise<T> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "A network error occurred.");
  }
};

export const apiGet = async <T>(endpoint: string, token?: string | null): Promise<T> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return handleResponse<T>(res);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "A network error occurred.");
  }
};