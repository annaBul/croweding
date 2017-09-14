var mongoose = require("mongoose");
var UserModel = require("./user");
var ProjectModel = require("./project");
var CommentModel = require("./comment");
var NewsModel = require("./news");
var SupporterModel = require("./supporter");

module.exports = {
    UserModel,
    ProjectModel,
    CommentModel,
    NewsModel,
    SupporterModel,
};
