var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');
    
var campgrounds = [
  {
    name: "Forked Lake Campground",
    image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg",
    description: "The man who does the best job is the one who is happy at his job. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. Trees cover up a multitude of sins. You have to make these big decisions. We start with a vision in our heart, and we put it on canvas.<br> It's life. It's interesting. It's fun. There's not a thing in the world wrong with washing your brush. With something so strong, a little bit can go a long way."
  },
  {
    name: "Wyanbene Campground",
    image: "https://farm3.staticflickr.com/2801/4504029335_e875b05082.jpg",
    description: "The man who does the best job is the one who is happy at his job. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. Trees cover up a multitude of sins. You have to make these big decisions. We start with a vision in our heart, and we put it on canvas.<br> It's life. It's interesting. It's fun. There's not a thing in the world wrong with washing your brush. With something so strong, a little bit can go a long way."
  },
  {
    name: "Kirk Creek Campground",
    image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
    description: "The man who does the best job is the one who is happy at his job. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. Trees cover up a multitude of sins. You have to make these big decisions. We start with a vision in our heart, and we put it on canvas.<br> It's life. It's interesting. It's fun. There's not a thing in the world wrong with washing your brush. With something so strong, a little bit can go a long way."
  }
];
   
function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err, ejs){
    if(err){
      console.log("An error has occured when removing campgrounds");
      console.log(err);
    } 
    console.log("removed campgrounds");
    //Add a few campgrounds
    campgrounds.forEach(function(seed){
      Campground.create(seed, function(err, campgrounds){
        if(err){
          console.log("An error has occured when creating campgrounds");
          console.log(err);
        } else {
          console.log("Added campground");
          //Create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment){
            if(err){
              console.log("An error has occured when creating comment");
              console.log(err);
            } else {
              campgrounds.comments.push(comment._id);
              campgrounds.save();
              console.log("Created comment");
            }
          });
        }
      });
    });
  });  
}

module.exports = seedDB;