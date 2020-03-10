<template>
  <v-app>
    <Loader :is-visible="isLoading" />
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
import axios from "axios";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";

export default Vue.extend({
  name: "App",

  components: {
    Navbar,
    Footer,
    Loader
  },

  data: () => ({
    isLoading: false,
    axiosInterceptor: 0
  }),

  mounted() {
    this.enableInterceptor();
  },

  methods: {
    enableInterceptor() {
      this.axiosInterceptor = axios.interceptors.request.use(
        config => {
          this.isLoading = true;
          return config;
        },
        error => {
          this.isLoading = false;
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        response => {
          this.isLoading = false;
          return response;
        },
        error => {
          this.isLoading = false;
          return Promise.reject(error);
        }
      );
    },

    disableInterceptor() {
      axios.interceptors.request.eject(this.axiosInterceptor);
    }
  }
});
</script>
