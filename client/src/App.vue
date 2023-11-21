<template>
  <v-app>
    <NavigationBar />
    <router-view />
  </v-app>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";
</script>

<style>
.page-wrapper {
  padding-top: 6rem;
}

.mic {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
