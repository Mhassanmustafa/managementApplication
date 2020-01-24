var mongoose = require("mongoose");
var _ = require("lodash");

const orderListSchema = mongoose.Schema({
  name: String,
  unitPrice: Number,
  quantity: Number,
  amount: Number
});

const ordersSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers"
    },
    orderList: [
      {
        type: orderListSchema
      }
    ]
  },
  { timestamps: true }
);

//insert new order in the data base
ordersSchema.methods.insertOrder = async function(customerID) {
  // if (!order) throw new Error("Id is required");
  if (!customerID) throw new Error("customer id is reqire");
  let newOrder = { customerId: customerID };
  return await this.model("orders").create(newOrder);
};

//get oder list against customer id
ordersSchema.methods.getOrders = async function(id) {
  if (!id) throw new Error("id is required");

  let order = await this.model("orders")
    .findOne({ customerId: id })
    .sort({ createdAt: -1 });

  return order;
};

//update existing order list
ordersSchema.methods.updateList = async function(id, list) {
  if (!id) throw new Error("id must be required");

  let order = await this.model("orders")
    .findOne({ customerId: id })
    .sort({ createdAt: -1 });
  if (!order) throw new Error("there is no order with this customer id");

  order.orderList.push(list);
  return order.save();
};

//delete latest order of the customer
ordersSchema.methods.deleteLatestOrder = async function(id) {
  if (!id) throw new Error("id must be required");

  let order = await this.model("orders")
    .findOne({ customerId: id })
    .sort({ createdAt: -1 });

  if (!order) throw new Error("there is no customer with this order");

  return this.model("orders").deleteOne({ _id: order._id });
};

//get order history
ordersSchema.methods.getOrderHistory = async function() {
  return await this.model("orders").aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "Names"
      }
    },
    { $unwind: "$orderList" }
  ]);
};

let Order = mongoose.model("orders", ordersSchema);

exports.order = Order;
