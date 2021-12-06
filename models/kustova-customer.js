/*
============================================
; Title:  kustova-customer.js
; Author: Professor Krasso
; Date:   5 December 2021
; Modified By: Oksana Kustova
; Description: Customer Mongoose Model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// lineItem schema
let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

// invoice schema
let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

// customer schema
let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
});


module.exports = mongoose.model("Customer", customerSchema);