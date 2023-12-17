const { mongoose } = require("../db");

const conversationSchema = new mongoose.Schema(
    {
        users: [],
        messages: [],
    },
    { timestamps: true },
);

conversationSchema.methods.toJSON = function () {
    const conversation = this._doc;
    conversation.id = this._id.toString();
    delete conversation._id;
    delete conversation.__v
    return conversation;
};

module.exports = mongoose.model("Conversations", conversationSchema);
