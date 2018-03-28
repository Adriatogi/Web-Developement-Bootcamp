var Campground = require("../models/campground"),
		Comment = require ("../models/comment"),
		middleware = require("../middleware"),
		express = require("express");

var router = express.Router({mergeParams: true});
	
//Comment Routes
//==============

// Create a form for a new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
	if(err|| !foundCampground){
			req.flash("error", "There was an error while finding the campground that includes the comment. Please try again later!");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.render("comments/new", {campground: foundCampground});
		}   
	});
});

// Create new comment
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err|| !foundCampground){
			req.flash("error", "An error has occure when looking for the campground to add the comment. Please try again later!");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err|| !comment){
					req.flash("error", "An error occured while creating the new comment!");
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
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/" + foundCampground._id); 
				}
			});
		}
	});
});

//Edit- edit existing campground form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err || !foundComment){
			req.flash("error", "There was an error searching the comment to edit");
			res.redirect("back");
			console.log(err);
		}
		res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});    
		
	});
});


//Update - update exisitng comment  logic
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,function(err, updatedComment){
	if(err){
		req.flash("error", "There was an error updating the comment");
		res.redirect("back");
		console.log(err);
	} else {
		res.redirect("/campgrounds/"+req.params.id);
	} 
	});
});

//Destroy - Delete an existing campground
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            req.flash("error", "There was a problem finding the comment to delete");
            res.redirect("back");
        } else {
        	req.flash("success", "Comment removed!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;