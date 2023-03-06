const mongoose = require('mongoose')
const {Schema} = mongoose;

const Game = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Game', Game)