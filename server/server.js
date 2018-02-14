const express = require('express');
const path = require('path');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const  morgan =require('morgan');
const dotenv = require('dotenv');

const Keys = require('./configs/configs');

dotenv.config();
const app = express();
app.use(bodyPareser.json());


const auth = require('./routes/auth_routes');
const users = require('./routes/users_routes');
const subreddit = require('./routes/subreddit_routes');
const category = require('./routes/category_routes');
const bookmark = require('./routes/bookmark_routes');

mongoose.connect(process.env.mLabURI);
mongoose.Promise = global.Promise;
mongoose.set('debug', true)

app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/subreddits',subreddit);
app.use('/api/categories', category);
app.use('/api/bookmarks', bookmark);

// fallback route
app.get('/*', (req,res,next) =>{
    res.sendFile(path.join(__dirname,'index.html'))
});

app.listen(5300, ()=>console.log('server runing on port 5300'));