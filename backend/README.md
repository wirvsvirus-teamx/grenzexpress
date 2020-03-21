# Grenz*express* backend server

This is the backend application for Grenz*express*. It is responsible for storing the encrypted form
data in a database (currently Postgres).

## Development

Start the server with `npm start`. Note that this will try to connect to a Postgres instance at
`localhost:5432`. There is a `docker-compose.yml` file which will start a database instance (via
`docker-compose up`).

Running `npm run lint` will run eslint against the code.

## Architecture / Project structure

We're using [typeorm](https://www.npmjs.com/package/typeorm) as ORM library. All database entities
are located in the `src/entity/` directory.

This project uses [koa](https://www.npmjs.com/package/koa) as router. All routes and their
controllers contained in the `src/controllers/` directory.
Koa then uses [routing-controllers](https://www.npmjs.com/package/routing-controllers) for matching
routes to controllers and [class-validator](https://www.npmjs.com/package/class-validator) for
validating request objects against pre-defined classes.

For logging, [bunyan](https://www.npmjs.com/package/bunyan) is used.
