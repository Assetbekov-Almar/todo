const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
async function main() {
    console.log('connected to mongodb');
    await mongoose.connect(mongoDB);
}

const PORT = 3000;
const app = express();
app.use('/', routes);

app.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
});
