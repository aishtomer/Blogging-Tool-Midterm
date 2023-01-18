/**
 * READER-ARTICLE PAGE ROUTE
 * The code above is a routing module for an Express.js application. It sets up different routes for handling different HTTP 
 * requests to the server.
    - The first route listens for a GET request to the '/' route and retrieves the article associated with the article_id that 
      is passed in the query string of the request. It also retrieves all the comments associated with the article and renders them 
      along with the article data on the 'display-article.ejs' template.
    - The second route listens for a POST request to the '/' route, it takes the comment entered by the user and 
      the article id from the session, and it inserts a new comment into the comments table in the database.
    - The third route listens for a GET request to the '/settings' route, it renders the 'settings' template.
    - The fourth route listens for a GET request to the '/reader-home' route, it renders the 'reader-home' template.
    - The fifth route listens for a GET request to the '/login' route, it renders the 'login' template.
    - The sixth route listens for a GET request to the '/author-home' route, it renders the 'author-home' template.
    - The last line exports the router so that it can be imported and used in other parts of the application.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

router.get("/", (req, res) => {
    // Get the article ID passed in the URL query
    let article_id = req.query.article_id;

    // Store the article ID in the session for use in the post request
    req.session.article_id = article_id;

    // Retrieve the article details from the database using the article ID
    global.db.get("SELECT * FROM articleRecords WHERE article_id = ?", [article_id], function (err, row) {
        if (err) {
            console.log(err);
        } else {
            // Retrieve all comments associated with the article from the database
            global.db.all("SELECT * FROM comments WHERE article_id = ? ORDER BY pub_date", [article_id], function (err, comments) {
                if (err) {
                    console.log(err);
                } else {
                    // Render the display-article.ejs template and pass in the article details and comments as data
                    if (comments != undefined) {
                    res.render("display-article.ejs", {data: row, comments: comments});
                    } else {
                        res.render("display-article.ejs", {data: row});
                    }
                }
            });
        }
    });
});

router.post("/", (req, res) => {
    // Retrieve the article ID from the session
    var article_id = req.session.article_id;

    // Get the comment text from the form body
    var comment = req.body.comment;

    // Insert the comment into the comments table in the database
    global.db.run("INSERT INTO comments (article_id, text, pub_date) VALUES (?, ?, ?)", [article_id, comment, Date()], function (err) {
        if (err) {
            console.log(err);
        } else {
            // Redirect the user back to the display-article page for the article they commented on
            res.redirect("/display-article?article_id=" + article_id);
        }
    });
});

router.get("/settings", (req, res) => {
    // Render the settings template
    res.render('settings');
});

router.get("/reader-home", (req, res) => {
    // Render the reader-home template
    res.render("reader-home");
});

router.get("/login", (req, res) => {
    // Render the login template
    res.render("login");
});

router.get("/author-home", (req, res) => {
    // Render the author-home template
    res.render("author-home");
});

// Exports the router so it can be used in the main app.js file.
module.exports = router;