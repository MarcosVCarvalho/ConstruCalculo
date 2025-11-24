
import { ref, computed } from 'vue'

const obras = ref([])

const obrasAtivas = computed(() => obras.value.filter(o => o.status === 'em-andamento').length)
const obrasConcluidas = computed(() => obras.value.filter(o => o.status === 'concluida').length)
const obrasPlanejadas = computed(() => obras.value.filter(o => o.status === 'planejada').length)
const progressoMedio = computed(() => {
  if (obras.value.length === 0) return 0
  const soma = obras.value.reduce((acc, o) => acc + o.progress, 0)
  return Math.round(soma / obras.value.length)
})

function addObra(obra) {
  obra.id = Date.now()
  obras.value.push(obra)
}

function updateObra(id, data) {
  const i = obras.value.findIndex(o => o.id === id)
  if (i >= 0) obras.value[i] = { ...obras.value[i], ...data }
}

function deleteObra(id){
  if(!confirm('Excluir obra?')) return
  obras.value = obras.value.filter(o => o.id!==id)
  persist()
}

export function useObras() {
  return {
    obras,
    obrasAtivas,
    obrasConcluidas,
    obrasPlanejadas,
    progressoMedio,
    addObra,
    updateObra,
    deleteObra,
  }
}
