var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {
  checkCampgroundOwnership: function(req, res, next){
    if(req.isAuthenticated()){ // Check if user is logged in
      Campground.findById(req.params.id, function(err, foundCampground) { 
        if(err || !foundCampground){
          req.flash("error", "There was a probelm looking for the campground!!");
          res.redirect("back") ;
          console.log(err);
          console.log("There was a problem finding the comment to check ownership");
        } else { 
          if(foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
          }
        } 
      });
    } else {
      req.flash("error", "You need to be logged in to do that!");
      res.redirect("back");
    }  
  },
  
  checkCommentOwnership: function(req, res, next){
    if(req.isAuthenticated()){ // Check if user is logged in
      Comment.findById(req.params.comment_id, function(err, foundComment) { 
        if(err || !foundComment){
          req.flash("error", "There was a problem finding the comment to check ownership!");
          res.redirect("back") ;
          console.log(err);
          console.log("There was a problem finding the comment to check ownership");
        } else { 
          if(foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
      			console.log("You arent allowed to do that!");
            res.redirect("back");
          }
        } 
      });
    } else {
    	req.flash("error", "You don't have permission to do that!");
      res.redirect("back");
    }  
  },
  
  isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;