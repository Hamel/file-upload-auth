const express = require('express')
const router = express.Router()

router.post('http://localhost:3000/', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            })
        } else {
            console.log(req.file)
            if(req.file == undefined){
                res.render('http://localhost:3000/', {
                    msg: 'Error: No file selected.'
                })
            } else {
                res.render('http://localhost:3000/', {
                    msg: 'File uploaded successfully!',
                    file: `uploads/${req.file.filename}`
                })
            }
        }
    })
})

module.exports = router