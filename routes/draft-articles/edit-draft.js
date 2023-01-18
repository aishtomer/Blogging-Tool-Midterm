/**
 * EDIT DRAFT PAGE ROUTE
 * This code is a router module for an Express.js application that allows the user to edit drafts of articles. When the 
 * user navigates to the '/edit-draft' route, a GET request is made and the server retrieves the article_id from the query 
 * parameter and stores it in a session variable. The server then queries the articleRecords table in the database for the 
 * row that has the same article_id and passes the data to the 'edit-draft' view to be rendered. After the user submits 
 * their changes to the draft, a POST request is made to the same route and the server retrieves the article_id from the 
 * session variable, updates the title, subtitle, and content of the corresponding row in the articleRecords table and set 
 * the last_modified to current date. Finally, the server redirects the user to the 'author-home' route.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

// get request to edit-draft page
router.get("/", (req, res) => {
    // get the article_id from the url query
    let article_id = req.query.article_id;
    // set the article_id in the session
    req.session.article_id = article_id;

    // query the articleRecords table for the row where article_id = article_id
    global.db.get("SELECT * FROM articleRecords WHERE article_id = ?", [article_id], function (err, row) {
        if (err) {
            console.log(err);
        } else {
            // render the edit-draft page and passing the data of the selected article
            res.render("edit-draft", {data: row});
        }
    });
});

// post request to edit-draft page
router.post("/", (req, res, next) => {
    // get the article_id from the session
    let article_id = req.session.article_id;

    // get title, subtitle and content of article from request body
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let content = req.body.content;

    // update the row in the articleRecords table where article_id = article_id with the new provided data
    global.db.run("UPDATE articleRecords SET title = ?, subtitle = ?, content = ? , last_modified = ? WHERE article_id = ?", [title, subtitle, content, Date(),article_id], function (err) {
        if (err) {
            next(err);
        }
    });
    // redirect to author-home page
    res.redirect('author-home');
});

// redirect to author-home page
router.get("/author-home", (req, res) => {
    res.redirect("author-home");
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;
