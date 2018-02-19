var passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();
    
    
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(require("express-session")({
  secret: "Adriatogi wants to get a job",
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=============
//ROUTES
//=============
app.get("/", function(req, res){
  res.render("home");
});

app.get("/member", isLoggedIn, function(req, res){
  res.render("member");  
});

//AUTH ROUTES
//show sign up form
app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err || !user){
      console.log("There was an error searching for user");
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("member");
    });
  });
});

//LOGIN ROUTES
//redner login form
app.get("/login", function(req, res){
  res.render("login");
});

//login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/member",
  failureRedirect: "/login"
}),function(req, res){});

//LOGOUT ROUTES
//logout
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started");
}); 