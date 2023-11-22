<template>
  <div class="page-wrapper">
    <v-container>
      <v-row>
        <v-col
          v-for="(product, index) in productsX"
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

// Use computed property to transform the 'products' array
const productsX = products;
</script>

<style scoped></style>
