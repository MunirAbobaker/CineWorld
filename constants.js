//jshint esversion:6
  const mongoose = require("mongoose");
  const initialRating = {
     author: "mark",
     Rating: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
  };
  const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });
  const User = new mongoose.model("User", userSchema);
  // ratingSchema
  const ratingSchema = {
    author: String,
    content: String
  };
  const Rating = new mongoose.model("Rating", ratingSchema);
  
  module.exports = {
    initialRating : initialRating,
    userSchema : userSchema,
    User : User,
    ratingSchema : ratingSchema,
    Rating : Rating
  };
// //   module.exprts = userSchema;
// //   module.exports = User;
// //   module.exports = ratingSchema;
