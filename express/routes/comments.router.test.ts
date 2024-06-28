import request from "supertest";
import app from "../app";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../services/database.service";

describe("CommentsRouter", () => {
  // connect to database
  beforeAll(async () => {
    await connectToDatabase();
  });
  afterAll(async () => {
    await disconnectFromDatabase();
  });
  describe("When all comments are requested", () => {
    it("Returns a status code 200", () => {
      return request(app).get("/comments").expect(200);
    });

    it("Returns a list of comments", () => {
      return request(app)
        .get("/comments")
        .then((response) => {
          expect(response.body).not.toBeUndefined();
        });
    });
  });
});
