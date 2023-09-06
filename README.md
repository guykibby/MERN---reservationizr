
# Getting started

The `client` folder contains the React Application, and the `server` folder contains the Express application.

## Client

- In a new Terminal window, type: `cd client` to change directory into the client folder
- Type `npm install` to install npm dependencies
- Type `npm start` to start the React Application

## Server

- In a new Terminal window, type: `cd server` to change directory into the server folder
- Type `npm install` to install npm dependencies
- Type `npm start` to start the Express Server

## MongoDB Database

- Start MongoDB in Docker by opening a terminal and `copy & paste` in the following:

```shell
docker run --name 02-project-reservationizr-application-part-2-mongo_db \
  -p 27017:27017 \
  -v 02-exercise-auth0-express-react-mongo_db_data_container:/data/db \
  -d \
  mongo
```

# Architecture diagrams

![architecture diagram](docs/software-architecture.jpg)

![architecture diagram](docs/software-architecture-2.jpg)

---

# API specification

To view the documentation for the API specification:

1. Open a Terminal in VS Code for this project
2. Type `cd server` to change directory into the server folder
3. Type `npm run docs` to start a web server with API documentation

