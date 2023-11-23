if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local')
const Name = require('./name')
const session = require('express-session')

const Variation = require('./Exercise')
const Trainer = require('./Trainer')

const userRoutes = require('./routes/name')

const { exerciseOptions, youtubeOptions, fetchData } = require('./utils/fetchData')

// console.log(process.env.MONGODB_URL)
const dburl = process.env.MONGODB_URL;

mongoose.connect(dburl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected")
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(Name.authenticate()));
passport.serializeUser(Name.serializeUser());
passport.deserializeUser(Name.deserializeUser());


// app.use(cors());

const allowedOrigins = ['http://localhost:5173', 'https://fitness-guru-client-l7fm.vercel.app'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);

app.get("/", (req, res) => {
    // res.json({ message: "hello i am vinit" })
    res.send("Hello this is Fitness Guru website")
})
app.use('/', userRoutes);

app.get('/getExercises', async (req, res) => {

    const allUsers = await Variation.find()
    if (allUsers) {
        return res.json(allUsers)
    }
    else {
        return res.status(400).json({ error: "No Purchases found in the database " })

    }


})

app.post('/exerciseDetail', async (req, res) => {
    const { id } = req.body

    const ExerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    const exerciseDetailData = await fetchData(`${ExerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)

    const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);

    const Detail = { exerciseDetailData, exerciseVideosData }

    res.json(Detail)
})


app.get('/getTrainers', async (req, res) => {

    const allTrainer = await Trainer.find()
    if (allTrainer) {
        // console.log(allTrainer)
        return res.json(allTrainer)
        // res.send("wduiqwvcqlv")
    }
    else {
        return res.status(400).json({ error: "No Purchases found in the database " })

    }


})

app.listen(3000, () => {
    console.log("serving on port 3000");
})
