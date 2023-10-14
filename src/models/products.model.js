const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = "products";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  image: String,
  id: String
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };
