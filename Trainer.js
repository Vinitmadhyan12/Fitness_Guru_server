
const mongoose = require('mongoose')

// const dburl = 'mongodb://127.0.0.1:27017/FitnessGuru';
// mongoose.connect(dburl, {
//     useNewUrlParser: true, useUnifiedTopology: true
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
//     console.log("database connected")
// })

const Trainerschema = new mongoose.Schema({

    name: {
        type: String,
        requried: true
    }


})

const Trainer = mongoose.model('Trainer', Trainerschema)


// const meth = async () => {
//     const name = 'Aditya'
//     const NewTrainer = new Trainer({ name });
//     NewTrainer.save();

// }

// meth();
module.exports = Trainer
