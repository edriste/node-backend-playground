declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV_NAME: string;
      PORT: string;
      DB_CONNECTION_STRING: string;
      DB_NAME: string;
      COMMENTS_COLLECTION_NAME: string;
    }
  }
}

export {};
