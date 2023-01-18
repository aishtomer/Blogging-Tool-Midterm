/**
 * REGISTER PAGE ROUTE
 * This code is for a route that handles registration for a user on a website. The code imports various necessary packages 
 * such as express, body-parser, bcrypt, and express-session. It also creates an instance of express router. In the route, 
 * when a user submits the registration form, the email, first name, last name and password from the form are captured, hashed 
 * and then the code queries the database to check if the email already exists in the loginDetails table. If the email doesn't 
 * already exist, it inserts the user's information into the loginDetails table and the blogSettings table and redirects the user 
 * to the login page. If the email already exists in the database, it sends a message to the user that they already have an account 
 * with that email. The route also renders the login page when a user navigates to the login page.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package
const bcrypt = require('bcrypt'); // import bcrypt package

const saltRounds = 10; // Generate a salt with 10 rounds
const salt = bcrypt.genSaltSync(saltRounds); // generate a salt

router.post("/", (req, res, next) => {
    let email = req.body.email; // Get the email  from the form
    let first_name = req.body.first_name; // Get the first name from the form
    let last_name = req.body.last_name; // Get the last name from the form
    let password = req.body.password; // Get the password from the form

    // Hash the password using the generated salt
    let hashedPassword = bcrypt.hashSync(password, salt);
    
    // query the database for all existing emails
    global.db.all("SELECT email from loginDetails", function(err, rows){
        if (err){
            next(err);
        } else {
            var found = false;
            for (let row of rows){
                // if the email already exists in the database, set found to true
                if (row.email == email){
                    found = true;
                    break;
                }
            }
            // if the email doesn't already exist in the database
            if (!found){
                // insert new user's information into loginDetails table
                global.db.run(
                    "INSERT INTO loginDetails ('email', 'first_name', 'last_name', 'password') VALUES( ?, ?, ?, ?);",
                    [email, first_name, last_name, hashedPassword],
                    function (err) {
                        if (err) {
                            next(err);
                        } else {
                            // insert new user's information into blogSettings table
                            global.db.run(
                                "INSERT INTO blogSettings ('blog_title', 'blog_subtitle', 'author_name', 'user_id') VALUES(?, ?, ?, ?);",
                                [`Welcome to ${first_name}'s Blog`, 'Place Where I Chronicle My Life', `- by ${first_name} ${last_name}`, this.lastID],
                                function (err) {
                                    if (err) {
                                        next(err);
                                    } else {
                                        next();
                                    }
                                }
                            );
                            // set user_id in the session
                            req.session.user_id = this.lastID;
                        }
                    }
                );
                // redirect user to login page
                res.redirect('login');
            } else {
                res.send("already have an account with this email");
            }
        }
    });
});

router.get("/login", (req, res) => {
    res.render('login');
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;