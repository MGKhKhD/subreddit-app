
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subreddit: {type: String},
    category: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{timestamp: true});

module.exports = mongoose.model('Subreddit', schema);

