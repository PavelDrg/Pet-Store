import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    // host: "127.0.0.1",
    // user: "root",
    // password: "lala678",
    // database: "pet_store",
  })
  .promise();

///////////////////////////// Products /////////////////////////////

export async function getProducts() {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
}

export async function getProduct(id) {
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
  return rows[0];
}

export async function createProduct(product) {
  const [result] = await pool.query(
    `INSERT INTO products (title, price, stock, contents, img_url, created) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      product.title,
      product.price,
      product.stock,
      product.contents,
      product.img_url,
      product.created,
    ]
  );
  const id = result.insertId;
  return getProduct(id);
}

export async function deleteProduct(id) {
  const result = await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
  return result[0].affectedRows > 0;
}

///////////////////////////// Users /////////////////////////////

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function createUser(user) {
  const [result] = await pool.query(
    `INSERT INTO users (nume, email, parola, adress, telephone) VALUES (?, ?, ?, ?, ?)`,
    [user.nume, user.email, user.parola, user.adress, user.telephone]
  );
  const id = result.insertId;
  return getUser(id);
}

export async function deleteUser(id) {
  const result = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result[0].affectedRows > 0;
}

///////////////////////////// Verificare parola / LogIn /////////////////////////////

export async function verifyUserCredentials(email, parola) {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND parola = ?",
    [email, parola]
  );

  return rows.length > 0; // Returns true if there's a match
}
