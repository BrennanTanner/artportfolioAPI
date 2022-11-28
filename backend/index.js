require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3030;
const cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use('/api', routes);

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
