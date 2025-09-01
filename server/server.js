
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/workoutTracker'; 

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,              
}));

app.use(bodyParser.json());
app.use(cookieParser()); 

const userRoutes = require('./routes/UserRoutes');
const exerciseRoutes = require('./routes/ExerciseRoutes');
const authRoutes = require('./routes/auth');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});