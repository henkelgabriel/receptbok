import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider-komponenten som omsluter din app
export const AuthProvider = ({ children }) => {
  // Tillstånd för användarinformation och token
  const [user, setUser] = useState(null); // T.ex. { id, username, email, roles }
  const [token, setToken] = useState(localStorage.getItem("jwtToken")); // Försök hämta token från localStorage vid start
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Är inloggad om token finns

  // Backend API URL (ändra om din backend körs på en annan adress/port)
  const API_URL = "http://localhost:8080/api/auth/";

  // useEffect för att hantera token-ändringar
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      setIsAuthenticated(true);

      if (!user) {
      }
    } else {
      localStorage.removeItem("jwtToken");
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(API_URL + "signin", {
        username,
        password,
      });
      const {
        accessToken,
        id,
        username: respUsername,
        email,
        roles,
      } = response.data;

      setToken(accessToken);
      setUser({ id, username: respUsername, email, roles });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(API_URL + "signup", {
        username,
        email,
        password,
        role: ["user"],
      });
      return response.data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
