// including modules in the app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use express-session to create a secure session to store user information
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Open a connection to the database and store the connection in the global namespace
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); //Bail out we can't connect to the DB
    }else{
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
    }
});

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

/**---------------------------------------------------------------------------------------- */
/** Import Various Routes serving the application functionality */

/** ACCOUNT MANAGEMENT AND AUTHENTICATION */

// Import and use the login route
const loginRoute = require('./routes/login');
app.use('/', loginRoute);

// Import and use the registration route
const registerRoute= require('./routes/register');
app.use('/register', registerRoute);

/** AUTHOR MODE */

// Import and use the author home route
const authorRoute= require('./routes/author-home');
app.use('/author-home', authorRoute);

// Import and use the settings route
const settingsRoute= require('./routes/settings');
app.use('/settings', settingsRoute);

/** DRAFT ARTICLES */

// Import and use the create draft route
const createDraftRoute= require('./routes/draft-articles/create-draft');
app.use('/create-draft', createDraftRoute);

// Import and use the edit draft route
const editDraftRoute= require('./routes/draft-articles/edit-draft');
app.use('/edit-draft', editDraftRoute);

// Import and use the publish draft route
const publishDraftRoute= require('./routes/draft-articles/publish-draft');
app.use('/publish-draft', publishDraftRoute);

// Import and use the delete draft route
const deleteDraftRoute= require('./routes/draft-articles/delete-draft');
app.use('/delete-draft', deleteDraftRoute);


/** READER MODE */
// Import and use the reader home route
const readerHomeRoute= require('./routes/reader-home');
app.use('/reader-home', readerHomeRoute);

// Import and use the display article route
const displayArticleRoute= require('./routes/display-article');
app.use('/display-article', displayArticleRoute);

// Import and use the like article route
const likeArticle= require('./routes/like-article');
app.use('/like-article', likeArticle);

/**------------------------------------------------------------------------------ */
// Use ejs as the view engine
app.set('view engine', 'ejs');

// Landing Page
app.get('/', (req, res) => {
    res.render('login');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Register page
app.get('/register', (req, res) => {
    res.render('register');
});

// Logout route to destroy session
app.get('/logout', function(req, res) {
    console.log("session destroyed");
    req.session.destroy();
    res.redirect('/');
});

// sets up a listener for the app on a port 300 and log a message to the console indicating that the 
// server is running and on which port it can be accessed.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

