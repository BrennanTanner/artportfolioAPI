require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3030;


mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();



app.use(cors());

app.use('/api', routes);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
