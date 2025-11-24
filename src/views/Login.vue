
<template>
  <div class="relative min-h-screen btn btn-info flex flex-col items-center justify-center overflow-hidden text-white font-sans p-4">
    <!-- Formas decorativas no fundo -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] ">
        <img src="../assets/images/logo.png" alt="logopng" width="900">
      
    </div>

    <!-- Conteúdo central -->
    <div class="text-center max-w-md w-full z-10">
      <h1 class="text-4xl font-bold text-black mb-2">Acessar conta.</h1>
      <p class="text-sm mb-6">Suas informações ficam salvas automaticamente</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Digite seu email para entrar"
          class="w-full px-6 py-3 text-gray-800 bg-white/90 border-4 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 placeholder:text-gray-600"
          required
        />
        <input
          v-model="senha"
          type="password"
          placeholder="Digite sua senha"
          class="w-full px-6 py-3 text-gray-800 bg-white/90 border-4 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black 
          focus:ring-opacity-50
          placeholder:text-gray-600"
          required
        />

        <button
          type="submit"
          class="w-full py-4 bg-[#5d1fd8] text-white font-semibold rounded-full hover:bg-[#4a19b0] active:scale-95 transition-all duration-200"
        >
          Entrar
        </button>
      </form>

      <div class="mt-8 space-y-3 text-sm">
        <p class="text-black">
          Ainda não tem uma conta?
          <a href="#" @click.prevent="navigateToSignup" class="underline text-white hover:text-orange-400">CRIAR UMA CONTA CONSTRUCÁLCULO</a>
        </p>
        
        <p class="text-black">
          Esqueceu sua senha?
          <a href="#" @click.prevent="recoverPassword" class="underline text-white hover:text-orange-400">RESTAURAR SENHA</a>
        </p>
        <p class="text-black">
          Problemas para acessar?
          <a href="#" @click.prevent="openHelp" class="underline text-white hover:text-orange-400">Clique aqui e informe</a>
        </p>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const email = ref('')
const senha = ref('')

const handleSubmit = async () => {
  const emailValue = email.value.trim()
  const passwordValue = senha.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailValue) {
    alert('Por favor, digite seu email.')
    return
  }

  if (!emailRegex.test(emailValue)) {
    alert('Por favor, insira um email válido.')
    return
  }

  if (!passwordValue) {
    alert('Por favor, insira sua senha.')
    return
  }

  try {

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', emailValue)
    localStorage.setItem('userSenha', passwordValue)
    localStorage.setItem('token', 'simulated_token_123')

    const redirectPath = route.query.redirect || '/obras'
    router.push(redirectPath)
  } catch (error) {
    console.error('Erro no login:', error)
    alert('Email ou senha incorretos.')
  }
}

const login = () => {
  if (email.value === 'admin@teste.com' && senha.value === '123456') {
    localStorage.setItem('token', 'logado')
    router.push('/obras')
  } else {
    alert('Email ou senha incorretos!')
  }
}
</script>
<style scoped></style>