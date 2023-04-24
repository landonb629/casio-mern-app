const express = require('express')
const Router = express.Router()

const {showBalance, deposit, withdrawl, showTransaction} = require('../controllers/transaction')

Router.route('/').get(showBalance);
Router.route('/transactions').get(showTransaction)
Router.route('/deposit').patch(deposit);
Router.route('/withdraw').patch(withdrawl)


module.exports = Router;