require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const Article = require('./mongoose');
const articleRouter = require("./routes/article")
const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// Home Page
app.get("/", (req, res) => {

    Article.find((err, foundArticles) => {
        if(!err) res.render("home", {articles: foundArticles});
        console.log(err);
    });
});

// Page to show the full article
app.get("/fullpost/:id", (req, res) => {
    
    Article.findOne({_id: req.params.id},(err, foundArticles) => {
        if(!err) res.render("fullPost", {articles: foundArticles});
        console.log(err);
    });
});

app.listen(3500, () => console.log("Server Started on 3500"));
app.use("/article", articleRouter);
