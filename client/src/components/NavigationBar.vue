<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>My Pet Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/">
      <v-btn> Home </v-btn>
    </router-link>
    <router-link to="/products">
      <v-btn> Products </v-btn>
    </router-link>
    <router-link to="/add">
      <v-btn> Admin </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script setup></script>
