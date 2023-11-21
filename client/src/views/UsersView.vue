<template>
  <div class="page-wrapper">
    <v-container>
      <v-row>
        <v-col v-for="(user, index) in users" :key="index" cols="12" md="4">
          <UserCard :user="user" @deleteUser="init" />
        </v-col>
      </v-row>
    </v-container>

    <!-- <p v-if="users.length > 0">{{ users[0] }}</p>
    <p v-else>Loading...</p> -->
  </div>
</template>

<script setup>
import UserCard from "@/components/UserCard.vue";
import axios from "axios";
import { ref } from "vue";

const users = ref([]);

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

init();

// Use computed property to transform the 'users' array
</script>

<style scoped></style>
