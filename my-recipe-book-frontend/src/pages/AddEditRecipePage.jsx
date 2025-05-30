import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: null,
    imageUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/recipes';

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/${id}`);
          setRecipe({
            ...response.data,
            image: null 
          });
        } catch (err) {
          console.error("Kunde inte hämta recept för redigering:", err);
          setError("Kunde inte ladda receptet för redigering.");
        }
      };
      fetchRecipe();
    } else {
      setIsEditing(false);
      setRecipe({
        title: '', description: '', ingredients: '', instructions: '', image: null, imageUrl: ''
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipe(prev => ({ ...prev, image: files[0] }));
    } else {
      setRecipe(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    if (recipe.image) {
      formData.append('image', recipe.image);
    } else if (isEditing && recipe.imageUrl) {
      formData.append('imageUrl', recipe.imageUrl); 
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Recept uppdaterat!');
      } else {
        await axios.post(API_BASE_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Recept tillagt!');
      }
      navigate('/');
    } catch (err) {
      console.error("Fel vid sparande av recept:", err.response ? err.response.data : err.message);
      setError("Kunde inte spara recept. Kontrollera dina inmatningar och backend.");
    }
  };

  return (
    <div className="container my-5 recipe-form-page"> {}
      <h2 className="mb-4 text-center">{isEditing ? 'Redigera Recept' : 'Lägg till Nytt Recept'}</h2> {}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>} {}
      <form onSubmit={handleSubmit}>
        <div className="mb-3"> {/}
          <label htmlFor="title" className="form-label">Titel:</label> {}
          <input
            type="text"
            id="title"
            name="title"
            className="form-control" 
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Beskrivning:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredienser (en per rad):</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-control"
            value={recipe.ingredients}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">Instruktioner:</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-control"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Receptbild:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control" 
            accept="image/*"
            onChange={handleChange}
          />
          {}
          {isEditing && recipe.imageUrl && !recipe.image && (
            <img src={recipe.imageUrl} alt="Nuvarande bild" className="img-thumbnail mt-3 d-block mx-auto" style={{ maxWidth: '200px' }} />
          )}
          {}
          {recipe.image && (
            <img src={URL.createObjectURL(recipe.image)} alt="Ny bild" className="img-thumbnail mt-3 d-block mx-auto" style={{ maxWidth: '200px' }} />
          )}
        </div>
        <div className="d-grid gap-2"> {}
          <button type="submit" className="btn btn-cookbook-primary"> {}
            {isEditing ? 'Spara Ändringar' : 'Lägg till Recept'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditRecipePage;