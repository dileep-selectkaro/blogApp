const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: false,
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    unique: true
  },

  verificationToken: {
    type: String,
    required: false
  },
  isVerified: {
    type: Boolean,
    required: false
  }
});


module.exports = mongoose.model("users", userSchema);
