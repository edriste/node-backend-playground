// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { comments?: mongoDB.Collection } = {};

// Initialize Connection

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONNECTION_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  console.log(db.databaseName);

  const commentsCollection: mongoDB.Collection = db.collection(
    process.env.COMMENTS_COLLECTION_NAME
  );

  collections.comments = commentsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${commentsCollection.collectionName}`
  );
}
