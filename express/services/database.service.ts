// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import logger from "./logging.service";

// Load environment variables
dotenv.config();

// Global Variables
export const collections: { comments?: mongoDB.Collection } = {};
let client: mongoDB.MongoClient;
export let isClientConnected = false;

// Connect to the client
export async function connectToClient() {
  if (client || isClientConnected) {
    logger.warn("MongoDB client is already connected");
    return;
  }

  try {
    client = new mongoDB.MongoClient(process.env.DB_CONNECTION_STRING);
    await client.connect();
    isClientConnected = true;
    logger.info(`Connected to the MongoDB client`);
  } catch (error) {
    logger.error(`Failed to connect to the MongoDB cluster`);
    // Rethrow to notify the caller of the connection failure
    throw error;
  }
}

// Connect to the database
export async function connectToDatabase() {
  if (!isClientConnected) {
    await connectToClient();
  }

  try {
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    logger.info(`Successfully connected to the database '${db.databaseName}'`);
    return db;
  } catch (error) {
    logger.error(`Failed to connect to the database '${process.env.DB_NAME}'`);
    // Rethrow to notify the caller of the database connection failure
    throw error;
  }
}

// Get comments collection
export async function getCommentsCollection(): Promise<mongoDB.Collection> {
  await connectToDatabase();

  try {
    const db: mongoDB.Db = await connectToDatabase();
    const commentsCollection: mongoDB.Collection = db.collection(
      process.env.COMMENTS_COLLECTION_NAME,
    );
    logger.info(
      `Connected to collection '${commentsCollection.collectionName}'`,
    );
    return commentsCollection;
  } catch (error) {
    logger.error(
      `Failed to get collection '${process.env.COMMENTS_COLLECTION_NAME}'`,
      error,
    );
    // Rethrow to notify the caller of the collection connection failure
    throw new Error(
      `Collection '${process.env.COMMENTS_COLLECTION_NAME}' not found`,
    );
  }
}
// Initialize Collections
export async function initializeCollections() {
  try {
    collections.comments = await getCommentsCollection();
    logger.info("Collections initialized");
  } catch (error) {
    logger.error("Failed to initialize collections", error);
    // Rethrow eror to notify the caller of the initialization failure
    throw error;
  }
}

export async function disconnectFromClient() {
  if (client && isClientConnected) {
    await client.close();
    logger.info("Disconnected from the MongoDB client");
  } else {
    logger.warn("No active MongoDB client connection to close");
  }
}
