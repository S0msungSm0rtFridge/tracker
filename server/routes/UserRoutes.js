const express = require('express');
const router = express.Router();
const User = require('../models/Users');

//Get a user
router.get('/', async (req, res) => {
    try {
        const user = await User.find().populate('exercises.exerciseID');
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch(error){
        res.status(500).json({error : "failed to get the user"});
    }
});

//add a new user
router.post('/', async (req, res) => {
    const { userID, userName, password } = req.body
    if(!userName || !password){
        res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.create( { userID, userName, password });
        res.json(user); 
    }catch (error){
        res.status(500).json({error : "failed to create the user"});
    }
});

//add bodyweight
router.put('/bodyweight', async (req, res) => {
    const { userId, bodyWeight } = req.body;
    if(!userId || !bodyWeight){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            { bodyWeight },
            { new: true }
        );
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to update bodyweight"});
    }
});
//change height
router.put('/height', async (req, res) => {
    const { userId, height } = req.body;
    if(!userId || !height){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            { height },
            { new: true }
        );
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to update height"});
    }
});
//add age
router.put('/height', async (req, res) => {
    const { userId, age } = req.body;
    if(!userId || !age){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            { age },
            { new: true }
        );
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to update age"});
    }
});

//add exercise
router.put('/addExercise', async (req, res) => {
    const { userId, exerciseID, weight, reps, sets, date } = req.body;
    if(!userId || !exerciseID){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { exercises : { exerciseID, weight, reps, sets, date } } },
            { new: true }
        ).populate('exercises.exerciseID');
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to add exercise"});
    }
});

//remove exercise
router.put('/removeExercise', async (req, res) => {
    const { userId, exerciseEntryId } = req.body;
    if(!userId || !exerciseEntryId){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { exercises : { _id : exerciseEntryId } } },
            { new: true }
        ).populate('exercises.exerciseID');
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to remove exercise"});
    }   
});

module.exports = router;
