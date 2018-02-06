const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: String, default: 'untitled'},
    subreddits: [{type: Schema.Types.ObjectId, ref: 'Subreddit'}]
},{timestamps: true});

module.exports = mongoose.model('Category', schema);