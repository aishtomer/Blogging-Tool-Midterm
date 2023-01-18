/**
 * LOGIN PAGE ROUTE
 * This code exports an express router that handles the login process for a user. When a user submits a login form, the 
 * router first retrieves all of the rows from the 'loginDetails' table in the database. It then iterates through each row and 
 * compares the email and password from the login form to the email and password stored in the row. If a match is found, the 
 * user_id is stored in the session and the user is redirected to the author-home page. If no match is found, the user is redirected
 * to the registration page. It also has a get route for '/register' that when hit, render the register.ejs file.
 * It uses bcrypt library to compare the password entered by user with the hashed password stored in the database.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package
const bcrypt = require('bcrypt'); // import bcrypt package

//renders the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

//handles the login process
router.post("/login", (req, res, next) => {
    //Retrieves email and password from the login form
    let email = req.body.email;
    let password = req.body.password;

    //query the database to check if there is a matching email and password
    global.db.all("SELECT email, user_id, password from loginDetails", function(err, rows){
        if (err){
            next(err);
        } else {
            var found = false;
            for (let row of rows){
                //compare the hashed password with the plain text password
                if (row.email == email && bcrypt.compareSync(password, row.password)){
                    //set the user_id in the session
                    req.session.user_id = row.user_id;
                    
                    found = true;
                    break;
                }
            }
            if (!found){
                //redirect to the registration page if login details are incorrect
                res.redirect('register');
            } else {
                res.redirect('author-home');
            }
        }
    });
});

//handles the login process
router.post("/", (req, res, next) => {
    //Retrieves email and password from the login form
    let email = req.body.email;
    let password = req.body.password;

    //query the database to check if there is a matching email and password hash
    global.db.all("SELECT email, user_id, password from loginDetails", function(err, rows){
        if (err){
            next(err);
        } else {
            var found = false;
            for (let row of rows){
                //compare the hashed password with the plain text password
                if (row.email == email && bcrypt.compareSync(password, row.password)){
                    //set the user_id in the session
                    req.session.user_id = row.user_id;

                    found = true;
                    break;
                }
            }
            if (!found){
                //redirect to the registration page if login details are incorrect
                res.redirect('register');
            } else {
                res.redirect('author-home');
            }
        }
    });
});

// This exports the router as a module so that it can be used in other parts of the application.
module.exports = router;