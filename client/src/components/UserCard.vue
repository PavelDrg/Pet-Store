<template>
  <v-card>
    <!-- User Information -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ props.user.nume }}</h3>
        <div class="email">
          Email: {{ props.user.email }}
          <v-form class="form" @submit.prevent="submitForm(formData.email)">
            <v-text-field
              v-model="formData.email"
              label="New email"
              class="field"
            ></v-text-field>
            <v-btn type="submit" color="primary">Update</v-btn></v-form
          >
        </div>
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
import { defineProps, defineEmits, ref } from "vue";

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

const formData = ref({
  email: null, // or set it to an initial value if needed
});
const submitForm = (newEmail) => {
  axios
    .put(`http://localhost:8000/users/${props.user.id}/email`, {
      newEmail,
    })
    .then((response) => {
      if (response.status === 200) {
        // Perform actions when update is successful
        console.log("User email updated successfully");
        emit("updateUser");
        // Optionally, update the UI to reflect the email change
      } else if (response.status === 404) {
        console.log("User not found");
      }
      // Handle other status codes if needed
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const emit = defineEmits(["deleteUser", "updateUser"]);
</script>

<style scoped>
.email {
  display: flex;
  justify-content: space-between;
}
.field {
  display: flex;
  max-height: 40px;
}
.form {
  display: flex;
}
</style>
