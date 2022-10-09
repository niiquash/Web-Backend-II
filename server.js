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

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(express.json());
// app.use(cors({
//     origin: '*'
// }))

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(cors({ origin: '*' }))
    .use('/', require('./routes/index'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Contacts API listening on port ${port}`));