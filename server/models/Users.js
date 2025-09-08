const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : { type: String, required: true, unique: true},
    /* MIGHT WANNA ENCRYPT THE PASS WORD, MAY DO LTER */
    password : { type: String, required: true},
    bodyWeight : { type: Number, required: false},
    age : {type: Number, required: false},
    height : {type: Number, required: false},

    exercises : [{
        exerciseID : { type: Schema.Types.ObjectId, ref: 'Exercise' },
        name : { type: String, required: false},
        weight : { type: Number, required: false},
        reps : { type: Number, required: false},
        sets : { type: Number, required: false},
        date : [{ type: Date, required: false}]
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

