<template>
  
  <nav class="flex-1 overflow-y-auto py-4 px-3">
    
    <ul class="space-y-2">
      <li>
        <router-link to="/Ínicio" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-home mr-3"></i> Início
            </router-link>
          </li>
          <li>
            
            <router-link to="/perfil" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-user mr-3"></i> Meu Perfil
            </router-link>
          </li>
          <li>
            <router-link to="/orcamentos" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-chart-line mr-3"></i> Orçamentos
            </router-link>
          </li>
          <li>
            <router-link to="/plantas" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-drafting-compass mr-3"></i> Plantas
            </router-link>
          </li>
          <li>
            <router-link to="/listas" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-list mr-3"></i> Minhas Listas
            </router-link>
          </li>
          <li>
            <router-link to="/ferramentas" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-tools mr-3"></i> Ferramentas
            </router-link>
          </li>
          <li>
            <router-link to="/calculos" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-calculator mr-3"></i> Cálculos
            </router-link>
          </li>
          <li>
            <router-link to="/obras" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-building mr-3"></i> Obras
            </router-link>
          </li>
          <li>
            <router-link to="/configuracoes" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
              <i class="fas fa-cog mr-3"></i> Configurações
            </router-link>
          </li>
        </ul>
        
        <div class="mt-8 pt-4 border-t border-gray-200">
          <h3 class="text-xs uppercase text-gray-500 font-semibold px-4 mb-3">Materiais</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/materiais/colections" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
                <i class="far fa-folder mr-3"></i> Minhas Coleções
              </router-link>
            </li>
            <li>
              <router-link to="/materiais" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
                <i class="fas fa-box mr-3"></i> Meus Materiais
              </router-link>
            </li>
            <li>
              <router-link to="/materiais/add" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition">
                <i class="fas fa-plus mr-3"></i> Adicionar Material
              </router-link>
            </li>
          </ul>
        </div>
      </nav>


</template>

<script setup>
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
