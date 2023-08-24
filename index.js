const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(3000, () => { console.log("Server running") })