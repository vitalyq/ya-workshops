const express = require('express');
const showcase = require('./views/showcase');
const hashy = require('./hashy');

const app = express();

// Set up template engine
app.set('views', './views');
app.set('view engine', 'hash');
app.engine('hash', hashy);

app.get('/', (req, res) => {
  res.render('showcase', showcase);
});

app.listen(3000, () => {
  console.log('Ready on http://localhost:3000');
});
