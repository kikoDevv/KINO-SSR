const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
app.use(express.static('public'));

//--rout to index
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        const movies = data.data.map(movie => ({
            title: movie.attributes.title,
            description: movie.attributes.intro,
            image: movie.attributes.image.url
        }));
        res.render('index', { title: 'Kino', movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});
//---rout to moviesInfo
app.get('/moviesInfo.pug', (req, res) => {
    res.render('moviesInfo.pug');
  });
app.listen(5080, () => {
    console.log('Server running on 5080');
});