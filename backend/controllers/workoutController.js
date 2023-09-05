const workoutModule = require('../models/workoutModule')
const Workout = require('../models/workoutModule')
const mongoose = require('mongoose')

// Get All workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }) //to show the newest ones at the top
    res.status(200).json(workouts)
}

// GEt a single
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { //if ID is not valid, then we return an error
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ mssg: "No Such workout" })
    }

    res.status(200).json(workout)
}


// Create New Workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    //Add doc to DB
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout to Delete" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// Update Workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    // check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout to UPDATE" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)

}


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}