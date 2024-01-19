import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductsView from "../views/ProductsView.vue";
import AddProduct from "../views/AddProduct.vue";
import AddUser from "../views/RegisterIn.vue";
import UsersView from "../views/UsersView.vue";
import Login from "../views/LogIn.vue";
import AccountView from "../views/AccountView.vue";
import ProductsWithCategoriesView from "../views/ProductsWithCategoriesView.vue";
import TotalSalesView from "../views/TotalSalesView.vue";
import SaleDetailsWithProductsView from "../views/SaleDetailsWithProductsView.vue";
import SalesDetailsWithUsersView from "../views/SalesDetailsWithUsersView.vue";
import ProductsSalesDetailsView from "../views/ProductsSalesDetailsView.vue";
import ProductsMinStockView from "../views/ProductsMinStockView.vue";
import MaxPricesByCategoryView from "../views/MaxPricesByCategoryView.vue";
import AvgPricesByCategoryView from "../views/AvgPricesByCategoryView.vue";
import UsersWithTotalSalesView from "../views/UsersWithTotalSalesView.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductsView },
  { path: "/add", component: AddProduct },
  { path: "/register", component: AddUser },
  { path: "/users", component: UsersView },
  { path: "/login", component: Login },
  { path: "/account", component: AccountView },
  { path: "/productsWithCategories", component: ProductsWithCategoriesView },
  { path: "/totalSalesView", component: TotalSalesView },
  { path: "/saleDetailsWithProducts", component: SaleDetailsWithProductsView },
  { path: "/salesDetailsWithUsers", component: SalesDetailsWithUsersView },
  { path: "/productsSalesDetails", component: ProductsSalesDetailsView },
  { path: "/productsMinStock", component: ProductsMinStockView },
  { path: "/maxPricesByCategory", component: MaxPricesByCategoryView },
  { path: "/avgPricesByCategory", component: AvgPricesByCategoryView },
  { path: "/usersWithTotalSales", component: UsersWithTotalSalesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
