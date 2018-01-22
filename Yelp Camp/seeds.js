var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');
    
var campgrounds = [
  {
    name: "Forked Lake Campground",
    image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg",
    description: "A very nice campground"
  },
  {
    name: "Wyanbene Campground",
    image: "https://farm3.staticflickr.com/2801/4504029335_e875b05082.jpg",
    description: "A great environment"  
  },
  {
    name: "Kirk Creek Campground",
    image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
    description: "Nature friendly!"  
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