import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaCat, FaHome, FaPlus, FaChartBar, FaSearch } from 'react-icons/fa';
import CatList from './components/CatList';
import CatForm from './components/CatForm';
import CatDetail from './components/CatDetail';
import Dashboard from './components/Dashboard';
import SearchCats from './components/SearchCats';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="nav-brand">
              <FaCat className="nav-icon" />
              <h1>Cat Registry</h1>
            </div>
            <ul className="nav-menu">
              <li><a href="/" className="nav-link"><FaHome /> Home</a></li>
              <li><a href="/cats" className="nav-link"><FaCat /> Cats</a></li>
              <li><a href="/add" className="nav-link"><FaPlus /> Add Cat</a></li>
              <li><a href="/search" className="nav-link"><FaSearch /> Search</a></li>
              <li><a href="/dashboard" className="nav-link"><FaChartBar /> Dashboard</a></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cats" element={<CatList />} />
              <Route path="/add" element={<CatForm />} />
              <Route path="/edit/:id" element={<CatForm />} />
              <Route path="/cat/:id" element={<CatDetail />} />
              <Route path="/search" element={<SearchCats />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App; 