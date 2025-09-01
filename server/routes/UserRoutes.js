const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

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
router.put('/addExercise', async (req, res) => {
    const { weight, reps, sets, date } = req.body;
    if( !exerciseID){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
            
            { $push: { exercises : { weight, reps, sets, date } } },
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
router.put('/editExercise', async (req, res) => {
    const { exerciseEntryId, weight, reps, sets, date } = req.body; 
    if( !exerciseEntryId || !weight || !reps || !sets ){
        return res.status(400).send("Need valid inputs");
    }   
    try {
        const user = await User.findOneAndUpdate(
            { "exercises._id": exerciseEntryId },
            { $set: {
                "exercises.$.weight": weight,
                "exercises.$.reps": reps,
                "exercises.$.sets": sets,
            }},
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
router.put('/removeExercise', async (req, res) => {
    const { exerciseEntryId } = req.body;
    if( !exerciseEntryId){
        return res.status(400).send("Need valid inputs");
    }
    try {
        const user = await User.findByIdAndUpdate(
          
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
