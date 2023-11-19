<template>
  <div class="page-wrapper">
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="formData.title" label="Title"></v-text-field>
      <v-text-field
        v-model.number="formData.price"
        label="Price"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model.number="formData.stock"
        label="Stock"
        type="number"
      ></v-text-field>
      <v-textarea v-model="formData.contents" label="Contents"></v-textarea>
      <v-textarea v-model="formData.img_url" label="img_url"></v-textarea>
      <v-date-picker
        v-model="formattedDate"
        label="Created"
        type="date"
      ></v-date-picker>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { format } from "date-fns";
import axios from "axios";

const formData = ref({});

const formattedDate = ref();

const submitForm = () => {
  formData.value.created = format(new Date(formattedDate.value), "yyyy-MM-dd");
  //   console.log({
  //     title: formData.value.title,
  //     price: formData.value.price,
  //     stock: formData.value.stock,
  //     contents: formData.value.contents,
  //     img_url: formData.value.img_url,
  //     created: formData.value.created,
  //   });
  axios
    .post("http://localhost:8000/products", {
      title: formData.value.title,
      price: formData.value.price,
      stock: formData.value.stock,
      contents: formData.value.contents,
      img_url: formData.value.img_url,
      created: formData.value.created,
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
