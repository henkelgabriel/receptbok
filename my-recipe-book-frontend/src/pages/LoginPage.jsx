// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importera din AuthContext
import { useNavigate } from 'react-router-dom'; // För att omdirigera användaren

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Hämta login-funktionen från AuthContext
  const navigate = useNavigate(); // Hook för navigering

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra standardformulärinlämning
    setError(''); // Rensa eventuella tidigare fel

    try {
      await login(username, password); // Försök logga in
      navigate('/'); // Omdirigera till startsidan vid lyckad inloggning
      console.log('Login successful!');
    } catch (err) {
      // Hantera fel från backend (t.ex. felaktigt användarnamn/lösenord)
      setError(err.response?.data?.message || 'Inloggning misslyckades. Kontrollera dina uppgifter.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default LoginPage;