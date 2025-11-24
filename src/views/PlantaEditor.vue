<template>
  <div class="p-6">
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">🏗️ Painel de Plantas</h1>
        <p class="text-gray-600">Gerencie suas plantas.</p>
      </div>
      <button 
        @click="irParaNovaPlanta" 
        class="btn btn-info gap-2"
      >
        <span>➕</span> Adicionar Nova Planta
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-4 mb-6">
      <select v-model="filtroTipo" class="select select-bordered w-48">
        <option value="">Todos os tipos</option>
        <option value="residencial">Residencial</option>
        <option value="comercial">Comercial</option>
        <option value="rural">Rural</option>
      </select>

      <input 
        v-model="filtroBusca" 
        type="text" 
        placeholder="Buscar por nome..." 
        class="input input-bordered w-64"
        @input="debouncedFilter"
      />
    </div>

    <!-- Grid de Plantas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <PlantaCard
        v-for="planta in plantasFiltradas"
        :key="planta.id"
        :planta="planta"
        :editable="true"
        @editar="irParaEditarPlanta"
        @excluir="confirmarExclusao"
      />
    </div>

    <div v-if="plantasFiltradas.length === 0" class="text-center py-12 text-gray-500">
      Nenhuma planta encontrada. Tente outro filtro.
    </div>

    <!-- Modal de confirmação de exclusão -->
    <dialog ref="modalExclusao" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-error">⚠️ Confirmar exclusão</h3>
        <p class="py-4">
          Tem certeza que deseja excluir permanentemente a planta 
          <strong>"{{ plantaParaExcluir?.nome }}"</strong>?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Cancelar</button>
            <button 
              @click="excluirPlanta(plantaParaExcluir?.id)" 
              class="btn btn-error"
            >
              Excluir
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlantaCard from '@/components/PlantaCard.vue'
import { Planta } from '@/models/Planta'

// Simulando repositório (em produção: use Pinia + API)
const plantas = ref([])
const filtroTipo = ref('')
const filtroBusca = ref('')
const router = useRouter()

// Modal refs
const modalExclusao = ref(null)
const plantaParaExcluir = ref(null)


onMounted(() => {
  
  const saved = localStorage.getItem('plantasArquitetura')
  if (saved) {
    const data = JSON.parse(saved)
    plantas.value = data.map(p => new Planta(p))
  } else {
    // Dados iniciais (só na 1ª vez)
    plantas.value = [
      new Planta({
        id: 1,
        nome: 'Casa Térrea Moderna',
        descricao: 'Planta otimizada para terrenos pequenos. 3 quartos, 2 banheiros.',
        areaConstruida: 85,
        tipo: 'residencial',
        imagemUrl: 'https://images.unsplash.com/photo-1600585154084-4e5b84895e52?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        especificacoes: { quartos: 3, banheiros: 2, vagas: 1, pavimentos: 1 }
      }),
      new Planta({
        id: 2,
        nome: 'Sobrado Compacto',
        descricao: 'Ideal para terrenos estreitos. Sala integrada, 2 suítes.',
        areaConstruida: 110,
        tipo: 'residencial',
        imagemUrl: 'https://images.unsplash.com/photo-1613975080066-f70575d11bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        especificacoes: { quartos: 2, banheiros: 2, vagas: 1, pavimentos: 2 }
      }),
      new Planta({
        id: 3,
        nome: 'Loja Comercial 60m²',
        descricao: 'Layout aberto com depósito e banheiro. Pronto para instalação elétrica.',
        areaConstruida: 60,
        tipo: 'comercial',
        imagemUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        especificacoes: { quartos: 0, banheiros: 1, vagas: 0, pavimentos: 1 }
      })
    ]
    salvarPlantas()
  }
})

// Filtragem (com debounce no input, se quiser — opcional)
const plantasFiltradas = computed(() => {
  return plantas.value.filter(p => {
    const matchTipo = !filtroTipo.value || p.tipo === filtroTipo.value
    const matchBusca = !filtroBusca.value || 
      p.nome.toLowerCase().includes(filtroBusca.value.toLowerCase()) ||
      p.descricao.toLowerCase().includes(filtroBusca.value.toLowerCase())
    return matchTipo && matchBusca
  })
})

// Salvar no localStorage (mock de persistência)
const salvarPlantas = () => {
  localStorage.setItem('plantasArquitetura', JSON.stringify(plantas.value))
}

// Rotas
const irParaNovaPlanta = () => {
  router.push({ name: 'plantas.nova' })
}

const irParaEditarPlanta = (planta) => {
  // Salva planta no sessionStorage ou passa via state
  sessionStorage.setItem('plantaEdicao', JSON.stringify(planta))
  router.push({ name: 'plantas.editar', params: { id: planta.id } })
}

// Exclusão
const confirmarExclusao = (planta) => {
  plantaParaExcluir.value = planta
  // Abre modal (usando HTML <dialog>)
  modalExclusao.value?.showModal()
}

const excluirPlanta = (id) => {
  if (id) {
    plantas.value = plantas.value.filter(p => p.id !== id)
    salvarPlantas()
    modalExclusao.value?.close()
    plantaParaExcluir.value = null
  }
}
</script>