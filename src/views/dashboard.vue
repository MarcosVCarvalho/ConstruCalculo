<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-2">Ínicio</h2>
    <p class="text-gray-600 mb-6">Resumo das suas obras.</p>

    <!-- Cards -->
    <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div class="bg-white shadow p-4 rounded-lg">
        <h4 class="text-sm text-gray-600">Em andamento</h4>
        <p class="text-2xl font-semibold text-blue-600">{{ obrasAtivas }}</p>
      </div>
      <div class="bg-white shadow p-4 rounded-lg">
        <h4 class="text-sm text-gray-600">Concluídas</h4>
        <p class="text-2xl font-semibold text-green-600">{{ obrasConcluidas }}</p>
      </div>
      <div class="bg-white shadow p-4 rounded-lg">
        <h4 class="text-sm text-gray-600">Planejadas</h4>
        <p class="text-2xl font-semibold text-yellow-600">{{ obrasPlanejadas }}</p>
      </div>
      <div class="bg-white shadow p-4 rounded-lg">
        <h4 class="text-sm text-gray-600">Progresso médio</h4>
        <p class="text-2xl font-semibold text-indigo-600">{{ progressoMedio }}%</p>
      </div>
    </div>

    <!-- Lista resumida -->
    <h3 class="text-lg font-semibold mb-3">Minhas Obras</h3>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="obra in obras"
        :key="obra.id"
        class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-lg">{{ obra.title }}</h4>
            <p class="text-sm text-gray-500">{{ obra.client }} — {{ obra.city }}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
            {{ obra.status }}
          </span>
        </div>

        <div class="mt-3">
          <div class="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div :style="{ width: obra.progress + '%' }" class="bg-blue-500 h-2"></div>
          </div>
          <p class="text-xs text-gray-600 mt-1">Progresso: {{ obra.progress }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useObras } from '@/composable/useObras'
const { obras, obrasAtivas, obrasConcluidas, obrasPlanejadas, progressoMedio } = useObras()
</script>
