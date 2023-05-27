const express = require('express')
const app = express()
const dbConnection = require('./src/config/database')
const cookieParser = require('cookie-parser')

const { checkAuth } = require('./src/api/middleware/checkAuthentication')
const cors = require('cors')
// adding CORS domain to get around these errors
// need to add all for the origins to get away from 
const corsOptions = { 
    credentials: true,
    origin:  process.env.PASSENGER_APP_ENV ? '*' : 'http://localhost:3000',
    methods: ['GET', 'PATCH', 'POST', 'DELETE', 'PUT']
        
    
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())



//routes 
const authRoutes = require('./src/api/routes/auth')
const transactionRoutes = require('./src/api/routes/transaction')
const gameRoute = require('./src/api/routes/game')

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/transaction', checkAuth, transactionRoutes)
app.use('/api/v1/games', gameRoute)


const start = async () => { 
    try { 
        await dbConnection()
        app.listen(3032,()=> {
            console.log('app is running on ')
        })
    } catch(error) { 
        console.log(error)
    }

}

start()