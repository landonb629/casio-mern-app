const mongoose = require('mongoose')


const dbConnection = () => {
    try { 
        if (process.env.NODE_ENV === "development") { 
            return mongoose.connect("mongodb://db:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        } else if (process.env.PASSENGER_APP_ENV === "production") { 
            return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/users?ssl=true&replicaSet=globaldb`, {
            auth: {
                username: `${process.env.DB_USERNAME}`,
                password: `${process.env.DB_PASSWORD}`
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        }
        
    } catch(error) { 
        console.log(error)
    }
}

module.exports = dbConnection;