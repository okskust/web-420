/*
============================================
; Title:  kustova-user.js
; Author: Professor Krasso
; Date:   11/28/2021
; Modified By: Oksana Kustova
; Description: User model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: String }
});

module.exports = mongoose.model('User', userSchema);