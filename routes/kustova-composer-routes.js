/*
============================================
; Title:  kustova-composer-routes.js
; Author: Professor Krasso
; Date:   14 November 2021
; Modified By: Oksana Kustova
; Description: Composer API
;===========================================
*/

const express = require("express");
const router = express.Router();
const Composer = require("../models/kustova-composer");

/** findAllComposers
@openapi
 /api/composers:
     get:
        tags:
             - Composers
         summary: Returns a list of composer documents
         description: API for returning a list of composers from MongoDB Atlas
         operationId: findAllComposers
         responses:
             '200':
             description: Composer documents
             '500':
             description: Server Exeption
             '501':
             description: MogoDB Exeption **/

router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, function (err, composers) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});
/** findComposerByID
@openapi
 /api/composers/{id}:
     get:
       tags:
         - Composers
       summary: Returns a composer document
       description: API for returning a single composer object from MongoDB
       operationId: findComposerByID
       parameters:
        - name: id
           in: path
           description: The composer id requested by the user
           required: true
           schema:
             type: string
       responses:
         '200':
           description: Composer document in JSON format
         '500':
           description: Server Exeption
         '501':
           description: MogoDB Exeption **/

router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({ _id: req.params.id }, function (err, fruit) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/** createComposer
@openapi
/api/composers:
 post:
      tags:
        - Composers
      summary: Creates a new composer object
      operationId: createComposer
      requestBody:
        description: Composer's information
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Composer'
          application/xml:
            schema:
              $ref: '#/components/schemas/Composer'
        required: false
      responses:
        '200':
          description: User added
        '500':
          description: Server Exeption
        '501':
          description: MogoDB Exeption
      x-codegen-request-body-name: body **/

router.post("/composers", async (req, res) => {
  try {
    const newComposer = {
      type: req.body.type,
    };

    await Composer.create(newComposer, function (err, fruit) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
