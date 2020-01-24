var mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
    unique: true
  }
});

//get category id by its name
categorySchema.methods.getCategoryId = async function(name) {
  const id = await this.model("productCategory").findOne({ name: name });
  return id;
};

//delete a category name from the data base
categorySchema.methods.deleteName = async function(name) {
  if (!name) throw new Error("name of the category is required");

  const category = await this.model("productCategory").findOne({ name: name });
  if (!category) throw new Error("Category not found");

  return this.model("productCategory").deleteMany({ name: name });
};

let category = mongoose.model("productCategory", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };

  return Joi.validate(category, schema);
}

exports.category = category;
module.exports.validate = validateCategory;
