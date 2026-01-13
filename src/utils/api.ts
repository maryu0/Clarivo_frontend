// API base configuration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem("clarivoToken");
}

// Save auth token to localStorage
export function saveAuthToken(token: string) {
  localStorage.setItem("clarivoToken", token);
}

// Remove auth token from localStorage
export function removeAuthToken() {
  localStorage.removeItem("clarivoToken");
}

// Generic API request handler
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  return apiRequest("/health");
}

// Session API
export const sessionAPI = {
  // Get all sessions
  getAll: async (params?: {
    limit?: number;
    skip?: number;
    language?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.skip) queryParams.append("skip", params.skip.toString());
    if (params?.language) queryParams.append("language", params.language);

    const query = queryParams.toString();
    return apiRequest(`/api/sessions${query ? "?" + query : ""}`);
  },

  // Get session statistics
  getStats: async () => {
    return apiRequest("/api/sessions/stats");
  },

  // Get session by ID
  getById: async (id: string) => {
    return apiRequest(`/api/sessions/${id}`);
  },

  // Delete session
  delete: async (id: string) => {
    return apiRequest(`/api/sessions/${id}`, {
      method: "DELETE",
    });
  },
};

// Speech API (placeholder for Azure Speech Services)
export const speechAPI = {
  // Analyze speech audio
  analyze: async (
    audioData: string,
    targetPhrase: string,
    language = "en-US"
  ) => {
    return apiRequest("/api/speech/analyze", {
      method: "POST",
      body: JSON.stringify({ audioData, targetPhrase, language }),
    });
  },

  // Text-to-speech synthesis
  synthesize: async (text: string, language = "en-US") => {
    return apiRequest("/api/speech/synthesize", {
      method: "POST",
      body: JSON.stringify({ text, language }),
    });
  },
};

// User API
export const userAPI = {
  // Get all users
  getAll: async () => {
    return apiRequest("/api/users");
  },

  // Get user by ID
  getById: async (id: string) => {
    return apiRequest(`/api/users/${id}`);
  },

  // Create new user
  create: async (userData: {
    name: string;
    email: string;
    preferredLanguage?: string;
  }) => {
    return apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (
    id: string,
    userData: {
      name?: string;
      email?: string;
      preferredLanguage?: string;
    }
  ) => {
    return apiRequest(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  delete: async (id: string) => {
    return apiRequest(`/api/users/${id}`, {
      method: "DELETE",
    });
  },
};

// Auth API
export const authAPI = {
  // Register new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
  }) => {
    const response = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.success && response.token) {
      saveAuthToken(response.token);
    }

    return response;
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      saveAuthToken(response.token);
    }

    return response;
  },

  // Get current user
  getMe: async () => {
    return apiRequest("/api/auth/me");
  },

  // Logout (clear token)
  logout: () => {
    removeAuthToken();
  },
};

export default {
  checkHealth,
  sessions: sessionAPI,
  speech: speechAPI,
  users: userAPI,
  auth: authAPI,
};
