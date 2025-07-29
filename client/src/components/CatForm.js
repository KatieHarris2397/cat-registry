import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { catsAPI } from '../services/api';

const CatForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    color: '',
    weight: '',
    owner: '',
    phone: '',
    email: '',
    microchipId: '',
    vaccinated: false,
    neutered: false,
    notes: ''
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchCat();
    }
  }, [id]);

  const fetchCat = async () => {
    try {
      setLoading(true);
      const cat = await catsAPI.getById(id);
      setFormData(cat);
    } catch (err) {
      setError('Failed to load cat data');
      console.error('Error fetching cat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing) {
        await catsAPI.update(id, formData);
        setSuccess('Cat updated successfully!');
      } else {
        await catsAPI.create(formData);
        setSuccess('Cat registered successfully!');
      }
      
      setTimeout(() => {
        navigate('/cats');
      }, 1500);
    } catch (err) {
      setError(isEditing ? 'Failed to update cat' : 'Failed to register cat');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="loading">Loading cat data...</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="flex flex-between mb-20">
          <h1>{isEditing ? 'Edit Cat' : 'Register New Cat'}</h1>
          <button 
            onClick={() => navigate('/cats')} 
            className="btn btn-secondary"
          >
            <FaArrowLeft /> Back to Cats
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            {/* Cat Information */}
            <div>
              <h3>Cat Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Cat Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="breed">Breed *</label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age (years) *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  max="30"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color *</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="microchipId">Microchip ID</label>
                <input
                  type="text"
                  id="microchipId"
                  name="microchipId"
                  value={formData.microchipId}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Owner Information */}
            <div>
              <h3>Owner Information</h3>
              
              <div className="form-group">
                <label htmlFor="owner">Owner Name *</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Any additional notes about the cat..."
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="card mt-20">
            <h3>Medical Information</h3>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={formData.vaccinated}
                    onChange={handleChange}
                  />
                  Vaccinated
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="neutered"
                    checked={formData.neutered}
                    onChange={handleChange}
                  />
                  Neutered/Spayed
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              <FaSave /> {loading ? 'Saving...' : (isEditing ? 'Update Cat' : 'Register Cat')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatForm; 