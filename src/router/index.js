import { createRouter, createWebHistory } from 'vue-router'
import TimeTable from '../views/TimeTable.vue'
<<<<<<< HEAD
=======
import UserTimeTable from '../views/UserTimeTable.vue'
>>>>>>> user-time-table-logic

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TimeTable
<<<<<<< HEAD
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
=======
    },
    {
      path: '/UserTimeTable',
      name: 'UserTimeTable',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UserTimeTable
    }
>>>>>>> user-time-table-logic
  ]
})

export default router
