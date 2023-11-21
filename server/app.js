import express from "express";

import { getProducts, getProduct, createProduct } from "./database.js";
import { getUsers, getUser, createUser, deleteUser } from "./database.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.send(product);
});

app.post("/products", async (req, res) => {
  const { title, price, stock, contents, img_url, created } = req.body;
  const product = await createProduct({
    title,
    price,
    stock,
    contents,
    img_url,
    created,
  });
  res.status(201).send(product);
});

///////////////////////////// Users /////////////////////////////

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.post("/users", async (req, res) => {
  const { nume, email, parola, adress, telephone } = req.body;
  const user = await createUser({
    nume,
    email,
    parola,
    adress,
    telephone,
  });
  res.status(201).send(user);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await deleteUser(id);
    if (deleted) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
