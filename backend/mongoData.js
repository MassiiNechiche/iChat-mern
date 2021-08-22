const mongoose = require("mongoose");

const ichatSchema = mongoose.Schema({
  chatName: String,
  conversation: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photoURL: String,
        uid: String,
      },
    },
  ],
});

const model = mongoose.model("conversations", ichatSchema);
module.exports = model;
