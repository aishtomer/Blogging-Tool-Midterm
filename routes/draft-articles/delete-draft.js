/**
 * DELETE DRAFT ROUTE
 * This code is a route that allows a user to delete a draft from the articleRecords table in the database. When a 
 * GET request is made to the '/' endpoint, the route first retrieves the article_id from the query string of the URL. 
 * Then it runs a DELETE SQL query that removes the row from the articleRecords table where the article_id matches the 
 * one passed in the query string. After the deletion of the row, the user is redirected to the 'author-home' page. This 
 * route is useful for allowing users to delete unwanted drafts from their account.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

// GET request to delete a draft
router.get("/", (req, res) => {
    // get the article_id from the query string
    let article_id = req.query.article_id;
    
    // delete the row from the articleRecords table where article_id = article_id
    global.db.run("DELETE FROM articleRecords WHERE article_id = ?", [article_id], function (err) {
        if (err) {
            next(err);
        } else {
            // res.redirect("/form?id=" + user_id);
            console.log("deleted a draft");
        }
    });
    //redirect to the author-home page
    res.redirect('author-home');
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;