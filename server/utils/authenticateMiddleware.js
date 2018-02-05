const jwt = require('jsonwebtoken');
const User = require('../models/User_model');

function authRoute(req, res, next){
    const header = req.headers.authorisedtoken;
    let token;

    if(header){
        token = header.split(" ")[1];
    }

    if(token){
        jwt.verify(token, process.env.jwtSecretKey, (error, decodedToke)=>{
            if(error){
                res.status(401).json({errors: {global: 'invalid token'}});
            }else{
                User.findOne({email: decodedToke.email})
                .then(user => {
                    req.authUser = user;
                    next();
                })
                .catch(err => res.status(401).json({errors: {global: 'no user record found'}}));
            }
        });
    }else{
        res.status(401).json({errors: {blobal: "Invalid token"}});
    }
}

module.exports = authRoute;