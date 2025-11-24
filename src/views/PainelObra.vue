<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- Main -->
    <main class="flex-1 p-4">
      <header class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold">Painel de Obras</h2>
          <p class="text-sm text-gray-500">Gerencie múltiplas obras, status, materiais e progresso.</p>
        </div>
        <div class="flex items-center gap-3">
          <input v-model="query" @input="debouncedSearch" placeholder="Buscar obra, cliente, cidade..." class="border rounded px-3 py-2 w-72" />
          <select v-model="filterStatus" class="border rounded px-3 py-2">
            <option value="">Todos os status</option>
            <option value="planejada">Planejada</option>
            <option value="em-andamento">Em andamento</option>
            <option value="paralisada">Paralisada</option>
            <option value="concluida">Concluída</option>
          </select>
          <button @click="openCreate" class="bg-blue-600 text-white px-4 py-2 rounded shadow">+ Nova Obra</button>
        </div>
      </header>


      <section v-if="view==='obras'">
        <!-- List + controls -->
        <div class="mb-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">Mostrando {{ filtered.length }} de {{ obras.length }} obras</div>
          <div class="flex items-center gap-2">
            <button @click="exportCSV" class="border px-3 py-1 rounded text-sm">Exportar CSV</button>
            <button @click="bulkDelete" :disabled="!selected.length" class="border px-3 py-1 rounded text-sm text-red-600">Excluir selecionadas</button>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="obra in paginated" :key="obra.id" class="bg-white p-4 rounded shadow relative">
            <input type="checkbox" v-model="selected" :value="obra.id" class="absolute top-3 right-3" />
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <h4 class="font-semibold text-lg">{{ obra.title }}</h4>
                <div class="text-sm text-gray-500">{{ obra.client }} — {{ obra.city }}</div>
                <div class="mt-3 flex items-center gap-3">
                  <div class="text-xs">Status:</div>
                  <div :class="statusClass(obra.status)" class="text-xs px-2 py-1 rounded">{{ labelStatus(obra.status) }}</div>
                  <div class="ml-auto text-sm">Progresso: {{ obra.progress }}%</div>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded mt-3 overflow-hidden">
                  <div :style="{ width: obra.progress + '%' }" class="h-2 rounded"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex gap-2">
              <button @click="openEdit(obra)" class="border px-3 py-1 rounded text-sm">Editar</button>
              <button @click="openDetails(obra)" class="border px-3 py-1 rounded text-sm">Detalhes</button>
              <button @click="deleteObra(obra.id)" class="border px-3 py-1 rounded text-sm text-red-600">Excluir</button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500">Página {{ page }} / {{ totalPages }}</div>
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="page===1" class="px-3 py-1 border rounded">Anterior</button>
            <button @click="nextPage" :disabled="page===totalPages" class="px-3 py-1 border rounded">Próxima</button>
          </div>
        </div>
      </section>

      <section v-if="view==='relatorios'">
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold mb-2">Relatórios</h3>
          <p class="text-sm text-gray-600">Relatórios rápidos locais: exporte CSV e aplique filtros para analisar suas obras.</p>
        </div>
      </section>

    </main>

    <!-- Modal: Create / Edit -->
    <transition name="fade">
      <div v-if="modalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-2xl p-6 rounded shadow">
          <h3 class="text-lg font-semibold mb-4">{{ editMode ? 'Editar Obra' : 'Nova Obra' }}</h3>
          <form @submit.prevent="saveObra">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input v-model="form.title" placeholder="Título da obra" class="border px-3 py-2 rounded" required />
              <input v-model="form.client" placeholder="Cliente" class="border px-3 py-2 rounded" />
              <input v-model="form.city" placeholder="Cidade" class="border px-3 py-2 rounded" />
              <select v-model="form.status" class="border px-3 py-2 rounded">
                <option value="planejada">Planejada</option>
                <option value="em-andamento">Em andamento</option>
                <option value="paralisada">Paralisada</option>
                <option value="concluida">Concluída</option>
              </select>
              <input type="number" v-model.number="form.progress" min="0" max="100" class="border px-3 py-2 rounded" placeholder="Progresso (%)" />
              <input v-model="form.startDate" type="date" class="border px-3 py-2 rounded" />
            </div>

            <div class="mt-4 flex justify-end gap-2">
              <button type="button" @click="closeModal" class="px-4 py-2 border rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Drawer: Details -->
    <transition name="slide">
      <aside v-if="detailOpen" class="fixed right-0 top-0 h-full w-96 bg-white border-l p-4 z-40">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-lg">{{ detail.title }}</h3>
            <div class="text-xs text-gray-500">{{ detail.client }} — {{ detail.city }}</div>
          </div>
          <button @click="closeDetails" class="text-gray-500">Fechar</button>
        </div>

        <div class="mt-4">
          <p class="text-sm"><strong>Status:</strong> {{ labelStatus(detail.status) }}</p>
          <p class="text-sm"><strong>Progresso:</strong> {{ detail.progress }}%</p>
          <p class="text-sm"><strong>Início:</strong> {{ detail.startDate || '—' }}</p>
          <p class="text-sm mt-2"><strong>Observações:</strong></p>
          <p class="text-xs text-gray-600 mt-1">{{ detail.notes || 'Nenhuma observação registrada.' }}</p>
        </div>

        <div class="mt-6">
          <h4 class="font-semibold">Materiais (simples)</h4>
          <ul class="mt-2 text-sm divide-y">
            <li v-for="(m,i) in detail.materials || []" :key="i" class="py-2 flex justify-between">
              <div>{{ m.name }} — {{ m.quantity }}</div>
              <div class="text-gray-500">{{ m.unit }}</div>
            </li>
            <li v-if="!(detail.materials && detail.materials.length)" class="py-2 text-gray-500">Sem materiais.</li>
          </ul>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useObras } from '@/composable/useObras'

const { obras, updateObra, deleteObra, addObra } = useObras()


// --- Local state ---
const view = ref('obras')
// use the 'obras' ref provided by the composable (do not redeclare)
const page = ref(1)
const perPage = ref(9)
const query = ref('')
const filterStatus = ref('')
const selected = ref([])
const modalOpen = ref(false)
const editMode = ref(false)
const detailOpen = ref(false)
const detail = reactive({})

const form = reactive({
  id: null,
  title: '',
  client: '',
  city: '',
  status: 'planejada',
  progress: 0,
  startDate: '',
  materials: [],
  notes: '',
})

// --- Utilities ---
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7)

function navClass(name){
  return view.value===name ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
}

function labelStatus(s){
  const map = { 'planejada':'Planejada', 'em-andamento':'Em andamento', 'paralisada':'Paralisada', 'concluida':'Concluída' }
  return map[s] || s
}

function statusClass(s){
  if(s==='em-andamento') return 'bg-green-100 text-green-800'
  if(s==='concluida') return 'bg-blue-100 text-blue-800'
  if(s==='paralisada') return 'bg-yellow-100 text-yellow-800'
  return 'bg-gray-100 text-gray-800'
}

function formatDate(ts){
  if(!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleString()
}

// --- CRUD ---
function openCreate(){
  editMode.value = false
  Object.assign(form, { id: null, title:'', client:'', city:'', status:'planejada', progress:0, startDate:'', materials:[], notes:'' })
  modalOpen.value = true
}

function openEdit(o){
  editMode.value = true
  Object.assign(form, JSON.parse(JSON.stringify(o)))
  modalOpen.value = true
}

function saveObra(){
  if(editMode.value){
    const idx = obras.value.findIndex(x => x.id===form.id)
    if(idx!==-1){
      obras.value[idx] = { ...form, updatedAt: new Date().toISOString() }
    }
  } else {
    const newObra = { ...form, id: uid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    obras.value.unshift(newObra)
  }
  persist()
  modalOpen.value = false
}



function bulkDelete(){
  if(!selected.value.length) return
  if(!confirm(`Excluir ${selected.value.length} obras selecionadas?`)) return
  obras.value = obras.value.filter(o => !selected.value.includes(o.id))
  selected.value = []
  persist()
}

function openDetails(o){
  Object.assign(detail, o)
  detailOpen.value = true
}

function closeDetails(){ detailOpen.value = false }
function closeModal(){ modalOpen.value = false }

// --- Persistence localStorage ---
const STORAGE_KEY = 'painel-obras-v1'
function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obras.value)) }
function load(){
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw){
    try{ obras.value = JSON.parse(raw) }catch(e){ obras.value = [] }
  } else {
    // seed example data
    obras.value = [
      { id: uid(), title: 'Reforma Residencial - Rua A', client: 'Família Silva', city: 'Fortaleza', status: 'em-andamento', progress: 45, startDate: '2025-09-01', materials: [{name:'Cimento',quantity:100,unit:'sacos'}], notes:'Execução parcial.', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() },
      { id: uid(), title: 'Ampliação Galpão', client: 'Indústria X', city: 'Caucaia', status: 'planejada', progress: 0, startDate:'', materials:[], notes:'Aguardando orçamento.', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() },
      { id: uid(), title: 'Pavimentação Rua B', client: 'Prefeitura', city: 'Fortaleza', status: 'concluida', progress: 100, startDate:'2024-05-10', materials:[], notes:'Concluído sem pendências.', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() },
    ]
    persist()
  }
}

onMounted(()=> load())
const plantaSalva = sessionStorage.getItem('plantaSelecionada')
  if (plantaSalva) {
    const planta = JSON.parse(plantaSalva)
    
    // Converte planta → obra inicial
    const obraModel = planta.toObraModel()
    obras.value = {
      ...obraModel,
      nomeObra: planta.nome,
      plantaId: planta.id
    }

    // Limpa após uso
    sessionStorage.removeItem('plantaSelecionada')
}

const filtered = computed(()=>{
  let arr = obras.value.slice()
  if(filterStatus.value) arr = arr.filter(o => o.status===filterStatus.value)
  if(query.value) {
    const q = query.value.toLowerCase()
    arr = arr.filter(o => [o.title, o.client, o.city].join(' ').toLowerCase().includes(q))
  }
  return arr
})

const totalPages = computed(()=> Math.max(1, Math.ceil(filtered.value.length / perPage.value)))
const paginated = computed(()=>{
  const start = (page.value-1)*perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

function prevPage(){ if(page.value>1) page.value-- }
function nextPage(){ if(page.value<totalPages.value) page.value++ }

watch([filtered], ()=>{ if(page.value>totalPages.value) page.value = totalPages.value })

// --- helpers ---
function countByStatus(s){ return obras.value.filter(o => o.status===s).length }

const latestModified = computed(()=> [...obras.value].sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0,6))

// --- search debounce ---
let debounceTimer = null
function debouncedSearch(){
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(()=>{ page.value = 1 }, 250)
}

// --- CSV export ---
function exportCSV(){
  const rows = [ ['ID','Título','Cliente','Cidade','Status','Progresso','Início','Atualizado em'] ]
  for(const o of filtered.value){ rows.push([o.id,o.title,o.client,o.city,o.status,o.progress,o.startDate || '', o.updatedAt || '']) }
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'obras-export.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style>
/* Small transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .15s }
.fade-enter-from, .fade-leave-to { opacity: 0 }

.slide-enter-active { transition: transform .2s ease-out }
.slide-enter-from { transform: translateX(100%) }
.slide-leave-to { transform: translateX(100%) }
</style>
