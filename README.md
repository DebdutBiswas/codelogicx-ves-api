# codelogicx-ves-api
Visitor Entry System API

## Live API link:
To be added later via heroku docker deploy

## Easiest way to setup and run if you have docker installed:
```bash
  docker compose up -d
```

## Manual setup:
### Install required node modules
```bash
  npm install
```

### Databse setup
#### Create database user and database
- Create a new database user set mysql authentication type to 'Native MySQL authentication'
- Create a new database and give all permissions to the previously created user
#### Import dummy database dump
```bash
  mysql -u <user_name> -p <database_name> < ./schemas/dummy.sql
```

### Setup environment variables
- Create a file named .env and edit it
```bash
  touch .env
  nano .env
```
- Put the following contents to the file and save it
```bash
  DB_HOST=localhost
  DB_PORT=3306
  DB_TYPE=mysql
  DB_USER=<user_name>
  DB_PASS=<database_password>
  DB_DBASE=<database_name>
  JWT_ACCESS_TOKEN_SECRET=rANd0m34673
  JWT_REFRESH_TOKEN_SECRET=RanD0M65749
```

## How to run the code?
### First, start the server
```bash
  npm start
```

### Test REST APIs
- Import Postman REST API test project to Postman from:
```bash
  ./tests/codelogicx-ves-api.postman_collection.json
```
- Now you are ready to test the API from Postman
- All the required API keys and test parameters are with in the Postman project

## Database Schema Design:
Here is a relationship diagram of various database tables:

![DBRelationshipDiagram](/assets/images/DBRelationshipDiagram.png)

