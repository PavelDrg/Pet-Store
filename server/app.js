import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProductPrice,
} from "./database.js";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUserEmail,
} from "./database.js";
import { verifyUserCredentials } from "./database.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await deleteProduct(id);
    if (deleted) {
      res.status(200).send("Product deleted successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

app.put("/products/:id/price", async (req, res) => {
  const id = req.params.id;
  const newPrice = req.body.newPrice; // Assuming the new price is sent in the request body

  try {
    const updated = await updateProductPrice(id, newPrice);
    if (updated) {
      res.status(200).send("Product price updated successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error updating product price");
  }
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

app.put("/users/:id/email", async (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.newEmail; // Assuming the new Email is sent in the request body

  try {
    const updated = await updateUserEmail(id, newEmail);
    if (updated) {
      res.status(200).send("User Email updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error updating user Email");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});

///////////////////////////// Verificare parola / LogIn /////////////////////////////

function isAuthenticated(req, res, next) {
  // console.log(req.session);
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).send("Unauthorized");
}

app.post("/login", async (req, res) => {
  const { email, parola } = req.body;
  try {
    const user = await verifyUserCredentials(email, parola);
    if (user) {
      return res.status(200).send({ email, parola });
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error verifying user credentials");
  }
});
