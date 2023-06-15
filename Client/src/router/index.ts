import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import CreateAccountView from "../views/CreateAccountView.vue";
import AdminView from "../views/AdminView.vue";
import Layout from "../views/Layout.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: "/admin",
          name: "admin page",
          component: AdminView,
        },
        // {
        //   path: '/',
        //   name: 'home',
        //   component: HomeView,
        //   meta: {index: true}
        // },
        // {
        //   path: '/createaccountview',
        //   name: 'createaccount',
        //   component: CreateAccountView,
        //   //beforeEnter: createAccountLoader,
        // },
        // {
        //   path: '/startview',
        //   name: 'startview',
        //   component: StartView,
        //   //beforeEnter: startViewLoader,
        // },
      ]
    },
  ]
})

export default router
