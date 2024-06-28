Simple Express.js application performing CRUD operations on a MongoDB collection.
The project has been set up using [express-generator](https://github.com/expressjs/generator) and refactored to use TypeScript.

FYI there is also a package called [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) but since this is a learning project, I did the refactoring myself.

## Setup

 1. Set up a [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) cluster
 2. Install [Atlas CLI](https://www.mongodb.com/docs/atlas/cli/current/install-atlas-cli/). 
 3. Load the sample data into a database in your MongoDB Atlas cluster using Atlas CLI. You can follow the tutorial [here](https://www.mongodb.com/docs/atlas/sample-data/) for this step.
 4. Create a `.env` file next to the `.env.example` and copy the contents of `.env.example` into it.
 5. Fill out `DB_CONNECTION_STRING` in the `.env` file.
 6. Run the application with `npm run dev`. This should start a server on the specified port from your `.env` file.

You can now call the API using an API platform like Postman, Insomnia or Bruno. I am using Bruno personally and have added my collection to the project. If you have changed the port for the application, make sure to change the variable for the Bruno requests accordingly.

## HTTPS Support

To enable HTTPS you need to do the following steps:

1. Create a folder called `https` within the express project
2. Create your key and certificate by running `openssl genrsa -out localhost-key.pem 2048` and `openssl req -new -x509 -sha256 -key localhost-key.pem -out localhost.pem -days 365`
3. Go to the `www.ts` file and uncomment the lines that refer to HTTPS while enclosing the parts with standard HTTP within comments

Beware that if you use the Bruno collection, you will have to adjust the URLs from `http` to `https`.

## Next Steps

- Connect Bruno collection to .env
- Extend API routes to handle data transformation and validation
- Error handling and timeouts for routes
- Add DevOps tools like Husky etc.
- Testing
- Logging
- Security
- Docker