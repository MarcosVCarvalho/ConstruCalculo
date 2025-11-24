<template>
   <div v-if="obra" class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
  <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
    <span class="mr-2">✏️</span>
    Editar Material <span class="font-mono ml-1 text-blue-600">#{{ obra.id }}</span>
  </h2>

  <form @submit.prevent="atualizar" class="space-y-5">
    <!-- Grid responsivo: 2 colunas em md+, 1 em telas menores -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Altura -->
      <div>
        <label for="altura" class="block text-sm font-medium text-gray-700 mb-1">
          Altura (m)
        </label>
        <input
          id="altura"
          v-model.number="obra.altura"
          type="number"
          step="0.01"
          min="0"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <!-- Largura -->
      <div>
        <label for="largura" class="block text-sm font-medium text-gray-700 mb-1">
          Largura (m)
        </label>
        <input
          id="largura"
          v-model.number="obra.largura"
          type="number"
          step="0.01"
          min="0"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <!-- Comprimento -->
      <div>
        <label for="comprimento" class="block text-sm font-medium text-gray-700 mb-1">
          Comprimento (m)
        </label>
        <input
          id="comprimento"
          v-model.number="obra.comprimento"
          type="number"
          step="0.01"
          min="0"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <!-- Custo por m³ -->
      <div>
        <label for="custo" class="block text-sm font-medium text-gray-700 mb-1">
          Custo por m³ (R$)
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
          <input
            id="custo"
            v-model.number="obra.custoPorMetroCubico"
            type="number"
            step="0.01"
            min="0"
            class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>
    </div>

    <!-- Botão de ação -->
    <div class="pt-4">
      <button
        type="submit"
        class="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
      >
        <span>💾 Salvar Alterações</span>
      </button>
    </div>
  </form>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ObraController from '@/Controller/ObraController.js'

export default {
  name: 'materiais.edit',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const obra = ref(null)

    onMounted(() => {
      obra.value = JSON.parse(JSON.stringify(ObraController.findById(route.params.id)))
    })

    const atualizar = () => {
      const atualizada = ObraController.atualizar(obra.value)
      alert('Atualizada! Custo: R$ ' + atualizada.custo)
      router.push('/obras')
    }

    return {
      obra,
      atualizar,
      ObraController
    }
  }
}
</script>

<style lang="scss" scoped></style>
