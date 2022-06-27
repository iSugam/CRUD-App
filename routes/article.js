const express = require('express');
const router = express.Router();
const Article = require('.././mongoose');

// Get the article posting Form route
router.get("/", (req, res) => {
    res.render("./postAndEdit/post");
})

// For Posting an Article
router.post("/", (req, res) => {

    let data = Article.create({
        title : req.body.title,
        publishDate: new Date(),
        description: req.body.description
    })
    res.redirect("/");
});

// Get the article Editing Form route
router.get("/:id",  (req, res) => {
    let articleID = req.params.id;

  try { 
     Article.findById(articleID, (err, foundArticle) => {
        res.render("./postAndEdit/edit", {article: foundArticle});
    });
        
}catch(err) {
        console.log(err.message);
    }
});

// For Updating an Article
router.post("/:id", (req, res) => {
    updateArticle(req, res);
});

async function updateArticle(req, res) {
    try {
        await Article.findOneAndUpdate({_id : req.params.id}, req.body);
        res.redirect("/");
    }   
    catch (error) {
        console.log(error.message);
    }
};

// For Deleting an Article
router.get("/delete/:id", async (req, res) => {
    try {
        await Article.findOneAndRemove({_id: req.params.id});
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
   
});

// Export the module
module.exports = router;