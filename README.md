# Userfront API challenge

In this challenge, you will implement an additional `GET` route for an API backend.

This is a technical task, but we also want to see how you write code to be read by others. Please keep this in mind as you go.

This repo is indicative of the style and some of the tools used at Userfront. If you have any questions while doing the challenge, please ask!

## Prerequisites

- Install [Node.js](https://nodejs.org/en/), version 12 or higher
- Install [Postgres](https://www.postgresql.org/), version 9.6 or higher

## Setup

1. Set up a local postgres server (default is port 5432) and create a database named `api_challenge`.

```sh
psql
create database api_challenge;
```

2. Fork this repo and install dependencies. ([how to fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo))

```sh
cd api-challenge
npm install
```

3. Run the test suite

```sh
npm run test:watch
```

## Challenge

Following the examples of the `/users/self` and `/roles` endpoints (see below), create 1 additional route:

`GET /users/{userId}`

- [ ] This route should return information about the given user. The response should be in the same format as the `/users/self` route.
- [ ] Only admin users should be able to read from this route. All other requests should receive a 401 unauthorized response. This is the same as for the `/roles` route.

You can add to the test snippets for this endpoint in `/test/user.crud.spec.js`.

You do not need to add any additional tests, but you may do so if you find it helpful.

Once the above tests are implemented and passing, the challenge is considered to be solved.

## Additional information

The API currently has 2 routes:

### `GET /users/self`

Returns information about the user making the request. See more about this route in the following files:

- `/test/user.crud.spec.js`
- `/config/routes/user.routes.js`

### `GET /roles`

Returns a list of roles, provided that the requester is an admin. See more about this route in the following files:

- `/test/role.crud.spec.js`
- `/config/routes/role.routes.js`

### Database setup

The database has 3 tables. These are automatically created when the test suite runs:

| Table     | Purpose                                 | File                  |
| --------- | --------------------------------------- | --------------------- |
| Users     | Basic information about users           | `/models/user.js`     |
| Roles     | List of role names                      | `/models/role.js`     |
| UserRoles | Join table for assigning roles to users | `/models/userRole.js` |

### Authentication

Authentication is done with a [JSON Web Token](https://userfront.com/guide/auth/jwt-json-web-token.html) (JWT) included in the `authorization` header of each request:

```
{
  headers: {
    authorization: "Bearer eyJhbG..."
  }
}
```

The server reads this token and verifies it using the `RSA_PUBLIC_KEY` found in `/config/env/test.env`.

For testing, you can generate a valid token using the `user.generateAccessToken()` method. (See `/test/role.crud.spec.js` for an example)

### Node modules

You can find a list of modules in `package.json`. A short description of each is below:

| Module         | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| @hapi/hapi     | [Hapi.js](https://hapi.dev/), a Node framework for APIs                                   |
| @hapi/joi      | Used for validating data formats (in this case email address)                             |
| boom           | Used to create error messages                                                             |
| dotenv         | Used to read environment variables from `/config/env/`                                    |
| hapi-auth-jwt2 | Hapi plugin for JWT authentication                                                        |
| jsonwebtoken   | Library for signing & verifying JWTs ([docs](https://github.com/auth0/node-jsonwebtoken)) |
| lodash         | [Lodash](https://lodash.com/docs) library of utility methods                              |
| pg             | Database connection library                                                               |
| sequelize      | [Sequelize](https://sequelize.org/v6/) ORM, for user-friendly database queries            |
| chai           | [Chai](https://www.chaijs.com/) test assertion language                                   |
| mocha          | [Mocha](https://mochajs.org/) test framework                                              |
