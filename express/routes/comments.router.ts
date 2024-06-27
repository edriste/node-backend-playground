// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Comment from "../models/comment";

// Global Config

const commentsRouter = express.Router();
commentsRouter.use(express.json());

// GET

commentsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const comments = (await collections.comments
      ?.find({})
      .toArray()) as Comment[];

    res.status(200).send(comments);
  } catch (error) {
    let errorMessage = "Could not get comments";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send(errorMessage);
  }
});

commentsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const comment = (await collections.comments?.findOne(query)) as Comment;

    if (comment) {
      res.status(200).send(comment);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST

commentsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newComment = req.body as Comment;
    const result = await collections.comments?.insertOne(newComment);

    result
      ? res
          .status(201)
          .send(
            `Successfully created a new comment with id ${result.insertedId}`
          )
      : res.status(500).send("Failed to create a new comment.");
  } catch (error) {
    let errorMessage = "Could not create new comment";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// PUT

commentsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedComment: Comment = req.body as Comment;
    const query = { _id: new ObjectId(id) };

    const result = await collections.comments?.updateOne(query, {
      $set: updatedComment,
    });

    result
      ? res.status(200).send(`Successfully updated comment with id ${id}`)
      : res.status(304).send(`Comment with id: ${id} not updated`);
  } catch (error) {
    let errorMessage = `Could not update comment with id: ${id}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// DELETE

commentsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.comments?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed comment with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove comment with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Comment with id ${id} does not exist`);
    }
  } catch (error) {
    let errorMessage = `Could not remove comment with id: ${id}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default commentsRouter;
