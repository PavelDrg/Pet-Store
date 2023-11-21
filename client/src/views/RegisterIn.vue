<template>
  <div class="page-wrapper mic">
    <h1>Register</h1>

    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="formData.nume" label="Username"></v-text-field>
      <v-text-field v-model="formData.email" label="Email"></v-text-field>
      <v-text-field v-model="formData.parola" label="Parola"></v-text-field>
      <v-btn type="submit" color="primary"
        >------------------} Submit {------------------</v-btn
      >
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const formData = ref({});

const submitForm = () => {
  //   console.log({
  //     title: formData.value.title,
  //     price: formData.value.price,
  //     stock: formData.value.stock,
  //     contents: formData.value.contents,
  //     img_url: formData.value.img_url,
  //     created: formData.value.created,
  //   });
  axios
    .post("http://localhost:8000/users", {
      nume: formData.value.nume,
      email: formData.value.email,
      parola: formData.value.parola,
      //   contents: formData.value.contents,
      //   img_url: formData.value.img_url,
      //   created: formData.value.created,
    })
    .then((response) => {
      console.log("Response:", response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
</script>

<style scoped></style>
