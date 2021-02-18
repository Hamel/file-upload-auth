const express = require('express')
const multer = require('multer')
const path = require('path')

// Set storage engine 
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Initialize Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 14000000 }
}).array('files', 60)

const app = express()

// Setting a static folder
app.use(express.static('./uploads'))