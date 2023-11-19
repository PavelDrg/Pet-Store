import express from "express";

import { getProducts, getProduct, createProduct } from "./database.js";

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
