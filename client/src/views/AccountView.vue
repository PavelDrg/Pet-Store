<template>
  <div class="page-wrapper">
    <h1>Account details:</h1>
    <UserCard :user="activeUser" @deleteUser="init" @updateUser="init" />
  </div>
</template>

<script setup>
import UserCard from "@/components/UserCard.vue";
import axios from "axios";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const users = ref([]);

const activeUser = computed(() => {
  const user = store.state.userAuthenticated;
  return user;
});

const init = async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

init();
</script>

<style scoped></style>
