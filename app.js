const express = require('express')
const app = express()
const dbConnection = require('./src/config/database')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())


//routes 
const authRoutes = require('./src/api/routes/auth')

app.use('/api/v1/auth', authRoutes)

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