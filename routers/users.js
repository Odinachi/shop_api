const { User } = require('../models/user')
const express = require('express')
const { route } = require('./products')
const router = express.Router()

router.get('/', async (req, res) => {
    const userList = await User.find()
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList)
})

router.post('/', (req, res) => {
    const newUser = User({ name: req.body.name, image: req.body.image })

    if (!newUser) {
        res.status(500).json({ success: false })
    }
    res.json(newUser)
})

module.exports = router
