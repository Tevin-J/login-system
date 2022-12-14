import { pool as db } from '../util/database.js';

export class Post {
  constructor(title, body, user) {
    this.title = title;
    this.body = body;
    this.user = user;
  }

  static fetchAll() {
    console.log(`\nfetch all posts`);
    return db.execute(
      `
        SELECT * FROM posts
      `
    );
  }

  static create({ title, body, user }) {
    console.log(`\ncreate post\ntitle:${title}\nbody:${body}\nuser:${user}`);
    return db.execute(
      `
        INSERT INTO posts(title, body, user)
        VALUES(?, ?, ?)
      `,
      [title, body, user]
    );
  }

  static delete(id) {
    console.log(`\ndelete post\nid:${id}`);
    return db.execute(
      `
        DELETE FROM posts
        WHERE id=?
      `,
      [id]
    );
  }
}
