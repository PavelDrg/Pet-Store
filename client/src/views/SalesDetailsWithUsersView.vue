<template>
  <h1>Detalii vanzari per user</h1>
  <div class="page-wrapper">
    <DefaultCard
      v-for="saleDetail in salesDetailsWithUsers"
      :key="saleDetail.sale_id"
      :data="{
        primary: saleDetail.user_name,
        secondary: `Quantity: ${saleDetail.quantity}`,
        third: `Sale ID: ${saleDetail.sale_id}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const salesDetailsWithUsers = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/salesDetailsWithUsers"
    );
    salesDetailsWithUsers.value = response.data;
  } catch (error) {
    console.error("Error fetching sales details with users:", error);
  }
};

init();
</script>

<style scoped></style>
