const router = require('express').Router();
const mongoose = require('mongoose');
const authRoute = require('../utils/authenticateMiddleware');
const Bookmark = require('../models/Bookmarks_model');

router.use(authRoute);

router.post('/', (req,res) => {
    const data = req.body;
    const meta = data.meta;
    const  newBookmark = new Bookmark({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        body: data.body,
        meta: meta,
        user: req.authUser._id
    });

    Bookmark.findOne({title: data.title, user: req.authUser._id})
    .exec()
    .then(record => {
        if(!record){
            return newBookmark.save()
        }else{
            throw new Error('Bookmark Exists');
        }
    })
    .then(result => res.status(201).json({message: {global: 'Successful.'}}))
    .catch(err => res.status(201).json({err}));
});

router.delete('/:title', (req,res) => {
    bookmark.find({user: req.authUser._id})
    .exec()
    .then(document => {
        if(!document){
            res.redirect('/api/bookmarks')
        }
    })
    const title = req.params.title;

    Bookmark.remove({title: title, user: req.authUser._id})
    .exec()
    .then(result => res.status(201).json({message: {global: 'Successful.'}}))
    .catch(err => res.status(500).json({err}));
});

router.get('/', (req,res)=>{
    Bookmark.find({user: req.authUser._id})
    .select('-user -notes')
    .exec()
    .then(bookmarks => res.status(201).json({bookmarks}))
    .catch(err => res.status(500).json({errors: {global: 'Unable to load bookmarks.'}}))
});

module.exports = router;