
const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subreddit: {type: String}
},{timestamp: true});

module.exports = mongoose.model('User', schema);

