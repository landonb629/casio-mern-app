const express = require('express')
const Router = express.Router()

const {showBalance, deposit, withdrawl} = require('../controllers/transaction')

Router.route('/').get(showBalance);
Router.route('/deposit').patch(deposit);
Router.route('/withdrawl').patch(withdrawl)


module.exports = Router;