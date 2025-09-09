const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : { type: String, required: true, unique: true},
    /* MIGHT WANNA ENCRYPT THE PASS WORD, MAY DO LTER */
    password : { type: String, required: true},
    bodyWeight : [{value: Number, date: Date, note: String}],
    age : {type: Number, required: false},
    height : {type: Number, required: false},

    exercises : [{
        exerciseID : { type: Schema.Types.ObjectId, ref: 'Exercise' },
        name : { type: String, required: false},
        weight : [{ value: Number, date: Date}],
        reps : [{ value: Number, date: Date}],
        sets : [{ value: Number, date: Date}],
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

