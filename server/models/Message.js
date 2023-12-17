const { mongoose } = require("../db");
const bcrypt = require("bcryptjs");

const messageSchema = new mongoose.Schema(
    {
        fromUser: String,
        content: String,
        toUser: String,
    },
    { timestamps: true },
);

messageSchema.methods.toJSON = function () {
    const message = this._doc;
    message.id = this._id.toString();
    delete message._id;
    delete message.__v
    return message;
};


module.exports = mongoose.model("Messages", messageSchema);
