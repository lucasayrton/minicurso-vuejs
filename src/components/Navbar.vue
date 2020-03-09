<template>
  <div id="nav">
    <a v-for="(item, key) in menu" v-bind:key="key">
      <router-link :to="item.to">{{ item.title }}</router-link>
    </a>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    menu: [
      { title: "Aluno", to: "/aluno" },
      { title: "Curso", to: "/curso" },
      { title: "Matricular", to: "/matricular" }
    ]
  })
};
</script>

<style lang="scss">
#nav {
  background-color: #35495e;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: bold;
    color: #41b883;
    padding: 0 15px 0 15px;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
      background-color: #41b883;
      border-radius: 3px;
      width: 100%;
    }
  }
}
</style>
