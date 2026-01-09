import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../utils/api";

interface User {
  userId: string;
  name: string;
  email: string;
  preferredLanguage: string;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  fetchUser: (userId: string) => Promise<void>;
  createUser: (userData: {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
  }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("clarivoUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("clarivoUser");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("clarivoUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("clarivoUser");
    }
  }, [user]);

  const fetchUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.users.getById(userId);
      if (response.success) {
        setUser(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch user");
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.auth.register(userData);
      if (response.success) {
        setUser(response.user);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create user");
      console.error("Error creating user:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.auth.login({ email, password });
      if (response.success) {
        setUser(response.user);
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
      console.error("Error logging in:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.users.update(user.userId, userData);
      if (response.success) {
        setUser(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update user");
      console.error("Error updating user:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        updateUser,
        fetchUser,
        createUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
