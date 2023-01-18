/**
 * SETTINGS PAGE ROUTE
 * The code creates an instance of Express Router, and assigns it to the "router" variable. It then imports the "body-parser" and 
 * "express-session" packages and assigns them to the "bodyParser" and "session" variables respectively.The first route, a GET 
 * request to "/", queries the "blogSettings" table for a row where "user_id" is equal to the "user_id" stored in the session. If 
 * the row exists, it renders the "settings.ejs" template and passes the row data to the template as the "data" variable. If the 
 * row does not exist, it simply renders the "settings.ejs" template.The second route, a POST request to "/", takes data from the 
 * request body and queries the "blogSettings" table for a row where "user_id" is equal to the "user_id" stored in the session. If 
 * the row exists, it updates the row with the provided data. If the row does not exist, it inserts a new row with the provided data.
 * The last route, a GET request to "/author-home", redirects to the "author-home" page. Finally, the script exports the router as a 
 * module so it can be used in other parts of the application.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

router.get('/', (req, res, next) => {
    //get the user_id from the session
    let user_id = req.session.user_id;
    
    //query the blogSettings table for the row where user_id = user_id
    global.db.get("SELECT * FROM blogSettings WHERE user_id = ?", 
    [user_id], 
    function(err, row){
        if (err) {
            //if there is an error, call the next middleware function
            next(err);
        } else {
            //if there is no row in the table where user_id = user_id
            if (row == undefined){
                res.render("settings.ejs");
            } else {
                //if there is a row in the table where user_id = user_id
                res.render("settings.ejs", {data : row});
            }
        }
    });
});

router.post("/", (req, res, next) => {
    let user_id = req.session.user_id; // Get the session's user id  from the form
    let title = req.body.blog_title; // Get the blog title from the form
    let subtitle = req.body.blog_subtitle; // Get the blog subtitle from the form
    let authorName = req.body.author_name; // Get the author's name from the form

    //query the blogSettings table for the row where user_id = user_id
    global.db.get("SELECT * FROM blogSettings WHERE user_id = ?", [user_id], function (err, row) {
        if (err) {
            //if there is an error, call the next middleware function
            next(err);
        } else {
            if(row === undefined){
                //if there is no row in the table where user_id = user_id
                //insert a new row with the provided data
                global.db.run("INSERT INTO blogSettings (blog_title, blog_subtitle, author_name, user_id) VALUES (?, ?, ?, ?)", [title, subtitle, authorName, user_id], function (err) {
                    if (err) {
                        //if there is an error, call the next middleware function
                        next(err);
                    } 
                });
            }else{
                //if there is a row in the table where user_id = user_id
                //update the row with the provided data
                global.db.run("UPDATE blogSettings SET blog_title = ?, blog_subtitle = ?, author_name = ? WHERE user_id = ?", [title, subtitle, authorName, user_id], function (err) {
                    if (err) {
                        next(err);
                    } 
                });
            }
        }
    });
    res.redirect('author-home');
});

// renders the author page
router.get("/author-home", (req, res) => {
    res.redirect("author-home");
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;
