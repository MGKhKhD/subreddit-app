const express = require('express');
const path = require('path');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const  morgan =require('morgan');

const Keys = require('./configs/configs');

const app = express();
app.use(bodyPareser.json());

const subreddit = require('./routes/subreddit_routes');
const auth = require('./routes/auth_routes');
const users = require('./routes/users_routes');

mongoose.connect(Keys.mLabURI);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use('/api/users', users);
app.use('/api/subreddits',subreddit);
app.use('/api/auth', auth);


// fallback route
app.get('/*', (req,res,next) =>{
    res.sendFile(path.join(__dirname,'index.html'))
});

app.listen(5300, ()=>console.log('server runing on port 5300'));