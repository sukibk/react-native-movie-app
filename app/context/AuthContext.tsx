import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite"; // For the User<Preferences> type
import {
  getCurrentUser,
  login,
  logout as logoutUser,
  createAccount,
} from "../utils/appwrite";
import React from "react";
import * as SecureStore from "expo-secure-store";

const SESSION_KEY = "appwrite-session-movieapp"; // unique key

// Type for AuthContext
type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const sessionId = await SecureStore.getItemAsync(SESSION_KEY);
      if (!sessionId) throw new Error("No session");

      const res = await getCurrentUser();
      setUser(res);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const session = await login(email, password);
    await SecureStore.setItemAsync(SESSION_KEY, session.$id); // Store session ID
    await loadUser();
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    await createAccount(email, password, name);
    await handleLogin(email, password);
  };

  const handleLogout = async () => {
    await logoutUser();
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
