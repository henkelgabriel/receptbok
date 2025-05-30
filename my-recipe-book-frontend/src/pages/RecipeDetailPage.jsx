import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/recipes';

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Kunde inte hämta recept:", err);
        setError("Kunde inte ladda receptet.");
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Är du säker på att du vill ta bort receptet "${recipe.title}"?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        alert('Recept borttaget!');
        navigate('/');
      } catch (err) {
        console.error("Fel vid borttagning av recept:", err.response ? err.response.data : err.message);
        setError("Kunde inte ta bort receptet.");
      }
    }
  };

  if (loading) return <div className="text-center my-5">Laddar recept...</div>;
  if (error) return <div className="alert alert-danger text-center my-5" role="alert">{error}</div>;
  if (!recipe) return <div className="text-center my-5">Receptet hittades inte.</div>;

  return (
    <div className="container my-5 recipe-detail-page">
      <h2 className="mb-4 text-center">{recipe.title}</h2>

      {recipe.imageUrl && (
        <div className="text-center mb-4">
          <img src={recipe.imageUrl} alt={recipe.title} className="img-fluid rounded shadow-sm" style={{ maxWidth: '600px', maxHeight: '400px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="card p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Beskrivning:</h3>
        <p className="lead">{recipe.description}</p>
      </div>

      {recipe.ingredients && recipe.ingredients.trim() !== '' && (
        <div className="card p-4 mb-4 shadow-sm">
          <h3 className="mb-3">Ingredienser:</h3>
          <ul className="list-unstyled">
            {recipe.ingredients.split('\n').map((item, index) => (
              item.trim() !== '' && <li key={index} className="mb-2">{item.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions && recipe.instructions.trim() !== '' && (
        <div className="card p-4 mb-4 shadow-sm">
          <h3 className="mb-3">Instruktioner:</h3>
          <ol className="list-group list-group-numbered">
            {recipe.instructions.split('\n').map((item, index) => (
              item.trim() !== '' && <li key={index} className="list-group-item border-0 ps-0">{item.trim()}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="d-flex justify-content-center gap-2 mt-4">
        <button onClick={() => navigate(`/edit/${recipe.id}`)} className="btn btn-cookbook-primary">Redigera Recept</button>
        <button onClick={handleDelete} className="btn btn-danger">Ta bort Recept</button>
      </div>
      <div className="d-grid mt-3">
        <button onClick={() => navigate('/')} className="btn btn-secondary">Tillbaka till alla recept</button>
      </div>
    </div>
  );
}

export default RecipeDetailPage;