import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/aluno"
  },
  {
    path: "/aluno",
    name: "Aluno",
    component: () => import("../views/Aluno.vue")
  },
  {
    path: "/curso",
    name: "Curso",
    component: () => import("../views/Curso.vue")
  },
  {
    path: "/matricular",
    name: "Matricular",
    component: () => import("../views/Matricular.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
