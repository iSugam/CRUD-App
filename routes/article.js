const express = require('express');
const router = express.Router();
const Article = require('.././mongoose');

router.get("/", (req, res) => {
    res.render("./postOrEdit/postOrEdit", {formHeading: "Post a new Article", article:""})
})


router.post("/", (req, res) => {
    let data = new Article({
        title : req.body.title,
        publishDate: new Date().toLocaleDateString(),
        description: req.body.description
    })
    if(req.body._id !== ""){

        Article.findOneAndUpdate(req.body._id, req.body);
        res.redirect(".././")
       
    }

   else{
    data.save(err => console.log(err));
    res.redirect(".././")
   }
  
     
})

router.get("/:id", (req, res) => {
    let articleID = req.params.id;
    console.log(articleID);

    Article.findById({_id: articleID}, (err, foundID) => {
        if(!err) res.render("./postOrEdit/postOrEdit", {formHeading: "Update the post", article: foundID})

    })
})



module.exports = router