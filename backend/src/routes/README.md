# Routes Folder

In Fastify routes are defined as plugins that register api endpoints. That being said this folder contains all api routes for the server. Within it there is a `root.ts` file which is the main entry point into the api. The rest of the folder contains additional folders that each represent separate services such as the `accounts` service and the `providers` service. If necessary these services can be later extracted into separate servers or even ported to more efficient backend frameworks.
In this folder you should define all the routes that define the endpoints
of your web application.

