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

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
