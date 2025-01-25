const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
const fetch = require('node-fetch');

// Route to landing page
app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    const data = await response.json();
    const movies = data.data.map(movie => ({
      title: movie.attributes.title,
      intro: movie.attributes.intro,
      image: movie.attributes.image.url,
      publishedAt: movie.attributes.publishedAt
    }));
    res.render('index', { title: 'Kino', movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movies');
  }
});

// Route to moviesInfo
app.get('/movie-info', (req, res) => {
  const { title, image, intro, publishedAt } = req.query;
  const year = new Date(publishedAt).getFullYear();
  res.render('moviesInfo', { title, image, intro, publishedAt: year });
});

if (require.main === module) {
  app.listen(5080, () => {
    console.log('Runing on port:5080');
  });
} else {
  module.exports = app;
}