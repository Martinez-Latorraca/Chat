const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const styleRoutes = require("./styleRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/auth", authRoutes);
  app.use("/orders", orderRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/styles", styleRoutes);
};
