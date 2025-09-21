import { useState } from 'react';

const TokenForm = ({ onAuthenticated }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate token by attempting to fetch songs
      const response = await fetch("/api/songs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      // Token is valid, pass it to parent component
      onAuthenticated(token);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="h4 text-center mb-4">
          Please enter your bearer token to get started
        </h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bearerToken" className="form-label fw-bold">
              Bearer Token
            </label>
            <input
              type="text"
              className="form-control"
              id="bearerToken"
              placeholder="Enter your token here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-smdb rounded-0 w-100 fw-bold"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenForm;