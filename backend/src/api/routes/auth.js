const express = require('express')
const Router = express()

const {register, login, checkRoute } = require('../controllers/auth')

Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/').get(checkRoute)


module.exports = Router;