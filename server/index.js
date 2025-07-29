const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for cats (in a real app, you'd use a database)
let cats = [
  {
    id: '1',
    name: 'Whiskers',
    breed: 'Persian',
    age: 3,
    color: 'White',
    weight: 4.5,
    owner: 'John Doe',
    phone: '555-0123',
    email: 'john@example.com',
    registeredDate: '2024-01-15',
    microchipId: 'CHIP001',
    vaccinated: true,
    neutered: true,
    notes: 'Very friendly and loves to cuddle'
  },
  {
    id: '2',
    name: 'Shadow',
    breed: 'Maine Coon',
    age: 5,
    color: 'Black',
    weight: 6.2,
    owner: 'Jane Smith',
    phone: '555-0456',
    email: 'jane@example.com',
    registeredDate: '2024-02-20',
    microchipId: 'CHIP002',
    vaccinated: true,
    neutered: false,
    notes: 'Loves to hunt and explore outdoors'
  },
  {
    id: '3',
    name: 'Luna',
    breed: 'Siamese',
    age: 2,
    color: 'Cream',
    weight: 3.8,
    owner: 'Mike Johnson',
    phone: '555-0789',
    email: 'mike@example.com',
    registeredDate: '2024-03-10',
    microchipId: 'CHIP003',
    vaccinated: true,
    neutered: true,
    notes: 'Very vocal and affectionate'
  }
];

// Routes

// Get all cats
app.get('/api/cats', (req, res) => {
  res.json(cats);
});

// Get a single cat by ID
app.get('/api/cats/:id', (req, res) => {
  const cat = cats.find(c => c.id === req.params.id);
  if (!cat) {
    return res.status(404).json({ message: 'Cat not found' });
  }
  res.json(cat);
});

// Add a new cat
app.post('/api/cats', (req, res) => {
  const newCat = {
    id: uuidv4(),
    ...req.body,
    registeredDate: new Date().toISOString().split('T')[0]
  };
  
  cats.push(newCat);
  res.status(201).json(newCat);
});

// Update a cat
app.put('/api/cats/:id', (req, res) => {
  const index = cats.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Cat not found' });
  }
  
  cats[index] = { ...cats[index], ...req.body };
  res.json(cats[index]);
});

// Delete a cat
app.delete('/api/cats/:id', (req, res) => {
  const index = cats.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Cat not found' });
  }
  
  const deletedCat = cats.splice(index, 1)[0];
  res.json({ message: 'Cat deleted successfully', cat: deletedCat });
});

// Search cats
app.get('/api/cats/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredCats = cats.filter(cat => 
    cat.name.toLowerCase().includes(query) ||
    cat.breed.toLowerCase().includes(query) ||
    cat.owner.toLowerCase().includes(query) ||
    cat.microchipId.toLowerCase().includes(query)
  );
  res.json(filteredCats);
});

// Get cat statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalCats: cats.length,
    vaccinatedCats: cats.filter(cat => cat.vaccinated).length,
    neuteredCats: cats.filter(cat => cat.neutered).length,
    averageAge: cats.reduce((sum, cat) => sum + cat.age, 0) / cats.length,
    breeds: [...new Set(cats.map(cat => cat.breed))],
    colors: [...new Set(cats.map(cat => cat.color))]
  };
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 