/**
 * PUBLISH DRAFT ROUTE
 * The purpose of this code is to update the status of an article from "draft" to "published" and add the current date as 
 * the publication date in the articleRecords table of the database. It does this by first importing the necessary packages, 
 * including express, body-parser, and express-session. It then creates an instance of the express router. The code then defines 
 * a route for the GET request and retrieves the article_id from the query string of the URL. It then runs an update query on the 
 * articleRecords table in the database to set the status of the article to "published" and the publication_date to the current date. If there is an error, it calls the next middleware function. Finally, it redirects the user to the author home page.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

router.get("/", (req, res, next) => {
    //get the article_id from the query
    let article_id = req.query.article_id;

    //update the articleRecords table, where article_id = article_id, set status = 'published' and publication_date = current date
    global.db.run("UPDATE articleRecords SET status = 'published', publication_date = ? WHERE article_id = ?", [Date(), article_id], function (err) {
        if (err) {
            //if there is an error, call the next middleware function
            next(err);
        }
    });
    //redirect to the author home page
    res.redirect('author-home');
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;