const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {type: String},
    body:{type: String},
    meta:{
        subreddit: String,
        url: String,
        num_comments:Number,
        author: String,
        score: String,
        createdAt: String
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    notes: [{type: String, data: Date}]
});

module.exports = mongoose.model('Bookmarks', schema);