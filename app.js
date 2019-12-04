//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();
const server2 = require("./server");

//dummy population
const initialRating = {
  author: "mark",
  Rating: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet" +
    "dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. " +
    "Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat" +
    " pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies." +
    "Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at." +
    "Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
};
// userschema
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

class Server {
  constructor(initialRating, userSchema, User, ratingSchema, Rating) {
    this.initialRating = initialRating;
    this.userSchema = userSchema;
    this.User = User;
    this.ratingSchema = ratingSchema;
    this.Rating = Rating;
    this.initDb();
    this.initViewEngine();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(3000, () =>  console.log("Server started on port 3000"));
  }

  initRoutes() {
    app.get("/", (req, res) =>
      Rating.find({}, (err, ratings) =>
        res.render("home", {
          initialAutohr: initialRating.author,
          initialRating: initialRating.Rating
        })));

    app.get("/login", (req, res) => res.render("login"));

    app.get("/register", (req, res) => res.render("register"));

    app.get("/ratings", (req, res) => {

      res.render("ratings", {
        initialAutohr: initialRating.author,
        initialRating: initialRating.Rating
      });
    });

    app.post("/register", (req, res) => {
      const newUser = new User({
        email: req.body.username,
        password: req.body.password
      });
      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("dummyPage");
        }
      });
    });

    app.post("/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      User.findOne({
        email: username
      }, (err, foundUser) => {
        if (!err) {
          if (foundUser) {
            if (foundUser.password === password) {
              res.render("dummyPage");
            }
          }
        } else {
          console.log(err);
        }
      });
    });
  }

  initExpressMiddleware() {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  initViewEngine() {
    app.set('view engine', 'ejs');
    app.use(express.static("public"));
  }

  initDb() {
    mongoose.connect("mongodb://localhost:27017/kinoUserDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // login, registeration
    const secret = process.env.SECRET;
    userSchema.plugin(encrypt, {
      secret: secret,
      encryptedFields: ['password']
    });
  }
}

//const beginn = server;
const server = new Server(initialRating, userSchema, User, ratingSchema, Rating);
