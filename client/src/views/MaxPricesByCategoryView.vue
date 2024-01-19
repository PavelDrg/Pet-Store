<template>
  <h1>Pret maxim per categorie</h1>
  <div class="page-wrapper">
    <DefaultCard
      v-for="category in maxPricesByCategory"
      :key="category.category_title"
      :data="{
        primary: category.category_title,
        secondary: `Max Price: ${category.max_price}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const maxPricesByCategory = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/maxPricesByCategory"
    );
    maxPricesByCategory.value = response.data;
  } catch (error) {
    console.error("Error fetching max prices by category:", error);
  }
};

init();
</script>

<style scoped></style>
