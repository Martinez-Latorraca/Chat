const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
};
