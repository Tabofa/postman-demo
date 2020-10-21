# Postman Demo-app

## Purpose of this application
The purpose of this application is to have a simple program that illustrates the communication between a web-page and an API. It's intended to be used as a practice example in a one time course. 

Studens may after the course is done, download, install and use this product in order to further advance their knowledge and understanding of the subject at hand. 

## Installation
### Requirements
- [NodeJs](https://nodejs.org/en/download/) - SDK to run Node applications (JavaScript)
- [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) / npm (installs with NodeJs) - Package handler, to install dependancys for the application.
- [mongodb](https://docs.mongodb.com/manual/administration/install-community/) - Database used by the application

-or-
- Docker (This requires Mac/Linux or a PC with Windows10 Pro)

### Installation NOT using Docker
Startin a console navigate to the root directory 
```
cd /path/to/postman-demo
```
 Once you've foudnd the correct directory, it's time to install and start the application. This is done by 3 simple commands

```
cd backend
yarn install
yarn start
```
The install step may take some time to complete. This is normal and depends on your computer and internet connection. Once it's done you will get control back over the console and you can continue with the start command. This will start the process for the backend, and will continue to occupie the console.
In this console you will see something like `API running on port: 3081`. You will also be able to see error messages here, when they arise. Let's leave this here for now.

If you are not interested in having a frontend running you can stop here and go nuts with Postman.

Starting a new console navigate to the root directory but this time we cd into the frontend repo and repeate the two last steps. Like so.

```
cd frontend
yarn install
yarn start
```

Just as with the backend this may take some time. Probably longer. There are dependancies here. This cosole will aslo be occupied after the start command. Your default browser should now start (if it's not already started) and open a new tab. it will open the url `http://localhost:30000`, `http://127.0.0.1:3000` or `http://[your-ip]:3000`. This is the frontend application.
### Shutting it down
Do one of the following
- ctrl+c in the console terminates the program (may need to press it twice)
- Close the console terminates the process
- Shut down the computer

### Installation using Docker
todo: Write Dockerfile and docker-compose.yml scripts + instructions

Starting the application
```
docker-compose up &
```

Stopping the application
```
docker-compose down
```

### Disclaimer
The software is delivered as is and may be used under however the end user wishes. The developer of this demo-app takes no responasbility for anything reguarding the application in this repository. Use on own risk.

# Documentation
## Add
POST: /add

Header: application/JSON
```
{ 
    "username": string
}
```

Body: application/JSON
```
{
    "todo": string
}
```

Successful response: 201 Created

## Get all records
GET: /

Header: application/JSON
```
{ 
    "username": string
}
```

Successful response: 200 OK

## Get specific
GET: /{id}

Header: application/JSON
```
{ 
    "username": string
}
```

Successful response: 200 OK

## Update
PATCH: /update/{id}

Header: application/JSON
```
{ 
    "username": string
}
```

Body: application/JSON
```
{
    "done": boole,
    "todo": string
}
```

Successful response: 204 No Content

## Delete
DELETE: /delete/{id}

Header: application/JSON
```
{ 
    "username": string
}
```

Successful response: 204 No Content