var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var campgrounds=[
        {name: "Salmon Creek", image: "https://www.photosforclass.com/download/5641024448"},
        {name: "Granite Hill", image: "https://www.photosforclass.com/download/4369518024"},
        {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/2602356334"},
        {name: "Salmon Creek", image: "https://www.photosforclass.com/download/5641024448"},
        {name: "Granite Hill", image: "https://www.photosforclass.com/download/4369518024"},
        {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/2602356334"},
        {name: "Granite Hill", image: "https://www.photosforclass.com/download/4369518024"},
        {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/2602356334"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})