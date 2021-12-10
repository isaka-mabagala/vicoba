import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterBackButton from 'vue-router-back-button'
import Home from '../views/Home.vue'
import Member from '../views/Member.vue'
import MemberRecord from '../views/MemberRecord.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/member',
    name: 'member',
    component: Member
  },
  {
    path: '/member-record/:index',
    name: 'member-record',
    component: MemberRecord
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouterBackButton, { router })

export default router
