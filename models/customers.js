var mongoose = require("mongoose");
var Joi = require("joi");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50
    },
    phoneNo: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().max(50)
  };
  return Joi.validate(customer, schema);
}

//insert new customer in the data base
customerSchema.methods.insertNewCustomer = async function(name, customer) {
  if (!customer) throw new Error("please enter customer info first");
  let ccustomer = await this.model("customers").findOne({ name: name });
  if (ccustomer)
    throw new Error("there is already a customer present in database");

  return await this.model("customers").create(customer);
};

//get customer id by the customer name
customerSchema.methods.getCustomerId = async function(name) {
  if (!name) throw new Error("name required to get customer id");

  //geting the customer object
  let customer = await this.model("customers").findOne({ name: name });
  if (!customer)
    throw new Error("there is a no customer with this name in database");

  return customer;
};

//get all customers names
customerSchema.methods.getAllcustomers = async function() {
  return await this.model("customers").find();
};

//get all customer info
customerSchema.methods.getAllInfo = async function() {
  return await this.model("customers").find();
};

let customers = mongoose.model("customers", customerSchema);

exports.customers = customers;
exports.validate = validateCustomer;
