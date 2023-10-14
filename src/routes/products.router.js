const { Router } = require("express");
const { productModel } = require("../models/products.model");
const mongoosePaginate = require("mongoose-paginate-v2");

const router = Router();

router.get("/", async (req, res) => {
  try {
      const { sort, category, limit } = req.query;
      const query = {};

      if (category) {
          query.category = category;
      }

      let productsQuery = productModel.find(query);

      if (sort) {
          productsQuery = productsQuery.sort(sort); 
      }

      if (limit) {
          productsQuery = productsQuery.limit(parseInt(limit)); 
      }

      const products = await productsQuery;

      res.send({ result: "success", payload: products });
  } catch (error) {
      console.error(error);
      res.status(500).send({ result: "error", message: "Ha ocurrido un error al obtener los productos." });
  }
});



router.post("/", async (req, res) => {
  let { name, category, price, stock, image } = req.body;
  if (!name || !category || !price || !stock || !image) {
    res.send({ status: "error", error: "Faltan parametros" });
  }

  let result = await productModel.create({
    name,
    category,
    price,
    stock,
    image,
  });
  res.send({ result: "success", payload: result });
});

router.put("/:uid", async (req, res) => {
  let { uid } = req.params;

  let userToReplace = req.body;
  if (
    !userToReplace.name ||
    !userToReplace.category ||
    !userToReplace.price ||
    !userToReplace.stock ||
    !userToReplace.image
  ) {
    res.send({ status: "error", error: "Faltan parámetros, por favor completar" });
  }

  let result = await productModel.updateOne({ _id: uid }, userToReplace);
  res.send({ result: "success", payload: result });
});

router.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await productModel.deleteOne({ _id: uid });
  res.send({ result: "success", payload: result });
});
// la descripcion es para el el app.js pueda consumir lo de este archivo
module.exports = router;
