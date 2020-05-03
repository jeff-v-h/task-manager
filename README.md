# Task Manager

An application to manage personal tasks.

## Getting started

### Requirements

#### Application

- Node.js
- Express
- MongoDB

#### Third Party Accounts

- SendGrid

### Installation

For emails to be sent, an API key needs to be obtained from [SendGrid](https://sendgrid.com/).

1. Copy the example.env file in config directory and rename it to dev.env
2. Fill out the env variables in dev.env
3. In terminal run `npm i`
4. Run `npm run dev`. You may now begin making API requests to locahost with the port specified in your dev.env file

## Production

Heroku CLI will need to be installed to use the following method:

1. Ensure changes are merged to master branch
2. `git push heroku master`

## Authors

Jeffrey Huang - jeffvh@outlook.com
