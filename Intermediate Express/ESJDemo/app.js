var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

app.get("/:like/:thing", function(req, res){
    var thing = req.params.thing;
    res.render('like', {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Mike"},
        {title: "Post 3", author: "Neat"}
    ];
    
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});