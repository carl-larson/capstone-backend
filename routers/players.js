const express = require('express')
const playersController = require('../controllers/players')
const { authenticate } = require('../middleware')
const router = express.Router()

router.get('/players', playersController.getAllPlayers)

router.get('/players:id', playersController.getPlayerById)

router.post('/players', playersController.createPlayer)

router.delete('/players:username', playersController.deletePlayerByUsername)

module.exports = router;