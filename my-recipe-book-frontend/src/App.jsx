import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEditRecipePage from './pages/AddEditRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './App.css'; // Vi lägger till grundläggande CSS här

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Enkel navigeringsmeny */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Alla Recept</Link>
            </li>
            <li>
              <Link to="/add">Lägg till Recept</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          {/* Här definieras dina rutter */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddEditRecipePage />} />
            <Route path="/edit/:id" element={<AddEditRecipePage />} /> 
            <Route path="/recipes/:id" element={<RecipeDetailPage />} /> {/* För detaljvy av ett recept */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;