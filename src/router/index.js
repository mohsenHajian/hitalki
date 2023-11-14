import { createRouter, createWebHistory } from 'vue-router'
import TimeTable from '../views/TimeTable.vue'
import UserTimeTable from '../views/UserTimeTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TimeTable
    },
    {
      path: '/UserTimeTable',
      name: 'UserTimeTable',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UserTimeTable
    }
  ]
})

export default router
