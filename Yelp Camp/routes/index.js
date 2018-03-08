var User = require ("../models/user"),
    passport = require("passport"),
    express = require("express"),
    router = express.Router();

router.get("/", function(req, res){
    res.render("landing");
});

//Auth Routes
//===============

// show register form
router.get("/register", function(req, res){
   res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err || !user){
      console.log(err);
      console.log("There was an error signing up");
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// show login form
router.get("/login", function(req, res){
   res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;