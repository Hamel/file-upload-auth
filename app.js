const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')

const upload = require('./uploader/upload')

const { MONGOURI } = require('./keys')

const app = express()
const PORT = 5000

app.use(cors())

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to db');
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting', err);
})

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})