var express = require("express");
var router = express.Router();
var { stock } = require("../../models/stocks");
var product = require("../../models/products");
const auth = require("../../middleware/auth");

//add new product stock first time
router.post("/insertNewStock", auth, async (req, res) => {
  const stocks = new stock();
  let productId = await getProductId(req.body.name);
  // console.log(productId);
  let object = {
    quantityAvailable: req.body.quantity,
    description: req.body.description
  };
  stocks
    .insertNewStock(productId, object)
    .then(result => {
      res.send("Successfully Inserted");
    })
    .catch(e => {
      throw e;
    });
});

async function getProductId(name) {
  let prod = new product();
  console.log(name);
  let result = await prod.getProduct(name);

  return result._id;
}

//update product stock
router.put("/updateStocks/:name", auth, async (req, res) => {
  const stocks = new stock();
  let id = await getProductId(req.params.name);
  let object = {
    quantityAvailable: req.body.quantityAvailable,
    description: req.body.description
  };
  stocks
    .updateQuantity(id, object)
    .then(result => {
      res.send("Successfully updated");
    })
    .catch(e => {
      res.send("product name is not available try again");
      throw e;
    });
});

//get the latest quantity available of the product
router.get("/getProductStock/:name", async (req, res) => {
  const stocks = new stock();
  let id = await getProductId(req.params.name);
  stocks
    .getlatestQuantity(id)
    .then(result => {
      res.send(result.toString());
    })
    .catch(e => {
      res.send("product name is not available try again");
      throw e;
    });
});

//get the stock history of the product by its id
router.get("/getStockHistory/:id", (req, res) => {
  const stocks = new stock();

  stocks
    .getStockHistory(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.send("product name is not available try again");
      throw e;
    });
});

//delete the product all stock history
router.delete("/deleteProduct/:id", auth, (req, res) => {
  const stocks = new stock();

  stocks
    .deleteStock(req.params.id)
    .then(result => {
      res.send("Product stock details deleted successfully");
    })
    .catch(e => {
      res.send("product not found try again");
      throw e;
    });
});

//get all stock available in the database
router.get("/getAllStocks", (req, res) => {
  const stocks = new stock();

  stocks
    .getAllStockData()
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      throw e;
    });
});

//get all the stock history
router.get("/getAllStockHistory", (req, res) => {
  const stocks = new stock();
  stocks
    .getAllStockHistoy()
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      throw e;
    });
});

module.exports = router;
