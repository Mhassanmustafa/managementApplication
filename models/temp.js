var mongoose = require("mongoose");

const orderListSchema = mongoose.Schema({
  name: String,
  unitPrice: Number,
  quantity: Number,

  amount: Number
});

let temp = mongoose.model("temp", orderListSchema);

exports.temp = temp;
