const express = require('express')
const app = express()
const dbConnection = require('./src/config/database')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser('cookieSig'))
const { checkAuth } = require('./src/api/middleware/checkAuthentication')


//routes 
const authRoutes = require('./src/api/routes/auth')
const transactionRoutes = require('./src/api/routes/transaction')
const gameRoute = require('./src/api/routes/game')

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/transaction', checkAuth, transactionRoutes)
app.use('/api/v1/games', checkAuth, gameRoute)


const start = async () => { 
    try { 
        await dbConnection()
        app.listen(3007,()=> {
            console.log('app is running on ')
        })
    } catch(error) { 
        console.log(error)
    }

}

start()