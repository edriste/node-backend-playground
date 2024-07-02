import { ObjectId } from "mongodb";

export default class Comment {
  public _id: ObjectId;
  public name: string;
  public email: string;
  public movie_id: ObjectId;
  public text: string;
  public date: Date;

  constructor(
    _id: ObjectId,
    name: string,
    email: string,
    movie_id: ObjectId,
    text: string,
    date: Date,
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.movie_id = movie_id;
    this.text = text;
    this.date = date;
  }
}
