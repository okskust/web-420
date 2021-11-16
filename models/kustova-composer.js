/*
============================================
; Title:  kustova-composer.js
; Author: Professor Krasso
; Date:   14 November 2021
; Modified By: Oksana Kustova
; Description: Composer Mongoose Model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// composer schema
let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});


module.exports = mongoose.model("Composer", composerSchema);