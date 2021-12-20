/*
============================================
; Title:  node-shopper-routes.js
; Author: Professor Krasso
; Date:   12/5/2021
; Description: Customer API
;===========================================
*/

const express = require("express");
const router = express.Router();
const Customer = require("../models/kustova-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };

    await Customer.create(newCustomer, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     summary: Creates a new Customer's invoice document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The customer's username
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     prise:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/customers/:username/invoices", async (req, res) => {
  try {
    const customerUserName = req.params.username;

    Customer.findOne({ userName: customerUserName }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);

        const newInvoice = {
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };
        customer.invoices.push(newInvoice);

        customer.save(function (err, updatedCustomer) {
          if (err) {
            console.log(err);
            res.json(updatedCustomer);
          } else {
            console.log(updatedCustomer);
            res.json(updatedCustomer);
          }
        });
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
 * findAllInvoicedByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning all customer's invoices
 *     summary: returns all customer's invoices
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Requested username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer invoices documents
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/customers/:username/invoices", async (req, res) => {
  try {
    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          if (customer.invoices.length === 0) {
            let response = customer.userName + " doesn't have any invoices.";
            console.log(response);
            res.send(response);
          } else {
            console.log(customer.invoices);
            res.json(customer.invoices);
          }          
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
