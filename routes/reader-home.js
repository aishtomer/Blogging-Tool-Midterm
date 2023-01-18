/**
 * READER HOME PAGE ROUTE
 * The purpose of this code is to create a route for the reader home page in an express application. It starts by 
 * importing several necessary packages like express and session, then it creates an instance of express router. 
 * The route listens to a GET request on the root path, when it receives the request, it makes a query to the database 
 * to select all articles that are in the 'published' status along with their corresponding author name, blog title, 
 * and subtitle. It then groups the articles by their authors and stores them in an object called articlesByAuthor. Finally, 
 * it renders the articles grouped by author to the 'reader-home' page using the articlesByAuthor object as data. Additionally, 
 * it also renders the settings page, author-home page, and login page when their corresponding routes are requested. Finally, 
 * it exports the router so that it can be used in other parts of the application.
 */

const express = require("express"); // import express package
const bodyParser = require('body-parser'); // import body-parser package
const router = express.Router(); // create an instance of express router
const assert = require('assert'); // import assert package
const session = require('express-session'); // import express-session package

// Route for displaying published articles for readers
router.get("/", (req, res) => {
    // Select all articles from the database that are in the 'published' status
    // along with their corresponding author name, blog title, and subtitle
    global.db.all("SELECT articleRecords.article_id, articleRecords.title, articleRecords.publication_date, blogSettings.author_name, blogSettings.blog_title, blogSettings.blog_subtitle FROM articleRecords JOIN blogSettings ON articleRecords.user_id = blogSettings.user_id WHERE articleRecords.status = 'published' ORDER BY articleRecords.publication_date DESC;", 
        function (err, articles) {
            if (err) {
                console.log(err);
            } else {
                // Create an empty object to store articles grouped by their authors
                var articlesByAuthor = {};
                // Iterate through the articles and group them by author
                articles.forEach(function (article) {
                    if (!articlesByAuthor[article.author_name]) {
                        articlesByAuthor[article.author_name] = {
                            author_name: article.author_name,
                            blog_title: article.blog_title,
                            blog_subtitle: article.blog_subtitle,
                            articles: []
                        };
                    }
                    articlesByAuthor[article.author_name].articles.push({
                        article_id: article.article_id,
                        title: article.title,
                        pub_date: article.publication_date
                    });
                });
                // Render the articles grouped by author to the 'reader-home' page
                res.render("reader-home.ejs", { articlesByAuthor: articlesByAuthor });
            }
    });
});

// This renders the settings page
router.get("/settings", (req, res) => {
    res.render('settings');
});

// This renders the author-home page
router.get("/author-home", (req, res) => {
    res.render("author-home");
});

// This renders the login page
router.get("/login", (req, res) => {
    res.render("login");
});

// export the router so that it can be used in other parts of the application.
module.exports = router;