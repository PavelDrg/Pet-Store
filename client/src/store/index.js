import { createStore } from "vuex";

export default createStore({
  state: {
    userAuthenticated: null,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.userAuthenticated = user;
    },
  },
  actions: {
    async login({ commit }, { email, parola }) {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, parola }),
        });
        const user = await response.json();
        commit("setUser", user);
      } catch (error) {
        console.log(error);
      }
    },

    async logout({ commit }) {
      await fetch("http://localhost:8000/logout");
      commit("setUser", null);
    },
  },
  modules: {},
});
