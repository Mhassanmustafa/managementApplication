var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var { category, validate } = require("../../models/productCategory");
var product = require("../../models/products");
const auth = require("../../middleware/auth");

/* GET home page. testing*/
router.get("/", function(req, res, next) {
  res.send("welcome to api");
});

//add new category in the data base
router.post("/addNewCategory", auth, async (req, res) => {
  //validate the category body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if name is present in data base or not
  let cat = await category.findOne({ name: req.body.name });
  if (cat) return res.status(400).send("Category is alredy present");

  //add new category
  const Category = new category({
    name: req.body.name
  });
  const result = await Category.save().then(
    res.send("Product Category is added suucessfully")
  );
});

//get all category names from the data base
router.get("/getCatNames", async (req, res) => {
  const names = await category.find().select("name");

  // use to insert drop down
  var name = Object.values(names);
  for (var result of name) {
    console.log(result.name);
  }

  res.send(name);
});

//delete a category by its name
router.delete("/deleteCategory/:name", auth, (req, res) => {
  const cat = new category();

  let result = cat.deleteName(req.params.name);

  result
    .then(result => {
      res.send("category deleted successfully");
    })
    .catch(e => {
      res.send("Deletion unsuccessfull as category of this name is not found");
      throw e;
    });
});

//route to get category id
router.get("/getCatId/:name", (req, res) => {
  let cat = new category();
  const id = cat.getCategoryId(req.params.name);

  id.then(result => {
    if (!result) return res.status(400).send("Category is not present");
    res.send(result._id);
  });
});

/* start of the product routes  */

//insert new product in the data base
router.post("/addNewProduct", auth, async (req, res) => {
  //check if the product is already present or not
  let pro = await product.findOne({ name: req.body.name });
  if (pro) return res.status(400).send("product is already present");

  //insert new product in data base
  const prod = new product();

  prod
    .insertNewProduct(req.body.name, req.body.catId, {
      sellPrice: req.body.sellPrices,
      boughtPrice: req.body.purchasePrices
    })
    .then(d => {
      res.send("Successfully created");
    })
    .catch(e => {
      throw e;
    });
});

//get all products names in the data base with descending order of updated on
router.get("/getAllProducts", async (req, res) => {
  const names = await product.aggregate([
    { $unwind: "$prices" },
    { $sort: { "prices.createdAt": -1 } },
    { $group: { _id: "$name", prices: { $push: "$prices" } } }
  ]);

  res.send(names);
});

//get all the price history of the product
router.get("/getPriceHistory", (req, res) => {
  const prod = new product();

  prod.getAllProduct().then(result => {
    res.send(result);
  });
});

//get id of the specific product
router.get("/getProduct/:name", async (req, res) => {
  let prod = new product();
  const id = prod.getProduct(req.params.name);
  id.then(result => {
    if (!result) return res.status(400).send("Product not found");
    res.send(result._id);
  });
});

//update sell and the brought price
router.put("/updateSellPrices/:name", auth, async (req, res) => {
  const pro = new product();

  //get previous Purchase price
  let boughtPrice = await pro.getPurchasePrice(req.params.name);

  pro
    .updatePrices(req.params.name, {
      sellPrice: req.body.sellPrice,
      boughtPrice: boughtPrice
    })
    .then(d => {
      res.send("Prices are Successfully updated");
    })
    .catch(e => {
      res.send("Product not found");
      throw e;
    });
});

//update the purchase price of the product
router.put("/updatePurchasePrices/:name", auth, async (req, res) => {
  const pro = new product();

  //get previous Purchase price
  let sellPrice = await pro.getSellPrice(req.params.name);

  pro
    .updatePrices(req.params.name, {
      sellPrice: sellPrice,
      boughtPrice: req.body.boughtPrice
    })
    .then(d => {
      res.send("Prices are Successfully updated");
    })
    .catch(e => {
      res.send("Product not found");
      throw e;
    });
});

//get the sell price of the product by its name
router.get("/getSellPrice/:name", (req, res) => {
  const pro = new product();

  let result = pro.getSellPrice(req.params.name);
  result
    .then(result => {
      res.send(result.toString()); //change the result to string
    })
    .catch(e => {
      res.send("price not found as product is not found of this name");
      throw e;
    });
});

//get the bought price of the product by its name
router.get("/getPurchasePrice/:name", (req, res) => {
  const pro = new product();

  let result = pro.getPurchasePrice(req.params.name);
  result
    .then(result => {
      res.send(result.toString()); //change the result to string
    })
    .catch(e => {
      res.send("price not found as product is not found of this name");
      throw e;
    });
});

//to delete a product completely from the data base
router.delete("/deleteProduct/:name", auth, async (req, res) => {
  //make a new object of the product
  const stocks = new stock();

  const pro = new product();
  let id = await pro.getProductid(req.params.name);
  await stocks.deleteStock(id).catch(async e => {
    await pro
      .delectProduct(req.params.name)
      .then(result => {
        res.send("product deleted successfully");
      })
      .catch(e => {
        res.send("Deletion unsuccessfull as product of this name is not found");
        throw e;
      });
  });
  await pro
    .delectProduct(req.params.name)
    .then(result => {
      res.send("product deleted successfully");
    })
    .catch(e => {
      res.send("Deletion unsuccessfull as product of this name is not found");
      throw e;
    });
});

module.exports = router;
