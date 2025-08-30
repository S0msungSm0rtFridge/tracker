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

