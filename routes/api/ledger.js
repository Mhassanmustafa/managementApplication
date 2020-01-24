var express = require("express");
var router = express.Router();

var { ledger } = require("../../models/ledger");
var { order } = require("../../models/orders");
var { customers } = require("../../models/customers");

const auth = require("../../middleware/auth");

async function getId(name) {
  let cust = new customers();
  console.log(name);
  let resu = await cust.getCustomerId(name);
  if (!resu) return "there is costomer with this id";
  return resu._id;
}

async function getOrderId(id) {
  let ord = new order();

  let result = await ord.getOrders(id);
  if (!result) {
    result = await ord.getOrders(id);
  }

  return result._id;
}

//insert new data in the ledger
router.post("/insertNewLedger", auth, async (req, res) => {
  const led = new ledger();
  console.log(req.body.name);
  let id = await getId(req.body.name);
  let orderId = await getOrderId(id);

  await led
    .insertNewLedger(
      id,
      orderId,
      req.body.credit,
      req.body.debit,
      req.body.balance,
      req.body.description
    )
    .then(d => {
      res.send("ledger successfully inserted");
    })
    .catch(e => {
      res.send("Operation unsuccessfull");
      throw e;
    });
});

//get all ledger data
router.get("/getAllLedger", (req, res) => {
  const led = new ledger();

  led
    .getData()
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.send("Operation unsuccessfull");
      throw e;
    });
});

//get customer ledger against customer id
router.get("/getCustomerLedger/:id", (req, res) => {
  const led = new ledger();

  led
    .getCustLedger(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.send("there is no customer against this customer id");
      throw e;
    });
});

//get customer ledger against order id
router.get("/getCustLedgerO/:id", (req, res) => {
  const led = new ledger();

  led
    .getCustLedger(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.send("there is no customer against this orderId id");
      throw e;
    });
});

//delete ledger data by its order id
router.delete("/deleteLedger/:id", auth, (req, res) => {
  const led = new ledger();

  led
    .deleteOrder(req.params.id)
    .then(result => {
      res.send("successfully deleted the value");
    })
    .catch(e => {
      res.send("there is no customer against this orderId id");
      throw e;
    });
});
module.exports = router;
