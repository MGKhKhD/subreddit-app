const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subreddit = require('../models/subreddit_model');
const authRoute = require('../utils/authenticateMiddleware');
const Category = require('../models/Category_model');

router.use(authRoute);

router.post('/', (req, res, next) => {
    const data = req.body;
    const savedSubreddit = new Subreddit({
        _id: new mongoose.Types.ObjectId(),
        subreddit: data.subreddit,
        category: data.category,
        user: req.authUser._id
    });

    Subreddit.findOne({
            subreddit: data.subreddit
        })
        .exec()
        .then(document => {
            if (!document) {
                Category.findOne({
                    category: data.category, user: req.authUser._id
                })
                .exec()
                .then(record => {
                    record.subreddits.push(savedSubreddit._id); 
                    return record.save({
                        _id: record._id
                    });
                })
                .then((id) => savedSubreddit.save())
                .then((result) => res.status(201).json({
                    data: result
                }))
            }
        })
        .catch(err => {
            res.status(500).json({
                errors: {
                    global: 'Unsuccessfull attempt. Try again.'
                }
            });
        });
});

router.delete('/:subredditId', (req, res) => {
    Subreddit.find({user: req.authUser._id})
    .exec()
    .then(document => {
        if(!document){
            res.redirect('/api/subreddits')
        }
    })
    Subreddit.remove({
            _id: req.params.subredditId
        })
        .exec()
        .then(result => {
            Subreddit.find()
                .exec()
                .then(documents => res.status(201).json({
                    documents
                }));
        })
        .catch(err => {
            res.status(500).json({
                message: "Error"
            });
        });
});

router.get('/', (req, res) => {
    Subreddit.find({user: req.authUser._id})
        .exec()
        .then(documents => res.status(201).json({
            documents
        }))
        .catch(err => res.status(500).json({
            message: 'Error'
        }));
})


module.exports = router;