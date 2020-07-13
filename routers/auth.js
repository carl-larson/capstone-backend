const express = require('express')
const authController = require('../controllers/auth')
const playersController = require('../controllers/players')
const router = express.Router()

router.post('/signup', authController.signup, playersController.createPlayer)

router.post('/login', authController.login)

module.exports = router