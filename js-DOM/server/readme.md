# Fullstack CRUD Application, by Joana Mastianica

## Required Programs
  * Node v16.x.y or higher

<br><br>

## Instalation
Open CLI and run:
```
  npm i json-server
```
<br><br>

## Create data base
* create file - db.json -> add your server data
* IMPORTANT: create db-backup.json file with your server data in case you will loose data in your primary db.json file.
<p>Object's with your data syntax: 

```
[
  {
    "userId": 5,
    "id": 81,
    "title": "suscipit qui totam",
    "completed": true
  },
  {
    "userId": 5,
    "id": 82,
    "title": "voluptates eum voluptas et dicta",
    "completed": false
  }
]

```
<br><br>

## Git ignore
* create file - .gitignore
* add files to hide for this project: 
    * node_modules
    * package-lock.json

<br><br>

## File - package.json
* add script object: 

```
   "scripts": {
    "server": "json-server --watch db.json"
  }
```
<br><br>

## Project launch
* IMPORTANT: open CLI by selecting work folder and run:

```
  npm run server
```