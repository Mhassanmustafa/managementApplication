var express = require("express");
var router = express.Router();
var { order } = require("../../models/orders");
var { customers } = require("../../models/customers");
const auth = require("../../middleware/auth");

async function getId(name) {
  let cust = new customers();
  let resu = await cust.getCustomerId(name);
  if (!resu) return res.send("there is costomer with this id");
  return resu._id;
}
//insert new order in data base
router.post("/addNewOrder", auth, async (req, res) => {
  const ord = new order();
  let id = await getId(req.body.name1);

  console.log(id);
  //console.log(JSON.stringify(req.body.object));
  //let object = req.body.object;

  ord
    .insertOrder(id)
    .then(d => {
      res.send("Order successfully inserted");
    })
    .catch(e => {
      res.send("Operation unsuccessfull");
      throw e;
    });
});

router.get("/getAllOrders", async (req, res) => {
  await order.find().then(ress => {
    res.send(ress);
  });
});

//get customer order by its id
router.get("/getOrder/:id", (req, res) => {
  const ord = new order();
  ord
    .getOrders(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      throw e;
    });
});

//update order list
router.put("/updateCusomerOrder/:name", auth, async (req, res) => {
  let id = await getId(req.params.name);
  const ord = new order();
  let orderHistory = req.body.object;
  ord
    .updateList(id, orderHistory)
    .then(result => {
      res.send("Successfully updated");
    })
    .catch(e => {
      res.send("not successfully updated");
      throw e;
    });
});

//delete an customer order complete
router.delete("/deleteCustomerOrder/:id", auth, (req, res) => {
  const ord = new order();
  ord
    .deleteLatestOrder(req.params.id)
    .then(result => {
      res.send("Successfully deleted");
    })
    .catch(e => {
      res.send("not successfully deleted");
      throw e;
    });
});

//get order history
router.get("/getAllOrdersList", (req, res) => {
  const ord = new order();
  ord
    .getOrderHistory()
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      throw e;
    });
});

module.exports = router;
