import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import CreateAccountView from "../views/CreateAccountView.vue";
import StartView from "../views/StartView.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createaccountview',
      name: 'createaccount',
      component: CreateAccountView
    },
    {
      path: '/startview',
      name: 'startview',
      component: StartView
    },
  ]
})

export default router
