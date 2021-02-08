import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'
import Music from 'views/Music.vue'
import Hey from 'views/Hey.vue'
import Center from 'views/Center.vue'

import RecommendPerDay from 'views/pages/RecommendPerDay'
import RadioRecommend from 'views/pages/RadioRecommend'

// import MusicPlayer from 'views/common/MusicPlayer.vue'

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
      },
      {
        path: '/recommendperday',
        name: 'RecommendPerDay',
        component: RecommendPerDay
      },
      {
        path: '/radiorecommend',
        name: 'RadioRecommend',
        component: RadioRecommend
      }
    ]
  },
  
  /**
   * 暂时先将 musicplayer 当成组件使用，不当页面
  */
  // {
  //   path: '/musicplayer/:id',
  //   name: 'MusicPlayer',
  //   component: MusicPlayer,
  //   // keepAlive:true
  // },
  // 当以上任意请求都不符合的时候，跳转至首页
  // {
  //   path: ' * ',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
