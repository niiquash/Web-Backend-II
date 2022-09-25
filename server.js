require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(`Could not connect to the database. Error: ${error}`))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use(cors({
    origin: '*'
}))

const contactsRouter = require('./routes/contacts')
app.use('/contacts', contactsRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));