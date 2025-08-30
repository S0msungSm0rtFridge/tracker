const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID : { type: String, required: true, unique: true},
    userName : { type: String, required: true},
    /* MIGHT WANNA ENCRYPT THE PASS WORD, MAY DO LTER */
    password : { type: String, required: true},
    bodyWeight : { type: Number, required: false},
    age : {type: Number, required: false},
    height : {type: Number, required: false},

    exercises : [{
        exerciseID : { type: Schema.Types.ObjectId, ref: 'Exercise' },
        weight : { type: Number, required: false},
        reps : { type: Number, required: false},
        sets : { type: Number, required: false},
        date : { type: Date, required: false}
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;