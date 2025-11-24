import { createRouter, createWebHistory } from 'vue-router'
import PainelObra from '@/views/PainelObra.vue'
import Login from '@/views/Login.vue'
import PlantaEditor from '@/views/PlantaEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      redirect: () => {
        const isLogged = localStorage.getItem('token')
        return isLogged ? '/Ínicio' : '/login'
      }
    },
    

    // Login (única rota sem auth)
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Ínicio',
      name: 'home',
      component: () => import('@/views/dashboard.vue'),
      meta: { requiresAuth: true }
    },
    
    // Obras (protegido)
    {
      path: '/obras',
      name: 'obras',
      component: PainelObra,
      meta: { requiresAuth: true }
    },

    // Plantas (protegido)
    {
      path: '/plantas',
      name: 'plantas',
      component: PlantaEditor,
       meta: { requiresAuth: true }
    },

    // Materiais (protegido)
    {
      path: '/materiais',
       meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'materiais.index',
          component: () => import('../views/materiais/index.vue')
        },
        {
          path: ':id/show',
          name: 'materiais.show',
          component: () => import('../views/materiais/show.vue')
        },
        {
          path: 'add',
          name: 'materiais.add',
          component: () => import('../views/materiais/add.vue')
        },
        {
          path: ':id/edit',
          name: 'materiais.edit',
          component: () => import('@/views/materiais/edit.vue')
        }
      ]
    }
  ]
})

/* ---------------------------
   🔐 Proteção global das rotas
-----------------------------*/
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLogged) {
    return next('/login')
  }

  // Se já estiver logado, não pode voltar ao login
  if (to.path === '/login' && isLogged) {
    return next('/')
  }

  next()
})

export default router
