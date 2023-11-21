<template>
  <v-card>
    <!-- Product Photo -->
    <v-img :src="props.product.image" alt="Product Photo"></v-img>

    <!-- Product Information -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ props.product.title }}</h3>
        <div>Price: {{ props.product.price }}$</div>
        <div>Stock: {{ props.product.stock }}</div>
      </div>
    </v-card-title>

    <!-- Product Description -->
    <v-card-text>
      {{ props.product.contents }}
    </v-card-text>

    <!-- Actions (Add to Cart and View) -->
    <v-card-actions>
      <v-btn @click="addToCart" color="primary">Add to Cart</v-btn>
      <v-btn @click="deleteProduct" color="secondary">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToCart = () => {
  console.log("Add to Cart");
};

const deleteProduct = () => {
  axios
    .delete(`http://localhost:8000/products/${props.product.id}`)
    .then((response) => {
      if (response.status === 200) {
        // Perform actions when deletion is successful
        console.log("Product deleted successfully");
        emit("deleteProduct");
        // Optionally, update the UI to reflect the deletion
      } else if (response.status === 404) {
        console.log("Product not found");
      }
      // Handle other status codes if needed
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const emit = defineEmits(["deleteProduct"]);
</script>

<style scoped></style>
