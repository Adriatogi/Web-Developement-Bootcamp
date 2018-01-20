var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require('./models/post');
var User = require('./models/user');

// User.findOne({email: "chaiwat.mue@forprice.co"}).populate("posts").exec(function(err, user){
//   if(err){
//     console.log("There was an error");
//     console.log(err);  
//   } else {
//     console.log(user);
//   }
// });

// Post.create({
//   title: "I love pigs!",
//   content: "Rump corned beef shoulder short loin. Tail tri-tip burgdoggen short loin chuck. Flank tenderloin andouille landjaeger meatloaf rump. Turducken meatball beef ribs pig shank jowl alcatra leberkas t-bone kielbasa landjaeger shankle kevin tail tenderloin."
//   }, function (err, post){
//     if(err){
//       console.log("There was an error creating the post");
//       console.log(err);
//     } else {
//       User.findOne({email: "chaiwat.mue@forprice.co"}, function(err, foundUser){
//       if(err){
//         console.log("There was an error finding the user");
//         console.log(err);
//       } else {
//         console.log("User found");
//         console.log(foundUser);
//         foundUser.posts.push(post);
//         foundUser.save(function(err, data){
//           if(err){
//             console.log("There was an error saving the user with post");
//             console.log(err);  
//           } else {
//             console.log("User saved");
//             console.log(data);
//           } 
//         }); 
//       }   
//     })}
//   });
  
// User.create({
//   email: "chaiwat.mue@forprice.co",
//   name: "Chad Kipno"
// }, function(err, post){
//   if(err){
//     console.log("There was an error");
//     console.log(err);
//   }else {
//     console.log("User created");
//     console.log(post);
//   }
//   });

// var newUser = new User({
//   email: "uzravenz@hamusoku.gq",
//   name: "Robert Pop"
// });

// newUser.posts.push({
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

// User.findOne({name: "Robert Pop"}, function(err, foundUser){
//   if(err){
//     console.log("There was an error");
//     console.log(err);
//   } else {
//     console.log("User found");
//     foundUser.posts.push({
//       title: "How to Eat a Banana",
//       content: "You peel and then you bite and bite and bite."
//     });
//     foundUser.save(function(err, user){
//       if(err){
//         console.log("There was an error");
//         console.log(err);
//       } else {
//         console.log("User edited");
//         console.log(user);
//       } 
//     });
//   }
// });