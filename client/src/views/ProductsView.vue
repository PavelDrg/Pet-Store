<template>
  <div class="page-wrapper">
    <p v-if="products.length > 0">{{ products[0] }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const products = ref([]);

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

init();
</script>

<style scoped></style>
