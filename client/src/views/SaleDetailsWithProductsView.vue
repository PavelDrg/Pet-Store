<template>
  <div class="page-wrapper">
    <DefaultCard
      v-for="saleDetail in saleDetails"
      :key="saleDetail.sale_detail_id"
      :data="{
        primary: saleDetail.product_title,
        secondary: `Quantity: ${saleDetail.quantity}`,
        third: `Sale Detail ID: ${saleDetail.sale_detail_id}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const saleDetails = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/saleDetailsWithProducts"
    );
    saleDetails.value = response.data;
  } catch (error) {
    console.error("Error fetching sale details:", error);
  }
};

init();
</script>

<style scoped></style>
