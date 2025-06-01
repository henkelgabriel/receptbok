// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddEditRecipePage from "./pages/AddEditRecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailPage";

import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Alla Recept</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/add-recipe">Lägg till Recept</Link>
              </li>

              <li style={{ marginLeft: "auto" }}>
                <span>Välkommen, {user?.username}!</span>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logga ut
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={{ marginLeft: "auto" }}>
                <Link to="/login">Logga in</Link>
              </li>
              <li>
                <Link to="/register">Registrera</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-recipe" element={<AddEditRecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="*" element={<div>404 - Sidan hittades inte</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
