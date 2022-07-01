
# CRUD Application

This is a CRUD app for Creating, Reading, Updating, and Deleting.
Node.js, Express.js, EJS, and MongoDB (Mongoose) are among the tools used.
Used BootStrap and Basic CSS for design.

## Setting up the app.JS file
### with Express.JS, dotenv, bodyParser, mongoose and express router
```javascript
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser'); //Body Parser
const Article = require('./mongoose'); //Mongoose
const articleRouter = require("./routes/article") // Express Router
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

app.listen(3500, () => console.log("Server Started on 3500"));
app.use("/article", articleRouter);
```
### Find the article and show it inside the home page.
```javascript
  Article.find((err, foundArticles) => {
        if(!err) res.render("home", {articles: foundArticles});
        console.log(err);
    });
```
### EJS for home page to show all the articles with a <% forEach %> Loop
```ejs
<%- include("partials/header") -%>
<%- include("nav") -%>

<div class="container d-flex justify-content-center align-items-start w-100">
    <div class="row mt-5 w-100 d-flex justify-content-center gap-5">
        <% articles.forEach(article =>  { %>
                <div class="card col col-lg-5 mt-3">
                    <div class="card-body">
                    <h4 class="card-title"><%= article.title %></h4>
                    <p class="card-subtitle mt-2 text-muted"><%= article.publishDate.toLocaleDateString() %></p>
                    <% if(article.description.length > 50) { %>
                        <article class="card-text"><%=article.description.slice(0, 50)%>... <a href="/fullpost/<%=article._id%>" class="btn btn-link">Read More</a> </article>
                    <% } else{ %>
                        <article class="card-text"><%=article.description %> </article>
                   <% } %>
                    
                    <a href="/article/<%= article._id %>" class="btn btn-info mt-2"><i class="bi bi-pencil-square"></i></a>
                    <a href="/article/delete/<%=article._id%>" onclick="return confirm('Are you sure ?')" class="btn btn-dark mt-2"><i class="bi bi-trash3-fill"></i></a>
                </div>
                </div>
        <% }) %>
    </div>
</div>
<%- include("partials/footer") -%>
```

#### Load the articleRouter after all the files are loaded to get all the files.
```javascript
app.use("/article", articleRouter);
```
## Setting up express router in routes folder

```javascript
const express = require('express');
const router = express.Router();
const Article = require('.././mongoose'); // Importing Mongoose Model from mongoose.js

// Get the article posting Form route
router.get("/", (req, res) => {
    res.render("./postAndEdit/post");
})
```
### Exporting the router to the app.js
```javascript
module.exports = router;
```
# Create
## FORM For posting or creating an article with EJS

```html
<%- include("../partials/header") %>

<%- include("../nav") -%>

<div class="container mt-5">
    <h2>Post an Article</h2>
    <form autocomplete="off" action="/article/" method="POST">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Title of the post</label>
            <input type="text" class="form-control" name="title" id="title" placeholder="Write a title">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description of the post</label>
            <textarea class="form-control" name="description" id="description" rows="8"></textarea>
        </div>

        <button type="submit" class="btn btn-info">Submit</button>
        <a href="/" class="btn btn-dark">Cancel</a>
    </form>
</div>

<%- include("../partials/footer") %>
```
## Posting or creating an article with express and mongoose
```javascript
// For Posting an Article
router.post("/", (req, res) => {

    let data = Article.create({
        title : req.body.title,
        publishDate: new Date(),
        description: req.body.description
    })
    res.redirect("/");
});

```
# Read

### For Reading the created article in home page with ejs

```html
<%- include("partials/header") -%>
<%- include("nav") -%>

<div class="container d-flex justify-content-center align-items-start w-100">
    <div class="row mt-5 w-100 d-flex justify-content-center gap-5">
        <% articles.forEach(article =>  { %>
                <div class="card col col-lg-5 mt-3">
                    <div class="card-body">
                    <h4 class="card-title"><%= article.title %></h4>
                    <p class="card-subtitle mt-2 text-muted"><%= article.publishDate.toLocaleDateString() %></p>
                    <% if(article.description.length > 50) { %>
                        <article class="card-text"><%=article.description.slice(0, 50)%>... <a href="/fullpost/<%=article._id%>" class="btn btn-link">Read More</a> </article>
                    <% } else{ %>
                        <article class="card-text"><%=article.description %> </article>
                   <% } %>
                    
                    <a href="/article/<%= article._id %>" class="btn btn-info mt-2"><i class="bi bi-pencil-square"></i></a>
                    <a href="/article/delete/<%=article._id%>" onclick="return confirm('Are you sure ?')" class="btn btn-dark mt-2"><i class="bi bi-trash3-fill"></i></a>
                </div>
                </div>
        <% }) %>
    </div>
</div>
<%- include("partials/footer") -%>
```

### For Reading the created article in dynamically created page with the article _id
```html
<%- include("partials/header") -%>
<%- include("nav") -%>

<div class="mt-5 mx-5">
    <h2 class="card-title"><%= articles.title %></h2>
    <p class="card-subtitle mt-2 text-muted"><%= articles.publishDate.toLocaleString() %></p>
    <article class="card-text mt-4"><%=articles.description %></article>
    <a href="/article/<%= articles._id %>" class="btn btn-info mt-2"><i class="bi bi-pencil-square"></i></a>
    <a href="/article/delete/<%=articles._id%>" onclick="return confirm('Are you sure ?')" class="btn btn-dark mt-2"><i class="bi bi-trash3-fill"></i></a>
</div>

<%- include("partials/footer") -%>
```
# Edit

### Use an HTML Form to get all the data from a post and embed it in an edit form by its _id.
```html
<%- include("../partials/header") %>

<%- include("../nav") -%>

<div class="container mt-5">
    <h2>Update Post</h2>

    <form autocomplete="off" action="/article/<%=article.id%>" method="POST">
        <input type="hidden" name="id" value="<%=article._id%>">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Title of the post</label>
            <input type="text" class="form-control" name="title" id="title" placeholder="Write a title" value="<%= article.title %>">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description of the post</label>
            <textarea class="form-control" name="description" id="description" rows="8"><%= article.description %></textarea>
        </div>

        <button type="submit" class="btn btn-info">Save Changes</button>
        <a href="/" class="btn btn-dark">Cancel</a>
    </form>
</div>

<%- include("../partials/footer") %>
```

### Get the article in the HTML/EJS edit Form
```javascript
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
```
### Edit the post with HTML Form post method
#### Find the article and update it asynchronously with findOneAndUpdate() method from Mongoose
```javascript
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
```
## Delete

### Deleting an article with a delete route and the id of the post
```javascript
// For Deleting an Article
router.get("/delete/:id", async (req, res) => {
    try {
        await Article.findOneAndRemove({_id: req.params.id});
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
   
});

```
## Mongoose Model

### Creating a model with local mongoDB Database and exporting it to the app.js and article.js
### Model Name -- Article
```javascript
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
```