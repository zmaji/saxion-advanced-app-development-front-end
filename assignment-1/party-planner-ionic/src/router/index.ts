import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PartyIndex from '../views/party/PartyIndex.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/parties'
  },
  {
    path: '/parties',
    name: 'Parties',
    component: PartyIndex
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
