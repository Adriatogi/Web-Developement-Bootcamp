var bodyParser = require('body-parser'),
mongoose = require('mongoose'),
express = require('express'),
app = express();

// App config
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static("public")); // this will let us use static files like css and js files in our express app
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("blogs", blogSchema);

// Blog.create({
//   title: "Yeet",
//   image: "goo.gl/j5wWrZ",
//   body: "- &#8220;Bidoof, they outnumber you 5 to 1!&#8221;</br> - &#8220;Then it is an even fight&#8221;"
// });

//Restful Routes
app.get("/", function(req, res){
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if (err){
      console.log("There was an error");
      console.log(err);
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is listening");
})