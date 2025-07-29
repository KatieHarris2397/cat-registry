import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cats API
export const catsAPI = {
  // Get all cats
  getAll: async () => {
    const response = await api.get('/cats');
    return response.data;
  },

  // Get a single cat by ID
  getById: async (id) => {
    const response = await api.get(`/cats/${id}`);
    return response.data;
  },

  // Create a new cat
  create: async (catData) => {
    const response = await api.post('/cats', catData);
    return response.data;
  },

  // Update a cat
  update: async (id, catData) => {
    const response = await api.put(`/cats/${id}`, catData);
    return response.data;
  },

  // Delete a cat
  delete: async (id) => {
    const response = await api.delete(`/cats/${id}`);
    return response.data;
  },

  // Search cats
  search: async (query) => {
    const response = await api.get(`/cats/search/${query}`);
    return response.data;
  },
};

// Statistics API
export const statsAPI = {
  // Get statistics
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export default api; 