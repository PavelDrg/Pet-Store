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

export async function updateProductPrice(id, newPrice) {
  const result = await pool.query(
    `UPDATE products SET price = ? WHERE id = ?`,
    [newPrice, id]
  );
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

export async function updateUserEmail(id, newEmail) {
  const result = await pool.query(`UPDATE users SET email = ? WHERE id = ?`, [
    newEmail,
    id,
  ]);
  return result[0].affectedRows > 0;
}

///////////////////////////// Verificare parola / LogIn /////////////////////////////

export async function verifyUserCredentials(email, parola) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND parola = ?",
      [email, parola]
    );

    // console.log(rows);
    return rows.length > 0; // Returns true if there's a match
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

///////////////////////////// Interogari simple /////////////////////////////

export async function getProductsWithCategories() {
  const [rows] = await pool.query(`
  SELECT p.title as product_title, c.title as category_title, p.id, p.price, p.stock, p.contents, p.img_url, p.created
  FROM products p
  JOIN products_categories pc ON p.id = pc.product_id
  JOIN categories c ON pc.category_id = c.id;
  `);
  return rows;
}

export async function getSalesWithUsers() {
  const [rows] = await pool.query(`
    SELECT s.id as sale_id, s.sale_date, u.nume as user_name
    FROM sales s
    JOIN users u ON s.user_id = u.id
  `);
  return rows;
}

export async function getSaleDetailsWithProducts() {
  const [rows] = await pool.query(`
    SELECT sd.id as sale_detail_id, sd.quantity, p.title as product_title
    FROM sales_details sd
    JOIN products p ON sd.product_id = p.id
  `);
  return rows;
}
////////smecherie
export async function getProductsByCategory(categoryTitle) {
  const [rows] = await pool.query(
    `
    SELECT p.title, p.stock
    FROM products p
    JOIN products_categories pc ON p.id = pc.product_id
    JOIN categories c ON pc.category_id = c.id
    WHERE c.title = ?;
  `,
    [categoryTitle]
  );
  return rows;
}

export async function getSalesDetailsWithUsers() {
  const [rows] = await pool.query(`
    SELECT s.id as sale_id, sd.quantity, u.nume as user_name
    FROM sales s
    JOIN sales_details sd ON s.id = sd.sale_id
    JOIN users u ON s.user_id = u.id;
  `);
  return rows;
}

export async function getProductsSalesDetails() {
  const [rows] = await pool.query(`
    SELECT p.title as product_title, s.total_price
    FROM products p
    JOIN sales_details sd ON p.id = sd.product_id
    JOIN sales s ON sd.sale_id = s.id;
  `);
  return rows;
}

///////////////////////////// Interogari complexe /////////////////////////////

export async function getProductsMinStock() {
  const [rows] = await pool.query(`
    SELECT title, stock
    FROM products
    WHERE stock = (SELECT MIN(stock) FROM products);
  `);
  return rows;
}

export async function getMaxPricesByCategory() {
  const [rows] = await pool.query(`
    SELECT c.title as category_title, 
           (SELECT MAX(price) FROM products p WHERE p.id IN (SELECT product_id FROM products_categories pc WHERE pc.category_id = c.id)) as max_price
    FROM categories c;
  `);
  return rows;
}

export async function getAvgPricesByCategory() {
  const [rows] = await pool.query(`
    SELECT
        c.title AS category_title,
        (
            SELECT AVG(p_inner.price)
            FROM products p_inner
            WHERE p_inner.id IN (
                SELECT pc_inner.product_id
                FROM products_categories pc_inner
                WHERE pc_inner.category_id = c.id
            )
        ) AS avg_price
    FROM categories c;
  `);
  return rows;
}

export async function getUsersWithTotalSales() {
  const [rows] = await pool.query(`
    SELECT u.nume as user_name, 
           (SELECT COUNT(*) FROM sales s WHERE u.id = s.user_id) as total_sales
    FROM users u;
  `);
  return rows;
}
