<template>
  <div class="page-wrapper">
    <h1>Toate produsele din fiecare categorie</h1>
    <v-container>
      <!-- Loop through unique categories -->
      <v-row
        v-for="(categoryProducts, categoryName) in groupedProducts"
        :key="categoryName"
      >
        <v-col cols="12">
          <h2>{{ categoryName }}</h2>
        </v-col>
        <!-- Loop through products within each category -->
        <v-col
          v-for="(product, index) in categoryProducts"
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

    <!-- <p v-if="products.length > 0">{{ products[0] }}</p>
        <p v-else>Loading...</p> -->
  </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import { ref, computed } from "vue";

const products = ref([]);
const categories = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/productsWithCategories"
    );
    products.value = response.data;
    categories.value = products.value;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

init();

// Use computed property to transform the 'products' array
const groupedProducts = computed(() => {
  const result = {};
  products.value.forEach((product) => {
    const categoryName = product.category_title;

    // Initialize category array if not exists
    if (!result[categoryName]) {
      result[categoryName] = [];
    }

    // Push product to the corresponding category array
    result[categoryName].push(product);
  });

  return result;
});
</script>

<style scoped></style>
