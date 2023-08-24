const express = require('express');
const app = express();

const authorRoutes = require('../routes/author');
const bookRoutes = require('../routes/book');

app.use('/author', authorRoutes);
app.use('/book', bookRoutes);

module.exports = app;