var express = require('express');
var app = express();

//===============
//ROUTES
//===============

app.get("/r/:subRedditName", function(req, res){
    var subreddit = req.params.subRedditName.toUpperCase();
    
    res.send("Welcome to the "+subreddit+" subreddit!");
});

app.get("/", function(req, res) {
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye");
});

app.get("/dog", function(req, res){
    res.send("Meow!");
});

app.get("*", function(req, res){
    res.send("You're a star!!!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});