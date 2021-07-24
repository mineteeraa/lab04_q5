import { createRouter, createWebHistory } from 'vue-router'
import PassengerList from '../views/PassengerList.vue'
import About from '../views/About.vue'
import Layout from '@/views/details/Layout.vue'
import PassengerDetails from '@/views/details/PassengerDetails.vue'
import AirlineDetails from '@/views/details/AirlineDetails.vue'

const routes = [
  {
    path: '/',
    name: 'PassengerList',
    component: PassengerList,
    props: (route) => ({ page: parseInt(route.query.page) || 0, size: parseInt(route.query.size) || 10 })
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/passenger/:id',
    name: 'Layout',
    props: true,
    component: Layout,
    children: [
      {
        path: '',
        name: 'PassengerDetails',
        component: PassengerDetails
      },
      {
        path: 'airlinedetails',
        name: 'AirlineDetails',
        props: true,
        component: AirlineDetails
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
