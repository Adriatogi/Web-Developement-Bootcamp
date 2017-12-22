var express = require('express');
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/:like/:thing", function(req, res){
    var thing = req.params.thing;
    res.render('like.ejs', {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Mike"},
        {title: "Post 3", author: "Neat"}
    ];
    
    res.render("posts.ejs", {posts: posts})
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});