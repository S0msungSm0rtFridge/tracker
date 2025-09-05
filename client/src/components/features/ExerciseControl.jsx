import axios from 'axios';
import ''

const addExercise = async () => {
    try{
        const exercise = await axios.post("http://localhost:5000/api/exercises", {});
    } catch (error) {

    }
}