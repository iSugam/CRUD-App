const express = require('express');
const router = express.Router();
const Article = require('.././mongoose');

// Get the article posting Form route
router.get("/", (req, res) => {
    res.render("./postAndEdit/post");
})

// For Posting an Article
router.post("/", (req, res) => {

    let data = new Article({
        title : req.body.title,
        publishDate: new Date().toLocaleDateString(),
        description: req.body.description
    })
    data.save(err => console.log(err));
    res.redirect(".././");
})

// Get the article Editing Form route
router.get("/:id",  (req, res) => {
    let articleID = req.params.id;

  try { 
     Article.findById(articleID, (err, foundArticle) => {
        res.render("./postAndEdit/edit", {article: foundArticle});
    })
        
}catch(err) {
        console.log(err);
    }
})

// For Updating an Article
router.post("/:id", async (req, res) => {
    let articleID = req.body._id;

    try {
        await Article.findByIdAndUpdate(articleID, {title: req.body.title, description: req.body.description}, {returnOriginal: true});
        res.redirect("/");
    }   
    catch (error) {
        console.log(error);
    }

})

// Fro Deleting an Article
router.get("/delete/:id", async (req, res) => {
    try {
        await Article.findOneAndRemove({_id: req.params.id});
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
   
})

// Export the module
module.exports = router;