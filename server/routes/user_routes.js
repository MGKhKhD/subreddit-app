const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user_model');

router.post('/', (req,res,next) =>{
    const { subreddit } = req.body;
    const savedSubreddit = new User({
        _id: new  mongoose.Types.ObjectId(),
        subreddit: subreddit.subreddit
    });
    savedSubreddit.save()
    .then(ressult => {
        console.log('success');
        res.status(201).json({
            message: "success"
        });
    })
    .catch(err => {
        console.log('error');
        res.status(500).json({
            message: "error"
        });
    });
});

router.get('/', (req,res) => {
    User.find()
    .exec()
    .then(documents => res.status(201).json({documents
    }))
    .catch(err => res.status(500).json({
        message: 'error'
    }));
})


module.exports = router;