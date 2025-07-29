import React, { useState, useEffect } from 'react';
import { FaCat, FaSyringe, FaCut, FaChartLine } from 'react-icons/fa';
import { statsAPI, catsAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentCats, setRecentCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, catsData] = await Promise.all([
          statsAPI.getStats(),
          catsAPI.getAll()
        ]);
        
        setStats(statsData);
        // Get the 5 most recent cats
        setRecentCats(catsData.slice(-5).reverse());
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="card">
        <h1 className="text-center mb-20">Cat Registry Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-3 mb-20">
          <div className="card text-center">
            <FaCat className="stat-icon" />
            <h3>{stats.totalCats}</h3>
            <p>Total Cats</p>
          </div>
          
          <div className="card text-center">
            <FaSyringe className="stat-icon" />
            <h3>{stats.vaccinatedCats}</h3>
            <p>Vaccinated</p>
          </div>
          
          <div className="card text-center">
            <FaCut className="stat-icon" />
            <h3>{stats.neuteredCats}</h3>
            <p>Neutered</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-2 mb-20">
          <div className="card">
            <h3>Average Age</h3>
            <p className="stat-value">{stats.averageAge.toFixed(1)} years</p>
          </div>
          
          <div className="card">
            <h3>Breeds</h3>
            <p className="stat-value">{stats.breeds.length} different breeds</p>
            <div className="breed-tags">
              {stats.breeds.slice(0, 5).map(breed => (
                <span key={breed} className="badge badge-success">{breed}</span>
              ))}
              {stats.breeds.length > 5 && (
                <span className="badge badge-secondary">+{stats.breeds.length - 5} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Cats */}
        <div className="card">
          <h3>Recently Registered Cats</h3>
          {recentCats.length > 0 ? (
            <div className="grid grid-2">
              {recentCats.map(cat => (
                <div key={cat.id} className="cat-card">
                  <div className="cat-header">
                    <h4>{cat.name}</h4>
                    <span className="badge badge-success">{cat.breed}</span>
                  </div>
                  <p><strong>Owner:</strong> {cat.owner}</p>
                  <p><strong>Age:</strong> {cat.age} years</p>
                  <p><strong>Color:</strong> {cat.color}</p>
                  <div className="cat-status">
                    {cat.vaccinated && <span className="badge badge-success">Vaccinated</span>}
                    {cat.neutered && <span className="badge badge-success">Neutered</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No cats registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 