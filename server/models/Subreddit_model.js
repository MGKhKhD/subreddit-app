
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subreddit: {type: String},
    category: {type: String, default: 'untitled'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
},{timestamp: true});

module.exports = mongoose.model('Subreddit', schema);

