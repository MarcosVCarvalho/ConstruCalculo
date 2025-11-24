<template>
    

    <div class="material-index">
    <h2 class="text-2xl font-bold">Meus Materiais</h2>
    <router-link to="/materiais/add" class="btn btn-primary transition Material">Adicionar Material</router-link>

    <div class="material-list">
      <div v-for="material in materiais" :key="material.id" class="material-card">
        <h3>{{ material.nome }}</h3>
        <p>Categoria: {{ material.categoria }}</p>
        <p>Preço: R$ {{ material.precoUnitario.toFixed(2) }} / {{ material.unidadeMedida }}</p>
        <div class="actions">
          <router-link :to="`/materiais/${material.id}/edit`" class="btn btn-sm btn-secondary">Editar</router-link>
          <button @click="deleteMaterial(material.id)" class="btn btn-sm btn-danger">Excluir</button>
        </div>
      </div>
    </div>
  </div>
  <main class="flex-1 overflow-y-auto p-6">
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 table">
            <!-- head -->
            
            <thead class="bg-gray">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Materiais
            </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantidade
            </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ação
            </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- row 1 -->
              <tr v-for="material in materiais" :key="material.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <input type="radio" class="mr-3" />
                <div class="flex-shrink-0 h-10 w-10">
                  <img v-if="material.imagem" :src="material.imagem" :alt="material.nome" class="h-10 w-10 rounded" />
                  <div v-else class="h-10 w-10 bg-gray-300 rounded flex items-center justify-center">
                    <i class="fas fa-box text-gray-600"></i>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ material.nome }}</div>
                  <div class="text-sm text-gray-500">{{ material.categoria }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ material.quantidade }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ material.descricao }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ material.actions }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button @click="calcular(material)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"> Calcular
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </main>
</template>

<script>
import MaterialService from '@/services/MaterialService';


export default {
  name: 'MaterialIndex',
  data() {
    return {
      materiais: [],
      
    };
  },
  async mounted() {
    this.materiais = await MaterialService.getAll();
  },
  methods: {
    async deleteMaterial(id) {
      if (confirm('Tem certeza que deseja excluir este material?')) {
        await MaterialService.delete(id);
        this.materiais = this.materiais.filter(m => m.id != id);
      }
    }
  }
}
</script>

<style scoped>
.material-index {
  padding: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.material-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.material-card {
  background: #fff;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.actions {
  margin-top: 15px;
  display: flex;
  gap: 8px;
}
</style>