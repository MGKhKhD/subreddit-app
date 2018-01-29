const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const Key = require('../configs/configs');

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, lowercase: true, index: true, unique: true},
    passwordHash: {type: String, required: true},
    confirmationToken: {type: String, default: ""},
    confirmed: { type: Boolean, default: false}
}, {timestamps: true});

schema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password, 10);
}

schema.methods.isValidPassword = function isValidPassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
}

schema.methods.generateJWT = function generateJWT(){
    return jwt.sign({
        email: this.email,
        confirmed: this.confirmed
    }, process.env.jwtSecretKey);
}

schema.methods.setConfimationToken = function setConfimationToken(){
    this.confirmationToken = this.generateJWT();
}

schema.methods.toAuthJWT = function toAuthJWT(){
    return {
            email: this.email,
            confirmed: this.confirmed,
            token: this.generateJWT()
    };
}

schema.methods.generateConfimationUrl = function generateConfimationUrl(){
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.plugin(uniqueValidator, {message: 'This email is already taken'});

module.exports = mongoose.model('User', schema);