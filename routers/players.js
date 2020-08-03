const express = require('express')
const playersController = require('../controllers/players')
const { authenticate, logger } = require('../middleware')
const router = express.Router()

router.get('/players', playersController.getAllPlayers)

router.get('/players/:username', playersController.getPlayerByUsername)

router.get('/games/:username', playersController.getGameByUsername)

router.get('/games/all', playersController.getAllGames)

router.post('/games/', playersController.createGame)

router.put('/games/', playersController.updateGame)

// router.post('/players', authenticate, playersController.createPlayer)

router.delete('/games/', playersController.deleteGameById)

router.delete('/players/:username', playersController.deletePlayerByUsername)

module.exports = router;