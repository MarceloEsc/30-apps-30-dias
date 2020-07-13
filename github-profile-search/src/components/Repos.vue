<template>
  <div>
    <dir v-for="repo in repos" :key="repo.id" class="container">
      <a :href="repo.html_url" target="_blank" class="repo-card">
        <span class="name">{{repo.name}}</span>
        <span class="description">{{repo.description}}</span>
        <div>
          <span>{{repo.language}}</span>
          <div class="stars">
            <i class="far fa-star"></i>
            <span>{{repo.stargazers_count}}</span>
          </div>
        </div>
      </a>
    </dir>
  </div>
</template>

<script>
export default {
  name: "Repos",
  props: ["repos"]
};
</script>

<style scoped>
a {
  color: #000;
  text-decoration: none;
  transition: 100ms ease-in;
}

a:hover {
  color: #4b6675;
  text-decoration: none;
}

.container {
  padding: 0 20px;
}

.repo-card {
  font-size: 25px;
  display: grid;
  grid-template-rows: 30px 60px 30px;
  padding: 10px;
  border-bottom: solid 1px #bbb;
}

.name {
  font-weight: 600;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
}

.stars {
  float: right;
}
.stars i {
  margin-right: 10px;
}
</style>