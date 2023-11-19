import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductsView from "../views/ProductsView.vue";
import AddProduct from "../views/AddProduct.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductsView },
  { path: "/add", component: AddProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
