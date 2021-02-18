const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')

const { JWT_SECRET } = require('../keys')

const User = mongoose.model('User')

// Protected route
router.get('/protected', requireLogin, (req, res) => {
    res.send('Hello user')
})

// Register new user
router.post('/signup', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please complete all fields" })
    }
    User.findOne({ email: email })
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({ error: "User already exists" })
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword
            })
    
            user.save()
            .then(user => {
                res.json({ message: "saved successfully" })
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// Login user
router.post('/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({ error: "Please provide a valid email or password" })
    }
    User.findOne({ email: email })
    .then(savedUser => {
        if(!savedUser){
           return res.status(422).json({ error: "Invalid email or password" })
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                const {_id, email} = savedUser
                res.json({ token, user: { _id, email } })
            } else {
                return res.status(422).json({ error: "Invalid email or password" })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

module.exports = router