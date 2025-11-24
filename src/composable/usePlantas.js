import { ref, computed } from 'vue'

// Chave para persistência no localStorage
const STORAGE_KEY = 'arq_plantas_v1'

// Estado reativo principal
const plantas = ref([])

// Carrega do localStorage ao inicializar (executa 1x)
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Garante que é array e tem estrutura mínima
      if (Array.isArray(parsed)) {
        plantas.value = parsed.map(p => ({
          id: p.id,
          nome: p.nome || '',
          descricao: p.descricao || '',
          tipo: p.tipo || 'residencial',
          areaConstruida: Number(p.areaConstruida) || 0,
          imagemUrl: p.imagemUrl || '',
          especificacoes: {
            quartos: Number(p.especificacoes?.quartos) || 0,
            banheiros: Number(p.especificacoes?.banheiros) || 1,
            vagas: Number(p.especificacoes?.vagas) || 0,
            pavimentos: Number(p.especificacoes?.pavimentos) || 1
          }
        }))
      }
    }
  } catch (e) {
    console.warn('⚠️ Falha ao carregar plantas do localStorage. Resetando.')
    plantas.value = []
    saveToStorage()
  }
}

// Persiste no localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plantas.value))
  } catch (e) {
    console.error('❌ Erro ao salvar plantas:', e)
  }
}

// Carrega dados uma vez (fora do composable, para não repetir)
if (typeof window !== 'undefined') {
  loadFromStorage()
}

// === Lógica de negócio ===

/**
 * Salva ou atualiza uma planta
 * @param {Object} planta - Objeto com todos os campos (id obrigatório para edição)
 */
const salvarPlanta = (planta) => {
  if (!planta || typeof planta !== 'object') {
    throw new Error('Planta inválida')
  }

  const id = planta.id
  if (id == null) {
    throw new Error('ID é obrigatório para salvar')
  }

  const index = plantas.value.findIndex(p => p.id === id)

  if (index >= 0) {
    // Atualiza
    plantas.value[index] = { ...planta }
  } else {
    // Insere nova
    plantas.value.push({ ...planta })
  }

  saveToStorage()
}

/**
 * Exclui uma planta pelo ID
 * @param {number|string} id
 */
const excluirPlanta = (id) => {
  if (id == null) return
  plantas.value = plantas.value.filter(p => p.id !== id)
  saveToStorage()
}

/**
 * Busca uma planta pelo ID (útil para edição)
 * @param {number|string} id
 * @returns {Object|null}
 */
const buscarPlantaPorId = (id) => {
  return plantas.value.find(p => p.id === id) || null
}

// Computed para contagem (opcional)
const totalPlantas = computed(() => plantas.value.length)
const plantasPorTipo = computed(() => {
  return plantas.value.reduce((acc, p) => {
    acc[p.tipo] = (acc[p.tipo] || 0) + 1
    return acc
  }, {})
})

// Exporta o composable
export function usePlantas() {
  return {
    // Estado
    plantas,
    totalPlantas,
    plantasPorTipo,

    // Métodos
    salvarPlanta,
    excluirPlanta,
    buscarPlantaPorId,

    // Utils (opcional)
    limparTodas: () => {
      plantas.value = []
      saveToStorage()
    }
  }
}