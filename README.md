# Serempre
## _Readme and documentation_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is the web api made it by Jader Granados.

## For running this project, yo need to...

- Downloand the project
- Check debug.env file and set your variables
- Run `npm install` (for nodejs) and obtain all the dependencies
- Run `docker-compose build` or `docker build < - Dockerfile` (for docker) if you want to build the project
- Once you build the projecto you should run `npm run start` for running on production or `npm run dev` for running as developer
- In docker, you just need to run your container `docker-compose up`

## Deployment

This project was deployed on Heroku's server and the databas in elephantsql

- Base url https://test-jader-serempre.herokuapp.com/ 

## Inside this repository

- sql/: Inside this folder are sql scripts for app database. If you prefer, you could create models just using the app. Sequelize automaticaly will create the database base and its models
- dist/: Inside this folder will be the transpiler versión in ES2015 standar of the code
- tests/: Files for testing the app
- src/: main code of the application

## Notas adicionales

Primera vez que uso nodejs con una base de datos NoSQL. Debo decir que fue un gran reto y me gustó mucho.
