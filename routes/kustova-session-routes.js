/*
============================================
; Title:  kustova-session-routes.js
; Author: Professor Krasso
; Date:   11/28/2021
; Modified By: Oksana Kustova
; Description: Routes to register and login users.  
;===========================================
*/

const express = require("express");
const router = express.Router();
const User = require("../models/kustova-user");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     summary: Register user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (user) {
        console.log(`401: Username is already in use`);
        res.status(401).send({
          message: `Username is already in use`,
        });
      } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const newRegisteredUser = {
          userName: req.body.userName,
          password: hashedPassword,
          emailAddress: req.body.emailAddress,
        };
        User.create(newRegisteredUser, function (err, user) {
              if (err) {
                  console.log(err);
                  res.status(500).send({
                      message: `MongoDB Exception: ${err}`,
                  });
              } else {
                  console.log(user);
                  res.json(user);
              }
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: Login user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (passwordIsValid) {
            console.log("Password matches");
            res.status(200).send({
              message: "User logged in",
            });
          } else {
            console.log("Password is incorrect");
            res.status(401).send({
              message: `Invalid password`,
            });
          }
        } else {
          console.log("Invalid username and/or password");
          res.status(401).send({
            message: `Invalid username and/or password`,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err}`,
    });
  }
});

module.exports = router;
