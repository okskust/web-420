/*
============================================
; Title: Assignment 1
; Author: Professor Krasso
; Date: 10/24/2021
; Modified By: Oksana Kustova
; Description: GitHub and Project Setup
;===========================================
*/

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerAPI = require("./routes/kustova-composer-routes");
const personAPI = require("./routes/kustova-person-routes");

//Calls the express function to start a new Express application.
let app = express();

//The applications port variable
app.set("port", process.env.PORT || 3000);

//Settings.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * MongoDB Atlas connection string
 */
const conn =
  "mongodb+srv://web420_user:8523@web420db.e6qrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerAPI);
app.use("/api", personAPI);

//Starts the server.
http.createServer(app).listen(app.get("port"), function () {
  console.log("Application started on port " + app.get("port"));
});
