import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PartyIndex from '../views/party/PartyIndex.vue';
import ShowParty from '../views/party/ShowParty.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/parties',
    name: 'Parties',
    component: PartyIndex
  },
  {
    path: '/party',
    name: 'party',
    component: ShowParty
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
