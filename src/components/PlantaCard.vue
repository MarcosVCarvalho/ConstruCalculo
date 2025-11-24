<!-- PlantaCard.vue -->
<template>
  <div class="card bg-base-100 shadow-xl h-full flex flex-col">
    <figure class="h-48 overflow-hidden">
      <img :src="planta.imagemUrl" alt="Planta" class="object-cover w-full h-full" />
    </figure>
    <div class="card-body flex-grow">
      <h2 class="card-title">{{ planta.nome }}</h2>
      <p class="text-sm text-gray-600">{{ planta.descricao }}</p>
      <div class="mt-2 text-sm">
        <span class="badge badge-primary">{{ planta.tipo }}</span>
        <span class="ml-2">📏 {{ planta.areaConstruida }}m²</span>
      </div>
      <div class="mt-2 text-xs text-gray-500">
        {{ planta.especificacoes.quartos }} quartos • 
        {{ planta.especificacoes.banheiros }} banheiros • 
        {{ planta.especificacoes.pavimentos }} pavimento(s)
      </div>
    </div>

    <!-- Ações (só se editable=true) -->
    <div v-if="editable" class="card-actions justify-end px-4 py-3 border-t">
      <button 
        @click="$emit('editar', planta)" 
        class="btn btn-sm btn-ghost"
        title="Editar"
      >
        ✏️
      </button>
      <button 
        @click="$emit('excluir', planta)" 
        class="btn btn-sm btn-ghost text-error"
        title="Excluir"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  planta: { type: Object, required: true },
  editable: { type: Boolean, default: false }
})

defineEmits(['editar', 'excluir'])
</script>