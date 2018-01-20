var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo");

// Post - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model("posts", postSchema);

// User - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
var User = mongoose.model("users", userSchema);

// var newUser = new User({
//   email: "uzravenz@hamusoku.gq",
//   name: "Robert Pop"
// });

// newUser.posts.push({ // to add a post to user
//   title: "How to eat an apple",
//   content: "You bite and bite and bite"
// });
// newUser.save(function(err, user){
//   if(err){
//     console.log("There was an error");
//     console.log(err);
//   } else {
//     console.log("User created");
//     console.log(user);
//   }
// });

// var newPost = new post({
//   title: "Space",
//   content: "Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next 10."
// }); 
// newPost.save(function(err, post){
//   if(err){
//     console.log("There was an error");
//     console.log(err);
//   } else {
//     console.log("Post created");
//     console.log(post);
//   }
// })

User.findOne({name: "Robert Pop"}, function(err, foundUser){
  if(err){
    console.log("There was an error");
    console.log(err);
  } else {
    console.log("User found");
    foundUser.posts.push({
      title: "How to Eat a Banana",
      content: "You peel and then you bite and bite and bite."
    });
    foundUser.save(function(err, user){
      if(err){
        console.log("There was an error");
        console.log(err);
      } else {
        console.log("User edited");
        console.log(user);
      } 
    });
  }
});