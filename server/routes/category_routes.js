const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authRoute = require('../utils/authenticateMiddleware');
const Category = require('../models/Category_model');

router.use(authRoute);

router.post('/', (req, res) => {
    Category.findOne({
            category: req.body.category, user: req.authUser._id
        })
        .then(cat => {
            if (cat) {
                res.status(500).json({
                    errors: {
                        global: 'Category already exist.'
                    }
                });
            } else {
                const newCategory = new Category({
                    _id: new mongoose.Types.ObjectId(),
                    category: req.body.category,
                    user: req.authUser._id
                });
                newCategory.save()
                    .then(record => {
                        Category.find({user: req.authUser._id}).select('category -_id').exec()
                        .then(documents => 
                            res.status(201).json({
                            documents
                        }))
                    })
                    .catch(err =>
                        res.status(500).json({
                            errors: {
                                global: 'Unsuccessful attempt.'
                            }
                        }))
            }
        });
});

router.get('/', (req, res) => {
    Category.find({user: req.authUser._id})
    .populate('subreddits')
    .exec()
    .then(documents => res.status(201).json({documents}))
    .catch(err => res.status(500).json({
        errors: {global: 'Unable to Fetch categories'}
    }));
});




module.exports = router;