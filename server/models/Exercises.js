const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseID : { type: String, required: true, unique: true},
    name : { type: String, required: true},
    description : { type: String, required: false},
    muscleGroup : { type: String, required: false},
    difficulty : { type: String, required: false},
    similar : [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;