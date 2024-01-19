<template>
  <div class="page-wrapper">
    <DefaultCard
      v-for="productSaleDetail in productsSalesDetails"
      :key="productSaleDetail.product_title"
      :data="{
        primary: productSaleDetail.product_title,
        secondary: `Total Price: ${productSaleDetail.total_price}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const productsSalesDetails = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/productsSalesDetails"
    );
    productsSalesDetails.value = response.data;
  } catch (error) {
    console.error("Error fetching products sales details:", error);
  }
};

init();
</script>

<style scoped></style>
