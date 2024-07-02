#!/usr/bin/env node

//Module dependencies.
import dotenv from "dotenv";
import http from "http";
/**
 * import https from "https";
 * import fs from "fs";
 */
import debugModule from "debug";
import app from "../app";
import { connectToClient } from "../services/database.service";
import logger from "../services/logging.service";

// Load environment variables
dotenv.config();

// Enable debugging
const debug = debugModule("express:server");

//Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server (enclose in comment if you want to use HTTPS instead)
const server = http.createServer(app);

// UNCOMMENT THESE LINES IF YOU WANT TO ENABLE HTTPS
/**
 * const privateKey = fs.readFileSync('./https/localhost-key.pem');
 * const certificate = fs.readFileSync('./https/localhost.pem');
 * const credentials = {key: privateKey, cert: certificate};
 * const server = https.createServer(credentials, app);
 */

// Initialize MongoDB client connection and start the server
connectToClient()
  .then(() => {
    //Listen on provided port, on all network interfaces.
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
    logger.info(`Server is running on port ${port}`);
  })
  .catch(() => {
    process.exit();
  });

//Normalize a port into a number, string, or false.
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//Event listener for HTTP server "error" event.
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "pipe " + addr : "port " + (addr?.port ?? "");
  debug("Listening on " + bind);
}
