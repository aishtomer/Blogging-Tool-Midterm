## WebVerse ##
### Web-based Blogging Application ###

- Developed using EJS, CSS, JavaScript, and the Express.js framework with a focus on usability and accessibility.
- Utilized SQLite3 for RDBMS and Bcrypt module  for secure password storage through hashing and salting.
- Implemented features like creating, editing, and changing visibility of blogs, generating personalized sharing links.
- Secured user sessions through the use of the express-session module, and user experience was prioritized.

https://user-images.githubusercontent.com/91372700/218306037-2c97be44-14ee-4064-bd08-2ec85f6f7d29.mp4

## Run on Desktop 

### Installation requirements 

* NodeJS 
    - follow the install instructions at https://nodejs.org/en/
    - we recommend using the latest LTS version
* Sqlite3 
    - Windows users: follow instructions here https://www.sqlitetutorial.net/download-install-sqlite/
    - Mac users: it comes preinstalled
    - Linux users: use a package manager eg. apt install


To install all the node packages run ```npm install``` from the project directory
Run the following commands:
1. `npm install`
2. `npm run build-db`
3. `npm run start`

Then, visit - http://localhost:3000
