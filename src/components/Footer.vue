<template>
  <v-footer dark padless>
    <v-card color="#35495e" class="flex" flat tile>
      <v-card-title class="bg">
        <strong class="subheading">Minhas redes sociais ;D</strong>
        <v-spacer></v-spacer>
        <v-btn v-for="item in icons" :key="item.link" class="mx-4" dark icon>
          <a
            :href="item.link"
            target="_blank"
            style="text-decoration: none; color: white"
            ><v-icon size="24px">{{ item.icon }}</v-icon></a
          >
        </v-btn>
      </v-card-title>

      <v-card-text class="white--text text-center footer">
        {{ new Date().getFullYear() }} — <strong>Lucas Ayrton</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "fab fa-linkedin",
        link: "https://www.linkedin.com/in/lucas-ayrton/"
      },
      { icon: "fab fa-github", link: "https://github.com/lucasayrton/" }
    ]
  })
};
</script>

<style lang="scss">
.footer {
  padding: 3px 0 3px 0 !important;
}

.bg {
  background-color: #41b883 !important;
  padding: 7px !important;
}
</style>
