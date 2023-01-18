/**
 * CREATE DRAFT ROUTE
 * This code is a route for creating a draft article in a blog application. The code imports the necessary packages 
 * including express, body-parser, and session which are used for routing, parsing form data, and maintaining user sessions 
 * respectively. When a user makes a GET request to the '/' route, it renders the create-draft.ejs file, which is a page that 
 * allows the user to create a new draft article. When the user submits the form on the page, it makes a POST request to the 
 * same route. In the post request, it extracts the title, subtitle, and content of the article from the form data, and the 
 * user_id from the session. It then inserts this data into the articleRecords table in the database along with the current date, 
 * status as 'draft' and likes as 0. After inserting the data, it redirects the user to the author-home page.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

// get request to create-draft page
router.get('/', (req, res) => {
    res.render('create-draft.ejs');
});

// get request to create-draft page
router.post("/", (req, res, next) => {
    // get user_id from the session
    let user_id = req.session.user_id;

    // get title, subtitle, and content from the form
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let content = req.body.content;

    // insert the data into articleRecords table
    global.db.run(
        "INSERT INTO articleRecords ('title', 'subtitle', 'content', 'status', 'creation_date', 'last_modified', 'publication_date', 'likes', 'user_id') VALUES( ?, ?, ?, 'draft', ?, ?, 'NA',0, ?);",
        [title, subtitle, content, Date(), Date(), user_id],
        function (err) {
            if (err) {
                // call the next middleware function if there is an error
                next(err);
            } else {
                next();
            }
        }
    ); 
    // redirect user to author-home page
    res.redirect('author-home');           
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;