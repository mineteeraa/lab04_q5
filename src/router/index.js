import { createRouter, createWebHistory } from 'vue-router'
import PassengerList from '../views/PassengerList.vue'
import About from '../views/About.vue'
import Layout from '@/views/details/Layout.vue'
import PassengerDetails from '@/views/details/PassengerDetails.vue'
import AirlineDetails from '@/views/details/AirlineDetails.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import EditPassengerDetails from '@/views/details/EditPassengerDetails.vue'
import NProgress from 'nprogress'
import PassengerService from '@/services/PassengerService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'PassengerList',
    component: PassengerList,
    props: (route) => ({ page: parseInt(route.query.page) || 0, size: parseInt(route.query.size) || 5 })
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
    beforeEnter: (to) => {
      return PassengerService.getEvent(to.params.id)
        .then((response) => {
          GStore.passenger = response.data // <--- Store the event
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
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
      },
      {
        path: 'editpassengerdetails',
        name: 'EditPassengerDetails',
        props: true,
        component: EditPassengerDetails
      }
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
