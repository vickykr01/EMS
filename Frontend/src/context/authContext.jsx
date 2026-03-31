import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  const normalizedId = user._id || user.id;

  return {
    ...user,
    _id: normalizedId,
    id: normalizedId,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setUser(normalizeUser(response.data.user));
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user, token) => {
    setUser(normalizeUser(user));
    if (token) localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
