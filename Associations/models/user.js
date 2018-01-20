var mongoose = require('mongoose');

// User - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
    }
  ]
});
module.exports = mongoose.model("users", userSchema);