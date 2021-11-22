/*
============================================
; Title:  kustova-person.js
; Author: Professor Krasso
; Date:   11/21/2021
; Description: Person Model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * role schema
 */
let roleSchema = new Schema({
  text: { type: String },
});

/**
 * dependent schema
 */
let dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

/**
 * person schema
 */
let personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

module.exports = mongoose.model("Person", personSchema);
