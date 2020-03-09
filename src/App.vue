<template>
  <v-app>
    <v-app-bar app color="#35495e">
      <Navbar />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default Vue.extend({
  name: "App",

  components: {
    Navbar,
    Footer
  }
});
</script>
