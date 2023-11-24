
const mongoose = require('mongoose')
// mongodb://127.0.0.1:27017/FitnessGuru


const dburl = process.env.MONGODB_URL;
mongoose.connect(dburl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected")
})

const Exerciseschema = new mongoose.Schema({


    id: {
        type: String,
        unique: true,
        requried: true

    },
    name: {
        type: String,
        requried: true
    },
    bodyPart: {
        type: String,
        requried: true
    },
    gifUrl: {
        type: String,
        requried: true
    },
    target: {
        type: String,
        requried: true
    },
    equipment: {
        type: String,
        requried: true
    },
    instructions: [String]
})

const Variation = mongoose.model('Variations', Exerciseschema, 'Variations')

const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.EXERCISEDB_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

const ExerciseData = async () => {
    const Allexercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1300', exerciseOptions);
    const Deleteex = await Variation.deleteMany();

    console.log("deleted all");
    for (let i = 0; i < Allexercises.length; i++) {
        const newExercise = new Variation({
            id: Allexercises[i].id,
            bodyPart: Allexercises[i].bodyPart,
            equipment: Allexercises[i].equipment,
            gifUrl: Allexercises[i].gifUrl,
            name: Allexercises[i].name,
            target: Allexercises[i].target,
            instructions: Allexercises[i].instructions
        })
        newExercise.save();
    }
    console.log("done");

    const AExer = await Variation.find();
    console.log(AExer.length)
}

ExerciseData();

module.exports = Variation
