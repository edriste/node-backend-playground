import { ObjectId } from "mongodb";

export default class Comment {
  constructor(
    public _id: ObjectId,
    public name: string,
    public email: string,
    public movie_id: ObjectId,
    public text: string,
    public date: Date
  ) {}
}
