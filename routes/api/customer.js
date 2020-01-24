var express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");

var { customers, validate } = require("../../models/customers");

router.get("/", (req, res) => {
  res.send("welcome to customer");
});

//insert new customer in the data base
router.post("/addNewCustomer", auth, async (req, res) => {
  const cust = new customers();
  await cust.insertNewCustomer(req.body.name, req.body).then(result => {
    res.send("succesfully inserted");
  });
});

//get customer id by its name
router.get("/getCustomerId/:name", (req, res) => {
  const cust = new customers();

  cust
    .getCustomerId(req.params.name)
    .then(result => {
      res.send(result._id);
    })
    .catch(e => {
      res.send("customer of this name is not found try again");
      throw e;
    });
});

//get all customers names
router.get("/getAllCustomers", (req, res) => {
  const cust = new customers();

  cust
    .getAllcustomers()
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.send("there is not customers in data base");
      throw e;
    });
});

//get all customers info
router.get("/getAllInfo", (req, res) => {
  const cust = new customers();

  cust
    .getAllInfo()
    .then(result => {
      console.log(result.name);
      res.send(result);
    })
    .catch(e => {
      res.send("there is not customers in data base");
      throw e;
    });
});

module.exports = router;
