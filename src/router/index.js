import Vue from 'vue'
import VueRouter from 'vue-router'
import VListar from '../views/VLista.vue'
import VCadastro from '../views/VCadastro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Listar',
    component: VListar
  },
  {
    path: '/cadastrar',
    name: 'Cadastro',
    component: VCadastro
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
