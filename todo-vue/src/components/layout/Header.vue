<template>
  <header class="header">
    <h1>O que fazer?</h1>
    <div id="nav">
      <router-link to="/">Inicio</router-link>|
      <router-link to="/sobre">Sobre</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
</style>