require('dotenv').config()
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(`Could not connect to the database. Error: ${error}`))
db.once('open', () => console.log('Connected to Database'))

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes/index'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Contacts API listening on port ${port}`));