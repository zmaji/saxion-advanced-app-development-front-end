import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PartyIndex from '../views/party/PartyIndex.vue';
import ShowParty from '../views/party/ShowParty.vue';
import CreateParty from '@/views/party/CreateParty.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/parties'
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
  },
  {
    path: '/parties/create',
    name: 'Create Party',
    component: CreateParty
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
