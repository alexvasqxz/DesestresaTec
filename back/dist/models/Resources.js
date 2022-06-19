"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ResourceSchema = new Schema({
    title: String,
    author: String,
});
module.exports = mongoose.model("Resource", ResourceSchema);
