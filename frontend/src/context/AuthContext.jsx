import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fra-atlas-auth";
const DEV_USERS = {
  "admin@example.com": {
    id: 1,
    fullName: "Admin User",
    role: "admin",
    token: "dev-admin-token",
  },
  "user@example.com": {
    id: 2,
    fullName: "Sample User",
    role: "user",
    token: "dev-user-token",
  },
};

const AuthContext = createContext();

const readInitialState = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { user: null, token: null };
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("[auth] Failed to parse stored auth state", error);
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(readInitialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!authState.user) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = async ({ email, password }) => {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.user || !data.token) {
            throw new Error("Invalid authentication response");
          }

          setAuthState({ user: data.user, token: data.token });
          return data.user;
        }

        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || "Unable to login");
      }
    } catch (error) {
      console.warn("[auth] API login failed, attempting development fallback", error);
    } finally {
      setIsLoading(false);
    }

    const fallbackUser = DEV_USERS[email];
    if (fallbackUser && password === "ChangeMe123!") {
      const user = {
        id: fallbackUser.id,
        email,
        fullName: fallbackUser.fullName,
        role: fallbackUser.role,
      };
      setAuthState({ user, token: fallbackUser.token });
      return user;
    }

    throw new Error("Invalid credentials");
  };

  const register = async ({ fullName, email, password }) => {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.user || !data.token) {
            throw new Error("Invalid registration response");
          }

          setAuthState({ user: data.user, token: data.token });
          return data.user;
        }

        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || "Unable to register");
      }
    } catch (error) {
      console.warn("[auth] API register failed, using development fallback", error);
    } finally {
      setIsLoading(false);
    }

    const user = {
      id: Date.now(),
      email,
      fullName,
      role: "user",
    };

    setAuthState({ user, token: "dev-user-token" });
    return user;
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
  };

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      isAuthenticated: Boolean(authState.user),
      isLoading,
      login,
      register,
      logout,
    }),
    [authState.user, authState.token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
