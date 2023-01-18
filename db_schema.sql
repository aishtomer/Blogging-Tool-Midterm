-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS loginDetails (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password  VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS articleRecords (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(15),
    creation_date TEXT,
    last_modified TEXT,
    publication_date TEXT,
    likes INT DEFAULT 0 NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES loginDetails(user_id)
);

CREATE TABLE IF NOT EXISTS blogSettings (
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT NOT NULL,
    author_name TEXT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES loginDetails(user_id)
);

CREATE TABLE IF NOT EXISTS comments (
    article_id INT,
    text TEXT NOT NULL,
    pub_date TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES loginDetails(user_id)
);



--title, sub title, content, author name(first name + last name), status(published/ draft), date of publish if published, likes


--insert default data (if necessary here)
-- INSERT INTO loginDetails ("email", "first_name", "last_name", "password") VALUES( "aishtomer@gmail.com", "Aishwarya", "Tomer", "AST");
-- INSERT INTO loginDetails ("email", "first_name", "last_name", "password") VALUES( "kimtaehyung@gmail.com", "Kim", "Taehyung", "KT");
-- INSERT INTO articleRecords ("title", "subtitle", "content", "status", "creation_date", "last_modified", "publication_date", "likes", "user_id") VALUES("article title 1", "article sub title 1", "article content 1", "draft", "Fri Jan 13 2023 14:30:27 GMT+0530 (India Standard Time)", "Fri Jan 15 2023 14:30:27 GMT+0530 (India Standard Time)", "NA", 0, 1);
-- INSERT INTO articleRecords ("title", "subtitle", "content", "status", "creation_date", "last_modified", "publication_date", "likes", "user_id") VALUES("article title 2", "article sub title 2", "article content 2", "published", "Fri Jan 14 2023 14:30:27 GMT+0530 (India Standard Time)", "Fri Jan 16 2023 14:30:27 GMT+0530 (India Standard Time)", "Fri Jan 17 2023 14:30:27 GMT+0530 (India Standard Time)", 2, 1);
-- INSERT INTO articleRecords ("title", "subtitle", "content", "status", "creation_date", "last_modified", "publication_date", "likes", "user_id") VALUES("article title 3", "article sub title 3", "article content 3", "published", "Fri Jan 15 2023 14:30:27 GMT+0530 (India Standard Time)", "Fri Jan 17 2023 14:30:27 GMT+0530 (India Standard Time)", "Fri Jan 17 2023 14:30:27 GMT+0530 (India Standard Time)", 3, 1);


COMMIT;

