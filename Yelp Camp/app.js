var passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"), 
    flash = require("connect-flash"),
    mongoose = require('mongoose'),
    passport = require("passport"),
    express = require('express'),
    seedDB = require('./seeds'),
    app = express();

//Schema Setup
var User = require('./models/user');

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
// seedDB();

app.use(require("express-session")({
  secret: "Adriatogi wants to get a job",
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//==================
//ROUTES
//==================
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");
   
   
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})