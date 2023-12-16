const Product = require("../models/Product");
const Container = require("../models/Container");
const Style = require("../models/Style");

async function index(req, res) {
  const products = await Product.find().populate("container").populate("style");

  return res.status(200).json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.params.id).populate("container").populate("style");

  return res.json(product);
}

async function store(req, res) {
  console.log(req.body.container);
  try {
    const container = await Container.findById(req.body.container);
    const style = await Style.findById(req.body.style);
    console.log("container: ", container);

    let name = ``;
    if (container.name === "keg") {
      name = `${style.name} ${container.name} ${(
        container.volume *
        1000 *
        process.env.CONVERT_ML_GAL
      ).toFixed(2)} Gal`;
    } else {
      name = `${style.name} ${container.name} ${(
        container.volume *
        1000 *
        process.env.CONVERT_ML_OZ
      ).toFixed(2)} Oz`;
    }
    const price = `${(style.price * container.volume).toFixed(2)}`;

    const newProduct = await Product.create({
      style: style,
      container: container,
      stock: req.body.stock,
      featured: req.body.featured,
      name: name,
      price: price,
    });
    const product = await Product.findOne(newProduct).populate("container").populate("style"); // TODO
    return res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      stock: req.body.stock,
    });
    const productToFront = await Product.findById(req.params.id);

    res.status(201).json(productToFront);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function destroy(req, res) {
  try {
    await Product.findByIdAndDelete(req.body.productId);

    return res.status(200).send({ message: "Product deleted" });
  } catch (err) {
    return res.status(404).send({ message: "Something went wrong, try again later" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
