<template>
  <v-app>
    <NavigationBar />
    <v-container class="app-wrapper">
      <router-view />
    </v-container>
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

.app-wrapper {
  padding-top: 6rem;
}
</style>
