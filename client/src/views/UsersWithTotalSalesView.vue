<template>
  <div class="page-wrapper">
    <DefaultCard
      v-for="user in usersWithTotalSales"
      :key="user.user_name"
      :data="{
        primary: user.user_name,
        secondary: `Total Sales: ${user.total_sales}`,
      }"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import DefaultCard from "@/components/DefaultCard.vue";

const usersWithTotalSales = ref([]);

const init = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/usersWithTotalSales"
    );
    usersWithTotalSales.value = response.data;
  } catch (error) {
    console.error("Error fetching users with total sales:", error);
  }
};

init();
</script>

<style scoped></style>
