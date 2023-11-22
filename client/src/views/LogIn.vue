<template>
  <div class="page-wrapper mic">
    <div v-if="!activeUser">
      <h1>Log In</h1>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="formData.email" label="Email"></v-text-field>
        <v-text-field v-model="formData.parola" label="Parola"></v-text-field>
        <v-btn type="submit" color="primary"
          >------------------} Submit {------------------</v-btn
        >
      </v-form>
    </div>
    <div v-else>
      <h1>Logged in as {{ activeUser.email }}</h1>
      <v-btn @click="store.dispatch('logout')" color="primary">Log Out</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import axios from "axios";
import { useStore } from "vuex";

const store = useStore();

const formData = ref({});

const submitForm = async () => {
  try {
    await store.dispatch("login", {
      email: formData.value.email,
      parola: formData.value.parola,
    });
    // Any code you want to execute after a successful login can go here
  } catch (error) {
    console.error("Error logging in:", error);
    // Handle login errors, such as displaying an error message to the user
  }
};

const activeUser = computed(() => {
  const user = store.state.userAuthenticated;
  return user;
});
</script>

<style scoped>
.add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5rem 0;
}
</style>
