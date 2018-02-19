var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

module.exports = mongoose.model("campgrounds", campgroundSchema); //arguement has to be plural for mongoose
