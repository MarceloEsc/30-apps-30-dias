<template>
  <div v-if="user.length != 0 && !user.message" class="container">
    <div class="details">
      <img v-bind:src="user.avatar_url" width="200px" />
      <div>
        <span class="name">{{user.name}}</span>
        <a :href="user.html_url" target="_blank">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <span>repositórios: {{user.public_repos}}</span>
    </div>

    <Repos v-bind:repos="userRepos" />
  </div>

  <div v-else-if="user.message" class="center">Usuário não encontrado!!!</div>
  <div v-else class="center">Pesquise um usuário</div>
</template>

<script>
import Repos from "../components/Repos.vue";
export default {
  name: "Home",
  components: {
    Repos
  },
  props: ["user", "userRepos"]
};
</script>

<style scoped>
.center {
  text-align: center;
  margin-top: 100px;
  font-size: 30px;
}

.container {
  display: grid;
  grid-template-columns: 300px auto;
  margin-top: 70px;
}

.name {
  font-weight: 600;
}

.details {
  height: calc(100vh - 100px);
  position: sticky;
  top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  padding: 15px;
  background: #eee;
}

.details img {
  border-radius: 50%;
}

.details a {
  color: #000;
  font-size: 35px;
}

.details a:hover {
  color: #444;
}

.details > div {
  display: flex;
  align-items: center;
}

.details > div span {
  margin: 10px;
}
</style>
