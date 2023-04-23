import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

let movies = [
  { id: 1, title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', quantity: 1000 },
  { id: 2, title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', quantity: 500 },
  { id: 3, title: 'The Dark Knight', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', quantity: 100 },
  { id: 4, title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', quantity: 200 }
];

// Get all movies
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  });
  

// Create a new movie
app.post('/movies', (req, res) => {
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity
  };
  movies.push(movie);
  console.log('New movie created:', movie);
  res.status(201).json(movie);
});

// Update a movie by id
app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  movie.title = req.body.title;
  movie.description = req.body.description;
  movie.quantity = req.body.quantity;
  console.log('Movie updated:', movie);
  res.status(200).json(movie);
});

// Delete a movie by id
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);
  console.log('Movie deleted:', req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});