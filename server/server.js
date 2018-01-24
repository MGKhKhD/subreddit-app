const express = require('express');
const path = require('path');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const  morgan =require('morgan');

const Keys = require('./configs/configs');

const app = express();
app.use(bodyPareser.json());

const user = require('./routes/user_routes');

mongoose.connect(Keys.mLabURI);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use('/user/subreddits',user);

app.get('/', (req,res,next) =>{
    res.sendFile(path.join(__dirname,'index.html'))
});

app.listen(5300, ()=>console.log('server runing on port 5300'));