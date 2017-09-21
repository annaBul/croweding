var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Project = new Schema({
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        default: 0,
    },
    category: {
        type: String,
    },
    country: {
        type: String,
    },
    imageUrl: {
        type: String,
        //need a default img 
    },
    totalBudget: {
        type: Number,
        default: 0,
    },
    completionDate: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "BYN"
    },
    description: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    news: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'News',
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment',
    }],
    supporters: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Supporter',
    }],

});

var ProjectModel = mongoose.model('Project', Project);
module.exports = ProjectModel;