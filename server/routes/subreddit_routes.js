const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subreddit = require('../models/subreddit_model');
const authRoute = require('../utils/authenticateMiddleware');

router.use(authRoute);

router.post('/', (req,res,next) =>{
    const data = req.body;
    const savedSubreddit = new Subreddit({
        _id: new  mongoose.Types.ObjectId(),
        subreddit: data.todo,
        category: data.category,
        user: req.authUser._id
    });
    savedSubreddit.save()
    .then(ressult => {
        res.status(201).json({
            message: "Success",
            data: savedSubreddit
        });
    })
    .catch(err => {
        console.log('error');
        res.status(500).json({
            message: "Error"
        });
    });
});

router.delete('/:subredditId', (req,res,next) =>{
    Subreddit.remove({ _id: req.params.subredditId})
    .exec()
    .then(ressult => {
        Subreddit.find()
        .exec()
        .then(documents => res.status(201).json({documents
        }));
    })
    .catch(err => {
        res.status(500).json({
            message: "Error"
        });
    });
});

router.get('/', (req,res) => {
    Subreddit.find()
    .exec()
    .then(documents => res.status(201).json({documents
    }))
    .catch(err => res.status(500).json({
        message: 'Error'
    }));
})


module.exports = router;