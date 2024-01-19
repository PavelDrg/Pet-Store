<template>
  <div class="page-wrapper">
    <DefaultCard
      v-for="sale in sales"
      :key="sale.id"
      :data="{
        primary: sale.user_name,
        secondary: sale.sale_date,
        third: sale.sale_id,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const sales = ref([]);

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/totalSales");
    sales.value = response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
  }
};

init();
</script>

<style scoped></style>
