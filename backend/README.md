# TranscendCare API

## Overview

This api is dedicated to providing low latency services to the TranscendCare app. While it is currently a Monolith, it will ultimately become one of several microservices that enhance the performance and user experience.
This project was buil using [Fastify](https://www.fastify.io/docs/latest/) a light and performant Javascript backend framework that emphasizes optimized/typesafe http requests with the use of json-schema. 
The database folder contains the database definition and accessor functions. It uses a bleeding-edge TypeScript SQL tool called Drizzle-ORM to generate SQL queries that are mapped to TypeScript types for full api-database typesafety. More about that in `src/db/README.md`. 
To learn about how this project organizes routes and apis go to: `src/routes/README.md`. 
To learn about the plugin system in Fastify and how this project uses it to integrate additional functionality and features- as well as important security necessities, go to `src/plugins/README.md`.

## Testing the API

In order to test out the API you will need to get your keys from [clerk.com](https://dashboard.clerk.com).
Go to "API keys" in the `DEVELOPERS` section of the sidebar. Grab the appropriate keys and replace the dummy data in the env.example file. Finally change the filename from `env.example` to `.env`. You should now be able to run the development version on your local system and make changes. For more information on how you can contibute see `CONTRIBUTING.md`.

## Running the Project Locally

##### `npm run dev`

Starts the app in dev mode on [port 4040](http://localhost:4040)

## Running Tests

##### `npm run test`

This project uses the Node Tap testing library.

