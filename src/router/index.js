import Vue from 'vue'
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue";
import ExamPage from '../components/ExamPage.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: "/exam",
    name: "exam",
    component: ExamPage,
    props: true
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  
];

const router = new VueRouter({
  routes,
  mode: 'history'
})
// const router = createRouter({
//   mode: process.env.IS_ELECTRON ? 'hash' : 'history',
//   history: createWebHistory(),
//   routes,
// });

export default router;