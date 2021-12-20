/*
============================================
; Title:  kustova-teams.js
; Author: Professor Krasso
; Date:   12/19/2021
; Modified By: Oksana Kustova
; Description: Team Mongoose Model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// player schema
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    Salary: { type: Number }
});

// team schema
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

module.exports = mongoose.model("Team", teamSchema);