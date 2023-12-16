const { mongoose } = require("../db");

const containerSchema = new mongoose.Schema({
  name: String,
  volume: Number,
});

// containerSchema.methods.toJSON = function () {
//   const container = this._doc;
//   container.id = this._id.toString();
//   delete container._id;
//   return container;
// };
containerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Container", containerSchema);
