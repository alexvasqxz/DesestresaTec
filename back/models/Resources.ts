var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema ({
    title: String,
    author: String,
    description: String,
    link: String
});

module.exports = mongoose.model("Resource", ResourceSchema);