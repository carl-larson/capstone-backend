const express = require('express')
const playersController = require('../controllers/players')
const { authenticate, logger } = require('../middleware')
const router = express.Router()

router.get('/players', playersController.getAllPlayers)

router.get('/players/:id', playersController.getPlayerById)

router.post('/players', authenticate, logger, playersController.createPlayer)

router.delete('/players/:username', authenticate, playersController.deletePlayerByUsername)

module.exports = router;