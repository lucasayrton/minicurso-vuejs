import Vue from "vue";
import Vuetify from "vuetify";
import pt from "vuetify/src/locale/pt";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: "pt"
  },
  icons: {
    iconfont: "fa"
  }
});
