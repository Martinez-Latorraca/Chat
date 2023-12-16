const { mongoose, Schema } = require("../db");

const styleSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  photos: [],
  abv: Number,
  containers: [],
});
styleSchema.set("toJSON", { virtuals: true });

// styleSchema.methods.toJSON = function () {
//   const style = this._doc;
//   style.id = this._id.toString();
//   delete style._id;
//   return style;
// };

module.exports = mongoose.model("Style", styleSchema);
