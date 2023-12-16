const Product = require("../models/Product");
const Container = require("../models/Container");
const Style = require("../models/Style");

module.exports = async () => {
  const products = [
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
    {
      photos: [],
      stock: 1000,
      featured: false,
    },
  ];

  const styles = await Style.find();
  const containers = await Container.find();

  for (let i = 0; i < products.length; i++) {
    const styleIndex = i % styles.length;
    const containerIndex = i % containers.length;

    products[i].style = styles[styleIndex]._id;
    products[i].container = containers[containerIndex]._id;
    if (containers[containerIndex].name === "keg") {
      products[i].name = `${styles[styleIndex].name} ${containers[containerIndex].name} ${(
        containers[containerIndex].volume *
        1000 *
        process.env.CONVERT_ML_GAL
      ).toFixed(2)} Gal`;
    } else {
      products[i].name = `${styles[styleIndex].name} ${containers[containerIndex].name} ${(
        containers[containerIndex].volume *
        1000 *
        process.env.CONVERT_ML_GAL
      ).toFixed(2)} Oz`;
    }
    products[i].price = `${(styles[styleIndex].price * containers[containerIndex].volume).toFixed(
      2,
    )}`;
  }

  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
