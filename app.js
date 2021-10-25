/*
============================================
; Title: Assignment 1
; Author: Professor Krasso
; Date: 10/24/2021
; Modified By: Oksana Kustova
; Description: GitHub and Project Setup
;===========================================
*/
//Requires modules and puts it in the variables.
let express = require("express");
let http = require("http");
let swaggerUi = require("swagger-ui-express");
let swaggerJsdoc = require("swagger-jsdoc");
let mongoose = require("mongoose");

//Calls the express function to start a new Express application.
let app = express();

//The applications port variable
app.set("port", process.env.PORT || 3000);

//Settings.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};
let openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Starts the server.
http.createServer(app).listen(app.get("port"), function () {
  console.log("Application started on port " + app.get("port"));
});