import { createApp } from "vue";
import router from "./router/index.js"; // Import your router instance
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App)
  .use(store)
  .use(router) // Use the router
  .use(vuetify)
  .mount("#app");
