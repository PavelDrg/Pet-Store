<template>
  <div class="page-wrapper">
    <DefaultCard
      v-for="product in productsMinStock"
      :key="product.id"
      :data="{
        primary: product.title,
        secondary: `Stock: ${product.stock}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const productsMinStock = ref([]);

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/productsMinStock");
    productsMinStock.value = response.data;
  } catch (error) {
    console.error("Error fetching products with minimum stock:", error);
  }
};

init();
</script>

<style scoped></style>
