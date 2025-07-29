import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaPhone, FaEnvelope, FaCalendar } from 'react-icons/fa';
import { catsAPI } from '../services/api';

const CatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCat();
  }, [id]);

  const fetchCat = async () => {
    try {
      setLoading(true);
      const data = await catsAPI.getById(id);
      setCat(data);
    } catch (err) {
      setError('Failed to load cat details');
      console.error('Error fetching cat:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading cat details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cat) {
    return <div className="error">Cat not found</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="flex flex-between mb-20">
          <h1>{cat.name}</h1>
          <div className="flex gap-10">
            <button 
              onClick={() => navigate('/cats')} 
              className="btn btn-secondary"
            >
              <FaArrowLeft /> Back to Cats
            </button>
            <button 
              onClick={() => navigate(`/edit/${cat.id}`)} 
              className="btn btn-primary"
            >
              <FaEdit /> Edit Cat
            </button>
          </div>
        </div>

        <div className="grid grid-2">
          {/* Cat Information */}
          <div className="card">
            <h3>Cat Information</h3>
            <div className="cat-detail-info">
              <div className="info-row">
                <strong>Name:</strong> {cat.name}
              </div>
              <div className="info-row">
                <strong>Breed:</strong> 
                <span className="badge badge-success">{cat.breed}</span>
              </div>
              <div className="info-row">
                <strong>Age:</strong> {cat.age} years
              </div>
              <div className="info-row">
                <strong>Color:</strong> {cat.color}
              </div>
              <div className="info-row">
                <strong>Weight:</strong> {cat.weight} kg
              </div>
              <div className="info-row">
                <strong>Microchip ID:</strong> {cat.microchipId || 'Not specified'}
              </div>
              <div className="info-row">
                <strong>Registration Date:</strong> 
                <span className="registration-date">
                  <FaCalendar /> {cat.registeredDate}
                </span>
              </div>
            </div>

            <div className="medical-status mt-20">
              <h4>Medical Status</h4>
              <div className="status-badges">
                {cat.vaccinated ? (
                  <span className="badge badge-success">✓ Vaccinated</span>
                ) : (
                  <span className="badge badge-warning">✗ Not Vaccinated</span>
                )}
                {cat.neutered ? (
                  <span className="badge badge-success">✓ Neutered/Spayed</span>
                ) : (
                  <span className="badge badge-warning">✗ Not Neutered</span>
                )}
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="card">
            <h3>Owner Information</h3>
            <div className="owner-info">
              <div className="info-row">
                <strong>Owner:</strong> {cat.owner}
              </div>
              {cat.phone && (
                <div className="info-row">
                  <strong>Phone:</strong> 
                  <a href={`tel:${cat.phone}`} className="contact-link">
                    <FaPhone /> {cat.phone}
                  </a>
                </div>
              )}
              {cat.email && (
                <div className="info-row">
                  <strong>Email:</strong> 
                  <a href={`mailto:${cat.email}`} className="contact-link">
                    <FaEnvelope /> {cat.email}
                  </a>
                </div>
              )}
            </div>

            {cat.notes && (
              <div className="notes-section mt-20">
                <h4>Notes</h4>
                <div className="notes-content">
                  {cat.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mt-20">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button 
              onClick={() => navigate(`/edit/${cat.id}`)} 
              className="btn btn-primary"
            >
              <FaEdit /> Edit Cat Information
            </button>
            <button 
              onClick={() => navigate('/cats')} 
              className="btn btn-secondary"
            >
              View All Cats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatDetail; 