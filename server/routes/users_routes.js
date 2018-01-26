const express = require('express');
const router = express.Router();
const User = require('../models/User_model');
const mongoose = require('mongoose');
const parsingErrors = require('../utils/parsingErrors');

router.post('/', (req,res)=>{
    const { email, password, dPassword } = req.body.user;
    if(password !== dPassword){
        return res.status(500).json({
           errors: {global: 'Unconfirmed password. Try again'}
        });
    }
    const user = new User({
        _id: new mongoose.Types.ObjectId(), 
        email: email });
    user.setPassword(password)
    user.setConfimationToken();
    user.save()
    .then(record => res.status(200).json({
        user: record.toAuthJWT()
    })).catch(err => res.status(400).json({
        errors: parsingErrors(err.errors)
    }));
});

module.exports = router;