const express = require('express');
const router = express.Router();
// const joi = require('joi')
const Name = require('../name');
// const expressError = require('../utils/expressError');
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');

const Variation = require('../Exercise');
const Trainer = require('../Trainer');


const jwt = require('jsonwebtoken');


const secretKey = 'your_secret_key';






const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new Name({ username, email });
        const registeredUser = await Name.register(user, password);
        req.login(registeredUser, err => {
            if (err) { return next(err) }
            console.log("register successfull")
            console.log(registeredUser)
            res.json(registeredUser)
        })

    }
    catch (e) {
        // req.flash('error', e.message)
        console.log(e);

        // res.json(e);
    }
}));

router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:5173/login', failureMessage: "incorrect username or password" }), catchAsync(async (req, res) => {
    // console.log(req.user);
    const user = req.user;

    const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
    res.json({ token, user });

    // res.json(req.user)
}));

router.get('/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            // Here, you can return any protected data or perform any other protected operations
            res.json({
                message: 'Protected information',
                user: data.user,
            });
        }
    });
});


router.post('/logi', async (req, res) => {
    const { email, name, family } = req.body;

    // const user = await Name.findOne({ email: email })
    // console.log(user)
    // if (!user._id) {
    const fullname = name + family
    const userxx = new Name({ email, username: fullname });
    userxx.save()
    // console.log("deiufrecuerv")

    res.json(userxx)


    // }
    // else {
    //     res.json(user);

    // }
})




router.get('/logout', (req, res) => {
    // req.logout();
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json("success")
        console.log("logout successs full")
    });

});





router.put('/update', function (req, res) {
    Name.findByUsername(req.body.username, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            user.changePassword(req.body.oldpassword,
                req.body.newpassword, function (err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('successfully change password')
                    }
                });
        }
    });
});


router.delete('/deleteUser/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log("i am in ")
    await Name.findByIdAndDelete(id);
    res.json("user deleted successfully")

}))



router.post('/addtoroutine', async (req, res) => {
    try {
        const { u_id, exerciseDetail } = req.body

        // console.log(exerciseDetail._id)

        const user = await Name.findById(u_id)
        const exercise = await Variation.findById(exerciseDetail._id)

        if (user.exercises.includes(exerciseDetail._id)) {
            res.json("exercise already added in your routine")
            return;
        }


        user.exercises.push(exercise)
        await user.save()
        res.json("Exercise Addes in your Routine")
    }
    catch (e) {
        console.log(e);
    }
})

router.post('/removeroutine', async (req, res) => {
    const { u_id, variation } = req.body
    const id = variation._id
    await Name.findByIdAndUpdate(u_id, { $pull: { exercises: id } })
    res.json("exercise removed from routine")
})

router.post('/addtrainer', async (req, res) => {
    try {
        const { u_id, t_id } = req.body

        const user = await Name.findById(u_id)
        const trainer = await Trainer.findById(t_id)
        user.trainer = trainer
        await user.save()
        res.json("Trainer appointed")
    }
    catch (e) {
        console.log(e);
    }
})

router.post('/findtrainer', async (req, res) => {

    try {
        const { u_id } = req.body
        const user = await Name.findById(u_id).populate('trainer')
        res.json(user.trainer)


    }
    catch (e) {
        console.log(e)

    }

})

router.post('/findexercise', async (req, res) => {

    try {
        const { u_id } = req.body
        const user = await Name.findById(u_id).populate('exercises')
        res.json(user.exercises)


    }
    catch (e) {
        console.log(e)

    }

})


function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router

