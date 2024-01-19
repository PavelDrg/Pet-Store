<template>
  <div class="page-wrapper">
    <v-container>
      <v-select
        :items="categories.map((category) => category.title)"
        v-model="selectedCategory"
        @change="getProductsByCategory"
      >
      </v-select>
      <v-row>
        <v-col
          v-for="(product, index) in products"
          :key="index"
          cols="12"
          md="4"
        >
          <ProductCard
            :product="product"
            @deleteProduct="init"
            @updateProduct="init"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import { ref, watch } from "vue";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    products.value = response.data;
    const response2 = await axios.get("http://localhost:8000/categories");
    categories.value = response2.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const getProductsByCategory = async () => {
  try {
    if (selectedCategory.value) {
      const response = await axios.get(
        `http://localhost:8000/productsByCategory/${selectedCategory.value}`
      );
      products.value = response.data;
    } else {
      // If no category is selected, show all products
      const response = await axios.get("http://localhost:8000/products");
      products.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

watch(selectedCategory, () => {
  getProductsByCategory();
});

init();
</script>

<style scoped></style>
