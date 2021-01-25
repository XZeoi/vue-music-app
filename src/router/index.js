import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'
import Music from 'views/Music.vue'
import Hey from 'views/Hey.vue'
import Center from 'views/Center.vue'

const MusicLibrary = () => import('views/home/MusicLibrary')
const Recommend = () => import('views/home/Recommend')
const Video = () => import('views/home/Video')
const Radio = () => import('views/home/Radio')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        redirect:'/home/recommend',
        name: 'Home',
        component: Home,
        children: [
          {path: 'musiclibrary', name:'MusicLibrary', component: MusicLibrary},
          {path: 'recommend', name:'Recommend', component: Recommend},
          {path: 'video', name:'Video', component: Video},
          {path: 'radio', name:'Radio', component: Radio}
        ]
      },
      {
        path: '/music',
        name: 'Music',
        component: Music
      },
      {
        path: '/hey',
        name: 'Hey',
        component: Hey
      },
      {
        path: '/center',
        name: 'Center',
        component: Center
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
