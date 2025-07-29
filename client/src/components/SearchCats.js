import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { catsAPI } from '../services/api';

const SearchCats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await catsAPI.search(searchQuery);
      setSearchResults(results);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search cats');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await catsAPI.delete(id);
        setSearchResults(searchResults.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Failed to delete cat');
        console.error('Error deleting cat:', err);
      }
    }
  };

  return (
    <div>
      <div className="card">
        <h1>Search Cats</h1>
        <p className="mb-20">Search for cats by name, breed, owner, or microchip ID</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form mb-20">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter cat name, breed, owner, or microchip ID..."
              className="form-control"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FaSearch /> {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        {/* Search Results */}
        {hasSearched && (
          <div className="search-results">
            <h3>
              Search Results for "{searchQuery}" 
              {!loading && <span className="result-count">({searchResults.length} found)</span>}
            </h3>

            {loading ? (
              <div className="loading">Searching...</div>
            ) : searchResults.length === 0 ? (
              <div className="no-results">
                <p>No cats found matching your search criteria.</p>
                <p>Try searching with different terms or check the spelling.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {searchResults.map(cat => (
                  <div key={cat.id} className="cat-card">
                    <div className="cat-header">
                      <h4>{cat.name}</h4>
                      <span className="badge badge-success">{cat.breed}</span>
                    </div>
                    
                    <div className="cat-info">
                      <p><strong>Owner:</strong> {cat.owner}</p>
                      <p><strong>Age:</strong> {cat.age} years</p>
                      <p><strong>Color:</strong> {cat.color}</p>
                      <p><strong>Weight:</strong> {cat.weight} kg</p>
                      <p><strong>Microchip:</strong> {cat.microchipId}</p>
                    </div>

                    <div className="cat-status mb-20">
                      {cat.vaccinated && <span className="badge badge-success">Vaccinated</span>}
                      {cat.neutered && <span className="badge badge-success">Neutered</span>}
                      {!cat.vaccinated && <span className="badge badge-warning">Not Vaccinated</span>}
                      {!cat.neutered && <span className="badge badge-warning">Not Neutered</span>}
                    </div>

                    <div className="cat-actions">
                      <Link to={`/cat/${cat.id}`} className="btn btn-secondary">
                        <FaEye /> View
                      </Link>
                      <Link to={`/edit/${cat.id}`} className="btn btn-primary">
                        <FaEdit /> Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="btn btn-danger"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Tips */}
        {!hasSearched && (
          <div className="search-tips">
            <h3>Search Tips</h3>
            <ul>
              <li>Search by cat name (e.g., "Whiskers", "Shadow")</li>
              <li>Search by breed (e.g., "Persian", "Maine Coon")</li>
              <li>Search by owner name (e.g., "John", "Jane")</li>
              <li>Search by microchip ID (e.g., "CHIP001")</li>
              <li>Partial matches are supported</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCats; 