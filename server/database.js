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

// const result = await createProduct({
//   title: "test",
//   price: 10.25,
//   stock: 10,
//   contents: "descriere tra la la",
//   img_url: "test_img_url",
//   created: "2021-01-01",
// });
// console.log(result);
