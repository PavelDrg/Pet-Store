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
    <router-link to="/register">
      <v-btn> Register </v-btn>
    </router-link>
    <router-link to="/login">
      <v-btn> Log In </v-btn>
    </router-link>
    <!-- <router-link to="/add">
      <v-btn> Admin </v-btn>
    </router-link> -->
    <v-menu class="navbar--dropdown" offset-y>
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
import { ref, onMounted, onBeforeUnmount } from "vue";

const elevation = ref(0);
const scrollY = ref(0);
const menuActive = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
  elevation.value = scrollY.value > 0 ? 2 : 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
