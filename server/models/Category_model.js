const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: String, default: 'untitled'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subreddits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subreddit'}]
},{timestamps: true});

module.exports = mongoose.model('Category', schema);