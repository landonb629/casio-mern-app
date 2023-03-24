const mongoose = require('mongoose')


const dbConnection = () => {
    try { 
        return mongoose.connect("mongodb://192.168.2.10:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(error) { 
        console.log(error)
    }
}

module.exports = dbConnection;