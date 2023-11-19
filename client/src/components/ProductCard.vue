<template>
  <v-card>
    <!-- Product Photo -->
    <v-img :src="product.image" alt="Product Photo"></v-img>

    <!-- Product Information -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ product.name }}</h3>
        <div>Price: {{ product.price }}$</div>
        <div>Stock: {{ product.stock }}</div>
      </div>
    </v-card-title>

    <!-- Product Description -->
    <v-card-text>
      {{ product.description }}
    </v-card-text>

    <!-- Actions (Add to Cart and View) -->
    <v-card-actions>
      <v-btn @click="addToCart" color="primary">Add to Cart</v-btn>
      <v-btn @click="viewDetails" color="secondary">View Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToCart = () => {
  console.log("Add to Cart");
};
const viewDetails = () => {
  console.log("View Details");
};
</script>

<style scoped></style>
