"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ExpertSchema = new Schema({
    name: String,
    prof: String,
    adress: String
});
module.exports = mongoose.model("Expert", ExpertSchema);
