<template>
  <div class="container">
    <form @submit="getUser" class="search-box">
      <input type="text" v-model="username" placeholder="Usuário..." class="search-input" />
      <button type="submit" value="Procurar" class="search-button">
        <i class="fab fa-github"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    getUser(e) {
      e.preventDefault();
      if (this.username == "") return;
      this.$emit("get-user", this.username);
    }
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  background: #4e5968;
  height: 70px;
}

.search-box {
  position: absolute;
  top: 5px;
  left: 5px;
  background: #2f3640;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
}

.search-box:hover > .search-input {
  width: 240px;
  padding: 0 6px;
}

.search-input:focus {
  width: 240px;
  padding: 0 6px;
}

.search-box:hover > .search-button {
  background: white;
  color: #2f3640;
}

.search-button {
  color: white;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2f3640;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  cursor: pointer;
}

.search-input {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}
</style>
