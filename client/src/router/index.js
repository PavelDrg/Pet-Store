import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductsView from "../views/ProductsView.vue";
import AddProduct from "../views/AddProduct.vue";
import AddUser from "../views/RegisterIn.vue";
import UsersView from "../views/UsersView.vue";
import Login from "../views/LogIn.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductsView },
  { path: "/add", component: AddProduct },
  { path: "/register", component: AddUser },
  { path: "/users", component: UsersView },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
