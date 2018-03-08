var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require ("../models/comment");

//Comment Routes
//==============

// Create a new comment
router.get("/new", isLoggedIn, function(req, res){
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

// Create new comment
router.post("/", isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    foundCampground.comments.push(comment._id);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id); 
                }
            });
        }   
    });
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;