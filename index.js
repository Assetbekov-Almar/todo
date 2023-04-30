const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
async function main() {
    console.log('connected to mongodb');
    await mongoose.connect(mongoDB);
}

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(error.status || 500).json({ error: 'An error occurred while processing the request' });
});

app.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
});
