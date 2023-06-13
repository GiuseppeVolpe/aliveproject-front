import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from '@/components/LoginComponent'
import EnvironmentSelectionComponent from '@/components/EnvironmentSelectionComponent'
import EnvironmentSpace from '@/components/EnvironmentSpace'
import ModelsComponent from '@/components/ModelsComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/env_selection',
    name: 'env_selection',
    component: EnvironmentSelectionComponent
  },
  {
    path: '/env_space',
    name: 'env_space',
    component: EnvironmentSpace
  },
  {
    path: '/models',
    name: 'models',
    component: ModelsComponent
  },
]

const router = new VueRouter({
  //mode : 'history'.
  routes
})

export default router
