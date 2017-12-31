var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "George",
//   age: 11,
//   temperament: "Grouchy"
// });

// george.save(function(err, cat){
//   if (err){
//     console.log("There was an error");
//   } else {
//     console.log("Cat has been saved to database");
//     console.log(cat);
//   }
// });

Cat.create({
  name:"Snow",
  age: 15,
  temperament: "Bland"
}, function(err, cat){
  if(err){
    console.log("An error occured");
  } else {
    console.log(cat);
  }
});

Cat.find({}, function(err, cats){
  if(err){
    console.log("There was an error");
    console.log(err);
  } else {
    console.log("All the cats");
    console.log(cats);
  }
})