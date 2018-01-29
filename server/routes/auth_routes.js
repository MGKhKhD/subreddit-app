const express = require('express');
const router = express.Router();
const User = require('../models/User_model');

router.post('/', (req,res) => {
    const { credentials } = req.body;
    User.findOne({email: credentials.email})
    .then(user => {
        if(user && user.isValidPassword(credentials.password)){
            res.status(200).json({user: user.toAuthJWT()});
        } else {
            res.status(400).json({errors: {global: 'invalid credentials'}});
        }
    })
});

router.post('/confirmation', (req,res)=>{
    const token = req.body.token;
    User.findOneAndUpdate({ confirmationToken: token},
                        {confirmationToken: '', confirmed: true},
                        {new: true})
                        .then(user => {
                            if(user){
                                res.status(200).json({user: user.toAuthJWT()});
                            }else{
                                res.status(400).json({});
                            }
                        });
});

module.exports = router;