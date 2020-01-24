var mongoose = require("mongoose");
var _ = require("lodash");

const quantitySchema = new mongoose.Schema(
  {
    quantityAvailable: {
      type: Number
    },
    description: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
);

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  quantity: [{ type: quantitySchema }]
});

//start methods from here

//insert new products in the stock
stockSchema.methods.insertNewStock = async function(productId, stock) {
  if (!stock) throw new Error("stock data is require");
  if (!productId) throw new Error("productId is require");

  //check if product is already present in data base or not
  let product = await this.model("stocks").findOne({ productId: productId });
  if (product)
    throw new Error(
      "there is already product name in the stock please update stock please"
    );
  let data = { productId: productId, quantity: stock };

  return await this.model("stocks").create(data);
};

//update quantity of the stock by product id
stockSchema.methods.updateQuantity = async function(productId, stockHistory) {
  if (!stockHistory) throw new Error("stock data is require");
  if (!productId) throw new Error("productId is require");

  //check if product is available or not
  let product = await this.model("stocks").findOne({ productId: productId });
  if (!product)
    throw new Error(
      "there is no product of this name is available please try aga"
    );

  product.quantity.push(stockHistory);

  return await product.save();
};

//get the latest stock quantity
stockSchema.methods.getlatestQuantity = async function(productId) {
  if (!productId) throw new Error("productId is require");

  //check if product is available or not
  let product = await this.model("stocks").findOne({ productId: productId });
  if (!product)
    throw new Error(
      "there is no product of this name is available please try aga"
    );

  //get the array of the quantity
  let array = product.quantity;

  //get the sorted array in decending order
  let sortedArray = _.sortBy(array, "createdAt").reverse();

  //get the top element of the sorted array
  let top = _.head(sortedArray);

  //get the quantity
  return top.quantityAvailable;
};

//get stock history of the product
stockSchema.methods.getStockHistory = async function(productId) {
  if (!productId) throw new Error("productId is require");

  //check if product is available or not
  let product = await this.model("stocks").findOne({ productId: productId });
  if (!product)
    throw new Error(
      "there is no product of this name is available please try aga"
    );

  return product.quantity;
};

//delete product stock completely
stockSchema.methods.deleteStock = async function(productId) {
  if (!productId) throw new Error("productId is require");

  //check if product is available or not
  let product = await this.model("stocks").findOne({ productId: productId });
  if (!product)
    throw new Error(
      "there is no product of this name is available please try aga"
    );

  return await this.model("stocks").deleteOne({ productId: productId });
};

stockSchema.methods.getAllStockData = async function() {
  return await this.model("stocks").aggregate([
    { $unwind: "$quantity" },
    { $sort: { "quantity.createdAt": -1 } },
    { $group: { _id: "$productId", quantity: { $push: "$quantity" } } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "name"
      }
    }
  ]);
};

stockSchema.methods.getAllStockHistoy = async function() {
  return await this.model("stocks").aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "name"
      }
    },
    { $unwind: "$quantity" }
  ]);
};

let Stock = mongoose.model("stocks", stockSchema);

exports.stock = Stock;
