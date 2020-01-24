const Joi = require("joi");
var mongoose = require("mongoose");
const _ = require("lodash"); //import it to handle the array objects

const priceHistorySchema = new mongoose.Schema(
  {
    sellPrice: Number,
    boughtPrice: Number
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    unique: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory"
  },
  prices: [{ type: priceHistorySchema }]
});

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
  };
  return Joi.validate(product, schema);
}

// insert new product in the data base
productSchema.methods.insertNewProduct = function(
  name,
  categoryId,
  priceHistory
) {
  if (!name) throw new Error("Name required");
  if (!categoryId) throw new Error("category name is required");

  const product = { name: name, categoryId: categoryId, prices: priceHistory };
  return this.model("Product").create(product);
};

//get product id by its name
productSchema.methods.getProduct = async function(name) {
  const id = await this.model("Product").findOne({ name: name });
  return id;
};

//update price of the product
productSchema.methods.updatePrices = async function(name, priceHistory) {
  const product = await this.model("Product").findOne({ name: name });
  if (!product) throw new Error("Product not found");
  product.prices.push(priceHistory);
  return product.save();
};

//get product price
productSchema.methods.getSellPrice = async function(name) {
  if (!name) throw new Error("name required to search the product");

  const product = await this.model("Product").findOne({ name: name });
  if (!product) throw new Error("Product not found");

  //get the array of the prices object
  const array = product.prices;

  //sort the object array according to the time stamp in descending order
  const sort = _.sortBy(array, "createdAt").reverse();

  //select the top element of the objects
  const top = _.head(sort);

  //return the sell price of the given product
  return top.sellPrice;
};

//get the purchase price of the product
productSchema.methods.getPurchasePrice = async function(name) {
  if (!name) throw new Error("name required to search the product");

  const product = await this.model("Product").findOne({ name: name });
  if (!product) throw new Error("Product not found");

  //get the array of the prices object
  const array = product.prices;

  //sort the object array according to the time stamp in descending order
  const sort = _.sortBy(array, "createdAt").reverse();

  //select the top element of the objects
  const top = _.head(sort);

  //return the bought price of the given product
  return top.boughtPrice;
};

//delete an product from the database completely
productSchema.methods.delectProduct = async function(name) {
  if (!name) throw new Error("name of the product is required");

  const product = await this.model("Product").find({ name: name });
  if (!product) throw new Error("Product not found");

  return this.model("Product").deleteMany({ name: name });
};

//get all product
productSchema.methods.getAllProduct = async function() {
  return await this.model("Product").aggregate([{ $unwind: "$prices" }]);
};

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
module.exports.validates = validateProduct;
