const express = require('express')
const Router = express.Router()

const {showBalance, deposit, withdrawl, showTransaction} = require('../controllers/transaction')

Router.route('/').get(showBalance);
Router.route('/transactions').get(showTransaction)
Router.route('/deposit').post(deposit);
Router.route('/withdraw').post(withdrawl)


module.exports = Router;