const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
//--------serve static files from public directory-----
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index', { title: 'Kino', message: 'welcome' });
});

app.listen(5080, () => {
    console.log('Server running on 5080');
});