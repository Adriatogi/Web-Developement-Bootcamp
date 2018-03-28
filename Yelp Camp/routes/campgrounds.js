var Campground = require("../models/campground"),
    middleware = require("../middleware"),
    express = require("express"),
    router = express.Router();

//Campground Routes
//==================

// Index - show all campgrounds
router.get("/", function(req, res){
    //Get campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
          req.flash("error", "There was an error while searching for all campgrounds!");
          console.log(err);
        } else {
          res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//Create - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name,
    image = req.body.image,
    desc = req.body.description,
    author = {
        id: req.user._id,
        username: req.user.username
    },
    newCampground = {name: name, image: image, description: desc, author: author};
    
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newCampground){
         if(err){
           req.flash("error", "An error has occured while creating a new campground");
          console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create a new campground
router.get("/new", middleware.isLoggedIn,  function(req,res){
    res.render("campgrounds/new");
});

//Show - show more information of one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err|| !foundCampground){
            req.flash("error", "We couldn;t find the campground. Please try again later!");
            console.log(err);
            res.redirect("/campgrounds");
            console.log("Webpage has been redirected");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit- edit existing campground form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground){
          req.flash("error", "There was an error searching the campground to edit!");
            res.redirect("/campgrounds");
            console.log(err);
        }
        res.render("campgrounds/edit", {campground: foundCampground});    
        
    });
});

//Update - update exisitng campground logic
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err, updatedCampground){
    if(err){
      req.flash("error", "There was an error updating the campground!");
      res.redirect("/campgrounds");
      console.log(err);
    } else {
      res.redirect("/campgrounds/"+req.params.id);
    } 
  });
});

//Destroy - Delete an existing campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
          req.flash("error", "There was a problem finding the campground to delete. Please try again later!");
          console.log(err);
          res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;