import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/recipes';

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setRecipes(response.data);
    } catch (err) {
      console.error("Det gick inte att hämta recept:", err);
      setError("Kunde inte ladda recept. Se till att backend körs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center my-5">Laddar recept...</div>;
  if (error) return <div className="alert alert-danger text-center my-5" role="alert">{error}</div>;

  return (
    <div className="container my-5"> {/* Bootstrap container med vertikal marginal */}
      <h2 className="mb-4">Alla Recept</h2> {/* Rubrik med marginal nedåt */}
      <input
        type="text"
        className="form-control mb-4" // Bootstrap formulärkontroll och marginal nedåt
        placeholder="Sök recept..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRecipes.length === 0 && !loading && !error && (
        <p className="text-center text-muted">Inga recept att visa. <Link to="/add">Lägg till ett nytt!</Link></p>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* Bootstrap grid för responsiva receptkort */}
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="col"> {/* Varje kort i en kolumn */}
            <div className="card h-100 shadow-sm recipe-card"> {/* Bootstrap kort med skugga och höjd */}
              {recipe.imageUrl && <img src={recipe.imageUrl} className="card-img-top" alt={recipe.title} />} {/* Bild högst upp på kortet */}
              <div className="card-body"> {/* Kortets innehåll */}
                <h3 className="card-title text-center mb-3">{recipe.title}</h3> {/* Kortrubrik */}
                <p className="card-text text-muted">{recipe.description}</p> {/* Korttext */}
                <div className="d-grid mt-3"> {/* Bootstrap för att få knappen att fylla bredden */}
                  <Link to={`/recipes/${recipe.id}`} className="btn btn-cookbook-primary">Visa Recept</Link> {/* Anpassad knappstil */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;