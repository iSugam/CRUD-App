require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const Article = require('./mongoose');
const articleRouter = require("./routes/article")
const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", (req, res) => {

    Article.find((err, foundArticles) => {
        if(!err) res.render("home", {articles: foundArticles});
        console.log(err);
    })
   
   
})

app.listen(3500, () => console.log("Server Started on 3500"));
app.use("/article", articleRouter);
