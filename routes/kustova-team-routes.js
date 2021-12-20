/*
============================================
; Title:  kustova-team-routes.js
; Author: Professor Krasso
; Date:   12/19/2021
; Modified By: Oksana Kustova
; Description: Team API
;===========================================
*/

const express = require("express");
const router = express.Router();
const Team = require("../models/kustova-teams");

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeam
 *     summary: Creates a new team document
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *               - players
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Team added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/teams", async (req, res) => {
  try {
    const newTeam = {
      name: req.body.name,
      mascot: req.body.mascot,
    };

    await Team.create(newTeam, function (err, team) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(team);
        res.json(team);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of team objects.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get("/teams", async (req, res) => {
  try {
    Team.find({}, function (err, teams) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(teams);
        res.json(teams);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * assignPlayerToTeamByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeamByTeamId
 *     summary: Creates a new team's player
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The team's id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - Salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               Salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/teams/:id/players", async (req, res) => {
  try {
    const teamId = req.params.id;

    Team.findOne({ _id: teamId }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!team) {
          console.log(err);
          res.status(401).send({
            message: `Invalid teamId: ${err}`,
          });
        } else {
          console.log(team);
          const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Salary: req.body.Salary,
          };
          team.players.push(newPlayer);

          team.save(function (err, updatedTeam) {
            if (err) {
              console.log(err);
              res.json(updatedTeam);
            } else {
              console.log(updatedTeam);
              res.json(updatedTeam);
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning all team players
 *     summary: returns all team players
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Requested id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team players
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!team) {
          console.log(err);
          res.status(401).send({
            message: `Invalid teamId: ${err}`,
          });
        } else {
          if (team.players.length === 0) {
            let response = team.name + " doesn't have any players.";
            console.log(response);
            res.send(response);
          } else {
            console.log(team.players);
            res.json(team.players);
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * deleteTeamByID
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeam
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/teams/:id", async (req, res) => {
  try {
    const teamDocId = req.params.id;

    Team.findByIdAndDelete({ _id: teamDocId }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!team) {
          console.log(err);
          res.status(401).send({
            message: `Invalid teamId: ${err}`,
          });
        } else {
          console.log(team);
          res.json(team);
        }
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
