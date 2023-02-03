const express = require('express')
const Router = express.Router()


const {playGame, listGame, gameCreate} = require('../controllers/game')

Router.route('/').get(listGame)
Router.route('/play/:name').post(playGame)
Router.route('/create').post(gameCreate)

module.exports = Router;