var express = require("express");
var router = express.Router();

var { ledger } = require("../../models/ledger");
var { order } = require("../../models/orders");
var { customers } = require("../../models/customers");
var _ = require("lodash");

router.get("/dailysales", async (req, res) => {
  const Ledger = new ledger();
  let result = await Ledger.getDailyCredit();
  console.log(result);
  res.send(result);
});

router.get("/monthlysales", async (req, res) => {
  const Ledger = new ledger();
  let result = await Ledger.getMonthlyCredit();
  console.log(result);
  res.send(result);
});

router.get("/yearlysales", async (req, res) => {
  const Ledger = new ledger();
  let result = await Ledger.getYearlyCredit();

  res.send(result);
});

router.get("/getSales", async (req, res) => {
  let date = new Date();
  let sum = 0;

  sum = date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  const Ledger = new ledger();
  let result = await Ledger.getDailyCre();
  let filter = _.filter(result, { _id: sum });
  //console.log(filter[0].totalAmount);
  let resu = filter[0].totalAmount.toString();
  res.send(resu);
});

router.get("/getMSales", async (req, res) => {
  let date = new Date();
  let sum = 0;

  sum = date.getMonth() + 1 + date.getFullYear();
  const Ledger = new ledger();
  let result = await Ledger.getMonthlyCre();
  let filter = _.filter(result, { _id: sum });

  let resu = filter[0].totalAmount.toString();
  res.send(resu);
});

router.get("/getySales", async (req, res) => {
  let date = new Date();

  const Ledger = new ledger();
  let result = await Ledger.getYearlyCredit();
  let filter = _.filter(result, { _id: date.getFullYear() });

  let resu = filter[0].totalAmount.toString();
  res.send(resu);
});
module.exports = router;
