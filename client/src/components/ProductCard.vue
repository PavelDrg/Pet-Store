<template>
  <v-card>
    <!-- Product Photo -->
    <v-img :src="product.image" alt="Product Photo"></v-img>

    <!-- Product Information -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ product.title }}</h3>
        <div class="price">
          Price: {{ product.price }}$
          <v-form
            class="form"
            @submit.prevent="submitForm(formData.price)"
            v-if="
              activeUser &&
              activeUser.email === `admin` &&
              activeUser.parola === `admin`
            "
          >
            <v-text-field
              v-model.number="formData.price"
              label="New price"
              type="number"
              class="field"
            ></v-text-field>
            <v-btn type="submit" color="primary">Update</v-btn></v-form
          >
        </div>
        <div>Stock: {{ product.stock }}</div>
        <div v-if="product.category_title">
          Category: {{ product.category_title }}
        </div>
      </div>
    </v-card-title>

    <!-- Product Description -->
    <v-card-text>
      {{ product.contents }}
    </v-card-text>

    <!-- Actions (Add to Cart and View) -->
    <v-card-actions>
      <!-- <v-btn @click="addToCart" color="primary">Add to Cart</v-btn> -->
      <v-btn
        @click="deleteProduct"
        color="secondary"
        v-if="
          activeUser &&
          activeUser.email === `admin` &&
          activeUser.parola === `admin`
        "
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const activeUser = computed(() => {
  const user = store.state.userAuthenticated;
  return user;
});

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// const addToCart = () => {
//   console.log("Add to Cart");
// };

const deleteProduct = () => {
  axios
    .delete(`http://localhost:8000/products/${props.product.id}`)
    .then((response) => {
      if (response.status === 200) {
        // Perform actions when deletion is successful
        console.log("Product deleted successfully");
        emit("deleteProduct");
        // Optionally, update the UI to reflect the deletion
      } else if (response.status === 404) {
        console.log("Product not found");
      }
      // Handle other status codes if needed
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const formData = ref({
  price: null, // or set it to an initial value if needed
});
const submitForm = (newPrice) => {
  axios
    .put(`http://localhost:8000/products/${props.product.id}/price`, {
      newPrice,
    })
    .then((response) => {
      if (response.status === 200) {
        // Perform actions when update is successful
        console.log("Product price updated successfully");
        emit("updateProduct");
        // Optionally, update the UI to reflect the price change
      } else if (response.status === 404) {
        console.log("Product not found");
      }
      // Handle other status codes if needed
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const emit = defineEmits(["deleteProduct", "updateProduct"]);
</script>

<style scoped>
.price {
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
