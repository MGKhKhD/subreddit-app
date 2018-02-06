const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authRoute = require('../utils/authenticateMiddleware');
const Category = require('../models/Category_model');

router.use(authRoute);

router.post('/', (req, res) => {
    Category.findOne({
            category: req.body.category
        })
        .then(cat => {
            if (cat) {
                res.status(500).json({errors: {global: 'Category already exist.'}});
            } else {
                const newCategory = new Category({
                    _id: new mongoose.Types.ObjectId(),
                    category: req.body.category
                });
                newCategory.save()
                    .then(record =>
                        res.status(201).json({
                            category: record
                        }))
                    .catch(err =>
                        res.status(500).json({errors: {global: 'Unsuccessful attempt.'}}))
            }
        });
});

module.exports = router;