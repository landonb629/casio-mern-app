const mongoose = require('mongoose')


const dbConnection = () => {
    try { 
        return mongoose.connect("mongodb://db:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(error) { 
        console.log(error)
    }
}

module.exports = dbConnection;