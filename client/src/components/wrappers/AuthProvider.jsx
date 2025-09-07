// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if already logged in when app starts
  const refreshUser = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
        setUser(res);
    } catch (err) {
        console.error(err);
        }
  };
  const logout = async () => {
      try {
          await axios.post(
              'http://localhost:5000/api/auth/logout',
              {},
              { withCredentials: true }
          );
          setUser(null);
      } catch (err) {
          console.error("Logout failed:", err);
      }
  };
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
