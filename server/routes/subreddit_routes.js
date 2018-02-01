const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subreddit = require('../models/subreddit_model');

router.post('/', (req,res,next) =>{
    const data = req.body;
    const savedSubreddit = new Subreddit({
        _id: new  mongoose.Types.ObjectId(),
        subreddit: data.todo
    });
    savedSubreddit.save()
    .then(ressult => {
        res.status(201).json({
            message: "success",
            data: savedSubreddit
        });
    })
    .catch(err => {
        console.log('error');
        res.status(500).json({
            message: "error"
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
            message: "error"
        });
    });
});

router.get('/', (req,res) => {
    Subreddit.find()
    .exec()
    .then(documents => res.status(201).json({documents
    }))
    .catch(err => res.status(500).json({
        message: 'error'
    }));
})


module.exports = router;