<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>My Pet Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/">
      <v-btn> Home </v-btn>
    </router-link>
    <router-link to="/products">
      <v-btn> Products </v-btn>
    </router-link>
    <router-link to="/account">
      <v-btn v-if="activeUser"> My Account </v-btn>
    </router-link>
    <router-link to="/register">
      <v-btn v-if="!activeUser"> Register </v-btn>
    </router-link>
    <router-link to="/login">
      <v-btn v-if="!activeUser"> Log In </v-btn>
    </router-link>
    <router-link to="/login">
      <v-btn v-if="activeUser"> Log Out </v-btn>
    </router-link>
    <v-menu
      class="navbar--dropdown"
      offset-y
      v-if="
        activeUser &&
        activeUser.email === `admin` &&
        activeUser.parola === `admin`
      "
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="navbar--button"
          v-bind="props"
          @click="menuActive = !menuActive"
        >
          Details
          <v-icon class="ml-1" small>
            {{ menuActive ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/productsWithCategories"
          >Products and Categories</v-list-item
        >
        <v-list-item to="/totalSalesView">Total Sales</v-list-item>
        <v-list-item to="/saleDetailsWithProducts"
          >Sale Details With Products</v-list-item
        >
        <v-list-item to="/productsByCategory">Products by Category</v-list-item>
        <v-list-item to="/salesDetailsWithUsers"
          >Sale Details with Users</v-list-item
        >
        <v-list-item to="/productsSalesDetails"
          >Products Sales Details</v-list-item
        >
      </v-list>
    </v-menu>
    <v-menu
      class="navbar--dropdown"
      offset-y
      v-if="
        activeUser &&
        activeUser.email === `admin` &&
        activeUser.parola === `admin`
      "
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="navbar--button"
          v-bind="props"
          @click="menuActive = !menuActive"
        >
          Details - complex
          <v-icon class="ml-1" small>
            {{ menuActive ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/productsMinStock"
          >Products with Min Stock</v-list-item
        >
        <v-list-item to="/maxPricesByCategory"
          >Max Price by Category</v-list-item
        >
        <v-list-item to="/avgPricesByCategory"
          >Average Price by Category</v-list-item
        >
        <v-list-item to="/usersWithTotalSales"
          >Users with Total Sales</v-list-item
        >
      </v-list>
    </v-menu>
    <v-menu
      class="navbar--dropdown"
      offset-y
      v-if="
        activeUser &&
        activeUser.email === `admin` &&
        activeUser.parola === `admin`
      "
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="navbar--button"
          v-bind="props"
          @click="menuActive = !menuActive"
        >
          Admin
          <v-icon class="ml-1" small>
            {{ menuActive ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/add">Add Product</v-list-item>
        <v-list-item to="/users">Users</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const elevation = ref(0);
const scrollY = ref(0);
const menuActive = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
  elevation.value = scrollY.value > 0 ? 2 : 0;
};

const activeUser = computed(() => {
  const user = store.state.userAuthenticated;
  return user;
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
