# Task Manager

An application to manage personal tasks.

## Getting started

### Requirements

#### Application

- React
- Redux
- Node.js
- Express
- MongoDB

#### Third Party Accounts

- SendGrid

### Installation

#### Client

1. Once repository is cloned, from the root of the project navigate to client directory `cd client`
2. Install dependencies `npm i`
3. Run local development `npm run dev`
4. If not automatically opened, visit [http://localhost:3000](http://localhost:3000) in browser.

#### API

Optional: For emails to be sent, an API key needs to be obtained from [SendGrid](https://sendgrid.com/).

1. Copy the example.env file in config directory and rename it to dev.env
2. Fill out the env variables in dev.env
3. In terminal run `npm i`
4. Run `npm run dev`. You may now begin making API requests to locahost with the port specified in your dev.env file. If none is specified it will be on port 5000 --> [http://localhost:5000](http://localhost:5000). If front-end was built with `npm run build`, static files built into the src/static-site directory will also be served and seen.

## Testing

1. Copy the example.env file in the config directory and rename it to test.env
2. Fill out the env variables in test.env but with a database different to dev.env
3. run `npm test`

## Production

Heroku CLI will need to be installed to use the following method:

1. Go into client directory and build frontend `npm run build` which will output static files into src/static-site.
2. Ensure changes are merged to master branch
3. `git push heroku master`

## Authors

Jeffrey Huang - jeffvh@outlook.com
