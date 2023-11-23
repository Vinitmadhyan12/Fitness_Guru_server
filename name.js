const mongoose = require('mongoose')
const passportlocalmongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variations'

    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'
    }
});

userSchema.plugin(passportlocalmongoose);//add password and username to the schema


module.exports = mongoose.model('Name', userSchema)