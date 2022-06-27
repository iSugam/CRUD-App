require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/articlesDB");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    publishDate: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;