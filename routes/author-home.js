/**
 * AUTHOR - HOME PAGE ROUTE
 * The purpose of this code is to handle routing for the author's home page on a blogging website. 
 * The code uses the express framework to handle routing and the express-session module to handle user sessions. 
 * The code first imports necessary modules such as express, body-parser, and assert. 
 * The router is then set up to handle GET requests for the author home page, settings page, create-draft page, and reader-home page.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

// listen to a get request on '/' route
router.get('/', (req, res) => {
    // get the user_id from session
    let user_id = req.session.user_id;

    // query the database to select all rows from articleRecords table where status is 'draft' and user_id matches the 
    // current user's id
    global.db.all("SELECT * FROM articleRecords WHERE user_id = ? AND status = 'draft'", [user_id], function (err, draftRows) {
        if (err) {
            console.error(err.message);
        } else {
            // query the database to select all rows from articleRecords table where status is 'published' and user_id 
            // matches the current user's id
            global.db.all(`SELECT * FROM articleRecords WHERE user_id = ? AND status = 'published'`, [user_id], function (err, publishedRows) {
                if (err) {
                    next(err);
                } else {
                    // query the database to select the row from blogSettings table where user_id matches the current user's id
                    global.db.get("SELECT * FROM blogSettings WHERE user_id = ?", [user_id], function (err, blogRows) {
                        if (err) {
                            next(err);
                        } else {
                            // This renders the author-home page and passes in the draft articles, published articles and blog 
                            // details as variables to be used in the ejs template
                            res.render("author-home.ejs", {draftArticles: draftRows, publishedArticles: publishedRows, blogDetails : blogRows});
                        }
                    });
                }
            });
        }
    });
});

router.get("/settings", (req, res) => {
    // This renders the settings page
    res.render('settings');
});

router.get("/create-draft", (req, res) => {
    // This renders the create-draft page
    res.render("create-draft");
});

router.get("/reader-home", (req, res) => {
    // This renders the reader-home page
    res.render("reader-home");
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;