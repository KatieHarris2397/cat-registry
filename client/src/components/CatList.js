import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { catsAPI } from '../services/api';

const CatList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const data = await catsAPI.getAll();
      setCats(data);
    } catch (err) {
      setError('Failed to load cats');
      console.error('Error fetching cats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await catsAPI.delete(id);
        setCats(cats.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Failed to delete cat');
        console.error('Error deleting cat:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading cats...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="flex flex-between mb-20">
          <h1>Cat Registry</h1>
          <Link to="/add" className="btn btn-primary">
            <FaPlus /> Add New Cat
          </Link>
        </div>

        {cats.length === 0 ? (
          <div className="text-center">
            <p>No cats registered yet.</p>
            <Link to="/add" className="btn btn-primary mt-20">
              <FaPlus /> Register Your First Cat
            </Link>
          </div>
        ) : (
          <div className="grid grid-3">
            {cats.map(cat => (
              <div key={cat.id} className="cat-card">
                <div className="cat-header">
                  <h3>{cat.name}</h3>
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
    </div>
  );
};

export default CatList; 