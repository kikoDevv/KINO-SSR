const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
//--------serve static files from public directory-----
app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.render('index', { title: 'Kino', message: 'welcome' });
// });
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const data = await response.json();
        const movies = data.data.map(movie => ({
            title: movie.attributes.title,
            description: movie.attributes.intro,
            image: movie.attributes.image.url
        }));
        console.log(movies); // Log the movies to the console
        res.render('index', { title: 'Kino', movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});


app.listen(5080, () => {
    console.log('Server running on 5080');
});