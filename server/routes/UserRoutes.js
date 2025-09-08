const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Get all user
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

const authenticateToken = require('../middleware/auth');

// GET a user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('exercises.exerciseID');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

//add a new user
router.post('/', async (req, res) => {
  const { userName, password } = req.body;
  if(!userName || !password) {
    return res.status(400).send({ error: "Missing username or password", userName, password });  }
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, password: hashedpassword });
    return res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username already taken" });
    }
    return res.status(500).json({ error: "failed to create the user",  details: error.message });
  }
});

//add bodyweight
router.put('/bodyweight', async (req, res) => {
    const { bodyWeight } = req.body;
    if( !bodyWeight){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            
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
    const { height } = req.body;
    if(!height){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            
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
    const { age } = req.body;
    if( !age){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            
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
router.put('/addExercise', authenticateToken, async (req, res) => {
    console.log(req.user.id);
    const { exerciseID, name, weight, reps, sets, date} = req.body;
    if( !exerciseID){
        return res.status(400).send("Need valid inputs"); 
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { exercises : {exerciseID, name, weight, reps, sets, date } } },
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

//edit exercise
router.put('/editExercise', authenticateToken, async (req, res) => {
    const { exerciseID, weight, reps, sets, date } = req.body; 
    if( !exerciseID || !weight || !reps || !sets ){
        return res.status(400).send("Need valid inputs");
    }   
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user.id, "exercises._id": exerciseID }, 
            { $set: {
                "exercises.$.weight": weight,
                "exercises.$.reps": reps,
                "exercises.$.sets": sets,
            },
                $push: {
                    "exercises.$.date": date  
                }
            },
            { new: true }
        ).populate('exercises.exerciseID');
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        res.status(500).json({error : "failed to edit exercise"});
    }
});

//remove exercise
router.put('/removeExercise', authenticateToken, async (req, res) => {
    const { exerciseID } = req.body;
    if(!exerciseID){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { exercises : { _id : exerciseID } } },
            { new: true }
        ).populate('exercises.exerciseID');
        console.log(user);
        if(!user){
            return res.status(404).send("could not find the user, an error has occur");
        }
        res.json(user);
    }catch (error){
        console.log(error);
        res.status(500).json({error : "failed to remove exercise"});
    }   
});

//remove a date
router.put('/removeDate', authenticateToken, async (req, res) => {
    const { exerciseID, dateToRemove } = req.body;

    if (!exerciseID || !dateToRemove) {
        return res.status(400).json({ error: "exerciseID and dateToRemove are required" });
    }

    try {
        const date = new Date(dateToRemove);

        const user = await User.findOneAndUpdate(
            { _id: req.user.id, "exercises._id": exerciseID },
            {
                $pull: { "exercises.$.date": date }
            },
            { new: true }
        ).populate("exercises.exerciseID");

        if (!user) {
            return res.status(404).json({ error: "User or exercise not found" });
        }

        res.json({ message: "Date removed successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove date" });
    }
});

module.exports = router;
