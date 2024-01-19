<template>
  <h1>Pret mediu per categorie</h1>
  <div class="page-wrapper">
    <DefaultCard
      v-for="category in avgPricesByCategory"
      :key="category.category_title"
      :data="{
        primary: category.category_title,
        secondary: `Avg Price: ${category.avg_price}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const avgPricesByCategory = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/avgPricesByCategory"
    );
    avgPricesByCategory.value = response.data;
  } catch (error) {
    console.error("Error fetching average prices by category:", error);
  }
};

init();
</script>

<style scoped></style>
