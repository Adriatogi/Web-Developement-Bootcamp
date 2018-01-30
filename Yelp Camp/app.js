var bodyParser = require("body-parser"), // if it is consecutive variable decleration, you dont have to say var in the beggining and seperate each variable with a comma
    mongoose = require('mongoose'),
    express = require('express'),
    seedDB = require('./seeds'),
    app = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// seedDB();

//Schema Setup
var Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user');

//==================
//ROUTES
//==================
app.get("/", function(req, res){
    res.render("landing");
});

//==================
//Campground Routes
//==================
// Index - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("An error has occured while searching for all campgrounds");
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
            console.log("An error has occured while creating a new campground");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create a new campground
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

//Show - show more information of one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err|| !foundCampground){
            console.log("An error has occured while looking for campgrounds in show route");
            console.log(err);
            res.redirect("/campgrounds");
            console.log("Webpage has been redirected");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//===============
//Comment Routes
//===============
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
    if(err|| !foundCampground){
            console.log("An error has occured");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: foundCampground});
        }   
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err|| !foundCampground){
            console.log("An error has occuredwhen looking for campground");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err|| !comment){
                    console.log("An error has occured when creating comment");
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    foundCampground.comments.push(comment._id);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id); 
                }
            });
        }   
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})