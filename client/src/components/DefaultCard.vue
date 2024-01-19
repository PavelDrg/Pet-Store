<template>
  <div class="default-card">
    <div class="bold">{{ props.data.primary }}</div>
    <div v-if="props.data.secondary">{{ props.data.secondary }}</div>
    <div v-if="props.data.third">{{ props.data.third }}</div>
    <div v-if="props.data.fourth">{{ props.data.fourth }}</div>
    <div v-if="props.data.fifth">{{ props.data.fifth }}</div>
    <div v-if="props.data.sixth">{{ props.data.sixth }}</div>
    <div v-if="props.data.seventh">{{ props.data.seventh }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.default-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
}
.bold {
  font-weight: bold;
}
</style>
