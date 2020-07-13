<template>
  <div id="app">
    <Header v-on:get-user="getUser" />
    <Home v-bind:user="userData" v-bind:userRepos="userRepos" />
  </div>
</template>

<script>
import axios from "axios";

import Home from "./views/Home.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Home,
    Header
  },
  data() {
    return {
      userData: [],
      userRepos: []
    };
  },
  methods: {
    getUser(username) {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then(res => (this.userData = res.data))
        .then(() => this.getUserRepos(this.userData.login))
        .catch(err => {
          this.userData = { message: "Usuário não encontrado" };
          this.userRepos = { message: "Este usuário não tem repositórios" };
          console.log(err);
        });
    },

    getUserRepos(login) {
      axios
        .get(`https://api.github.com/users/${login}/repos`)
        .then(res => (this.userRepos = res.data));
      console.log(this.userRepos);
    }
  },
  computed: {
    hasRepo: () => {
      return this.userData;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
</style>
