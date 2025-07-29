# Cat Registry Application

A full-stack web application for managing cat registrations with a React frontend and Express backend.

## Features

- **Dashboard**: View statistics and recent cat registrations
- **Cat Management**: Add, edit, view, and delete cat records
- **Search Functionality**: Search cats by name, breed, owner, or microchip ID
- **Detailed Cat Profiles**: View comprehensive information about each cat
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## Cat Information Tracked

- **Basic Info**: Name, breed, age, color, weight
- **Owner Details**: Owner name, phone, email
- **Medical Status**: Vaccination and neutering status
- **Identification**: Microchip ID
- **Additional Notes**: Custom notes about the cat
- **Registration Date**: Automatic timestamp

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **CORS** for cross-origin requests
- **UUID** for unique ID generation
- **Body-parser** for request parsing

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API communication
- **React Icons** for beautiful icons
- **CSS3** with modern styling and animations

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd cat-registry
   ```

2. **Install all dependencies**
   ```bash
   # Install all dependencies (recommended)
   npm run install-all
   
   # Or install manually:
   # Root dependencies
   npm install
   
   # Backend dependencies
   cd server && npm install && cd ..
   
   # Frontend dependencies
   cd client && npm install && cd ..
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and backend (recommended)
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server
   
   # Frontend only (in a separate terminal)
   npm run client
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Dashboard
- View total number of registered cats
- See vaccination and neutering statistics
- Browse recently registered cats
- Quick access to all features

### Adding a Cat
1. Click "Add New Cat" from the navigation or cat list
2. Fill in the required information (name, breed, age, color, owner)
3. Add optional details like weight, microchip ID, contact info
4. Mark vaccination and neutering status
5. Add any additional notes
6. Click "Register Cat" to save

### Managing Cats
- **View**: Click "View" to see detailed cat information
- **Edit**: Click "Edit" to modify cat details
- **Delete**: Click "Delete" to remove a cat (with confirmation)

### Searching
- Use the search page to find cats by:
  - Cat name
  - Breed
  - Owner name
  - Microchip ID
- Partial matches are supported
- Results show all matching cats with quick action buttons

## API Endpoints

### Cats
- `GET /api/cats` - Get all cats
- `GET /api/cats/:id` - Get a specific cat
- `POST /api/cats` - Create a new cat
- `PUT /api/cats/:id` - Update a cat
- `DELETE /api/cats/:id` - Delete a cat
- `GET /api/cats/search/:query` - Search cats

### Statistics
- `GET /api/stats` - Get registry statistics

## Project Structure

```
cat-registry/
├── server/
│   ├── index.js          # Express server and API routes
│   └── package.json      # Backend dependencies
├── client/
│   ├── public/
│   │   └── index.html    # Main HTML file
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── CatList.js
│   │   │   ├── CatForm.js
│   │   │   ├── CatDetail.js
│   │   │   └── SearchCats.js
│   │   ├── services/
│   │   │   └── api.js    # API service functions
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # App-specific styles
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Frontend dependencies
├── package.json          # Root workspace configuration
└── README.md            # This file
```

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server
- `npm run install-all` - Install dependencies for all parts of the application

### Data Storage

Currently, the application uses in-memory storage for simplicity. In a production environment, you would want to:

1. Add a database (MongoDB, PostgreSQL, etc.)
2. Implement proper data persistence
3. Add user authentication
4. Add data validation and sanitization
5. Implement proper error handling

## Customization

### Adding New Fields
To add new fields to the cat registration:

1. Update the backend data structure in `server/index.js`
2. Modify the form in `client/src/components/CatForm.js`
3. Update the display components (`CatList.js`, `CatDetail.js`)
4. Add appropriate validation

### Styling
The application uses CSS classes for styling. Main styles are in:
- `client/src/index.css` - Global styles and component styles
- `client/src/App.css` - Navigation and layout styles

### API Configuration
The frontend is configured to connect to `http://localhost:5000` by default. To change this:

1. Set the `REACT_APP_API_URL` environment variable
2. Or modify the `API_BASE_URL` in `client/src/services/api.js`

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `server/index.js` (line 8)
   - Or kill the process using the port

2. **CORS errors**
   - Ensure the backend is running on port 5000
   - Check that CORS is properly configured in the server

3. **Frontend not connecting to backend**
   - Verify both servers are running
   - Check the API URL configuration
   - Ensure the proxy setting in `client/package.json` is correct

4. **Dependencies not found**
   - Run `npm install` in both root and client directories
   - Clear npm cache: `npm cache clean --force`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Create an issue in the repository

---

**Happy Cat Registry Management! 🐱** 