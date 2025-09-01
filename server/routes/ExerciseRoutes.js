const express = require('express');
const router = express.Router();
const Exercises = require('../models/Exercises');

//get all exercises
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercises.find();
        if(!exercises){
            return res.status(404).send("could not find exercises, an error has occur");
        }
        res.json(exercises);
    }catch(error){
        res.status(500).json({error : "failed to get exercises"});
    }
});

//add new exercise
router.post('/', async (req, res) => {
    const { name, description, muscleGroup } = req.body;
    if(!name || !description || !muscleGroup){
        return res.status(400).json({error: "Please fill all the fields"});
    }
    const newExercise = new Exercises({
        name,
        description,
    });
    try{
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    }catch(error){
        res.status(500).json({error: "failed to add exercise"});
    }
});

//edit exercise
router.put('/:id', async (req, res) => {
    const { name, description, muscleGroup } = req.body;
    if(!name || !description || !muscleGroup){
        return res.status(400).json({error: "Please fill all the fields"});
    }
    try {
        const exercise = await Exercises.findByIdAndUpdate(
            req.params.id,
            { name, description, muscleGroup },
            { new: true }
        );
        if(!exercise){
            return res.status(404).send("could not find the exercise, an error has occur");
        }
        res.json(exercise);
    }catch (error){
        res.status(500).json({error : "failed to update exercise"});
    }
});

//get exercises by muscle group
router.get('/muscle/:muscleGroup', async (req, res) => {
    try {
        const exercises = await Exercises.find({ muscleGroup: req.params.muscleGroup });
        if(!exercises){
            return res.status(404).send("could not find exercises, an error has occur");
        }
        res.json(exercises);
    }catch(error){
        res.status(500).json({error : "failed to get exercises"});
    }
});

module.exports = router;
