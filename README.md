# Editor/Writer Dashboard Site
 Develop a Writer/Editor Dashboard Site that has the ablity to create, edit, and publish an article related to a company.

## Features
* Login to the app via username and password
* Restrict access to valid a User
* Vue-3 (Frontend)
* lowdb (DB)
* Express.js and Node.js (Backend)
You will find the base data file in `server/config/data`

## Command for both Client-Side and Server-Side
```sh
    npm run install:all - "npm install && npm run install:server && npm run install:client",
```
```sh
npm run start - "concurrently \"npm run start:server\" \"npm run start:client\""
```
