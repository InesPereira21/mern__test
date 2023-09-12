const mongoose = require('mongoose')

// Schema defines the structure of a type of data
const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })


// Module applies the schema to interact with a collection of same name
module.exports = mongoose.model('Workout', workoutSchema)

