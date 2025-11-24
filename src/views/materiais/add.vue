<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Material</h2>

    <form @submit.prevent="saveMaterial" class="space-y-6">
      <!-- Nome -->
      <div>
        <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Material</label>
        <input
          type="text"
          id="nome"
          v-model="form.nome"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <!-- Categoria -->
      <div>
        <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          id="categoria"
          v-model="form.categoria"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Selecione...</option>
          <option value="tijolo">Tijolo</option>
          <option value="telha">Telha</option>
          <option value="concreto">Concreto</option>
          <option value="pintura">Pintura</option>
          <option value="reboco">Reboco</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <!-- Quantidade -->
      <div>
        <label for="quantidade" class="block text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="text"
          id="quantidade"
          v-model="form.quantidade"
          required
          placeholder="Ex: 5000 Unidades ou 2000 Sacos x 50kg"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <!-- Descrição -->
      <div>
        <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="descricao"
          v-model="form.descricao"
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Imagem (opcional) -->
      <div>
        <label for="imagem" class="block text-sm font-medium text-gray-700">URL da Imagem (opcional)</label>
        <input
          type="url"
          id="imagem"
          v-model="form.imagem"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-3 pt-4">
        <router-link
          to="/materiais"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </router-link>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Salvar Material
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import MaterialService from '@/services/MaterialService';

export default {
  name: 'MaterialAdd',
  data() {
    return {
      form: {
        nome: '',
        categoria: '',
        quantidade: '',
        descricao: '',
        imagem: ''
      }
    };
  },
  methods: {
    async saveMaterial() {
      try {
        await MaterialService.create(this.form);
        this.$router.push('/materiais');
      } catch (error) {
        alert('Erro ao salvar material. Verifique os dados.');
      }
    }
  }
}
</script>