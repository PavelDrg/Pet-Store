<template>
  <v-card>
    <!-- User Information -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ props.user.nume }}</h3>
        <div>Email: {{ props.user.email }}</div>
        <div>Parola: {{ props.user.parola }}</div>
      </div>
    </v-card-title>

    <!-- Actions (Add to Cart and View) -->
    <v-card-actions>
      <v-btn @click="deleteUser" color="primary">Delete Account</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const deleteUser = () => {
  axios
    .delete(`http://localhost:8000/users/${props.user.id}`)
    .then((response) => {
      if (response.status === 200) {
        // Perform actions when deletion is successful
        console.log("User deleted successfully");
        emit("deleteUser");
        // Optionally, update the UI to reflect the deletion
      } else if (response.status === 404) {
        console.log("User not found");
      }
      // Handle other status codes if needed
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const emit = defineEmits(["deleteUser"]);
</script>

<style scoped></style>
