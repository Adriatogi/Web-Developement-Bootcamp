var express = require('express');
var app = express();

//=============
//ROUTES
//=============

app.get("/", function(req, res){
    res.send("Hi tnere, welcome to my assignment");
});

app.get("/speak/pig", function(req, res){
    res.send("The pig says 'Oink'");
});

app.get("/speak/cow", function(req, res){
    res.send("The cow says 'Moo'");
});

app.get("/speak/dog", function(req, res){
    res.send("The dog says 'Woof Woof'");
});

app.get("/repeat/:word/:number", function(req, res){
    var word = req.params.word;
    var number = Number(req.params.number);
    var result = "";
    
    for(var i = 0; i<number; i++) {
         result += (" " +word);
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Sorry, I dont know where you are");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});