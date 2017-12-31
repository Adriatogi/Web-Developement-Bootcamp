var express = require('express'), // if it is consecutive variable decleration, you dont have to say var in the beggining and seperate each variable with a comma
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("campgrounds", campgroundSchema); //arguement has to be plural for mongoose

app.get("/", function(req, res){
    res.render("landing");
});

// Index - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("An error has occured");
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//Create - add new campground to database
app.post("/campgrounds", function(req, res){
    var name = req.body.name,
    image = req.body.image,
    desc = req.body.description,
    newCampground = {name: name, image: image, description: desc};
    
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newCampground){
         if(err){
            console.log("An error has occured");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    res.redirect("/campgrounds");
});

//New - show form to create a new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

//Show - show more information of one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log("An error has occured");
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})