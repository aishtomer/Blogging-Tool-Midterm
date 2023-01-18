/**
 * LIKE ARTICLE ROUTE
 * This code defines a route for an HTTP GET request to the root ("/") path. When this route is accessed, the code retrieves 
 * the value of the article_id property from the req.session object. Then, it updates the "likes" field in the "articleRecords" 
 * table of the database with the corresponding article_id and increments it by one. If there is an error in this process, it 
 * will be logged to the console. Finally, it redirects the client to the page of the article with the updated like count.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package


// Retrieve the article_id from the session and increment the likes count for that article in the database
router.get("/", (req, res) => {
    let article_id = req.session.article_id;
    global.db.run("UPDATE articleRecords SET likes = likes + 1 WHERE article_id = ?", [article_id], function (err) {
        if (err) {
            console.log(err);
        } 
    });
    // Redirect to the display-article page with the updated article_id
    res.redirect(`/display-article?article_id=${article_id}`);
});

module.exports = router;