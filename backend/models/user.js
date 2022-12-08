import { pool as db } from '../util/database.js';

export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static save(user) {
    return db.execute(
      `
      INSERT INTO users(name, email, password)
      VALUES(?, ?, ?)
    `,
      [user.name, user.email, user.password]
    );
  }

  static find(email) {
    console.log('find', email);
    return db.execute(
      `
        SELECT * FROM users
        WHERE email=?
      `,
      [email]
    );
  }
}
