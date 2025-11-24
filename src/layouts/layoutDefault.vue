<template>
  <!-- Layout principal -->
  
<div class="flex flex-1">
 
  
  
  <!-- Sidebar (Menu Lateral) -->
  <div class="w-64" v-show="sidebarAberto">
    <logo />
    <menu-lateral />
  </div>

  <!-- Conteúdo Principal -->
  <div class="flex flex-col flex-1 overflow-hidden">
    <nav-bar />
    
    
    <!-- Navbar Superior -->
    <div class="w-full flex items-center btn btn-info px-6 h-16 shadow ">
      <div class="flex-none">
          <!-- Botão para abrir/fechar o sidebar -->
          <button class="btn btn-square btn-ghost" @click="toggleSidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
   
      <img
        src="@/assets/images/iconeraio.png"
        alt="Banner"
        class="w-8 h-8 object-cover"
      />
      <a class="mx-4 text-xl font-light">Construcálculo</a>
      <div class="flex-1"></div>
     
        <div>
        <!-- Controle de Tema -->
        <label class="toggle text-base-content">
          <input type="checkbox" value="black" class="theme-controller" />
          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
        </label>
        <div class="avatar">
          <button class="btn btn-ghost btn-circle">
            <div class="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png" />
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- Área de Conteúdo (Rotas) -->
    <main class="flex-1 overflow-y-auto p-6">
      <RouterView />
    </main>
    
  <!-- Em React/Vue, você colocaria <Outlet /> ou <router-view> aqui -->
      
  </div>
</div>
</template>

<script setup>
import menuLateral from "@/components/menuLateral.vue";
import logo from "@/components/logo.vue";
import navBar from "@/components/navBar.vue";


import { onMounted, ref } from "vue";
import MaterialService from "@/services/MaterialService.js";
import { RouterView } from "vue-router";


const sidebarAberto = ref(true);
const materiais = ref([]);
const toggleSidebar = () => {
  sidebarAberto.value = !sidebarAberto.value;
};


onMounted(async () => {
  materiais.value = await MaterialService.getAll();
});

function calcular(material) {
  alert(`Calculando para: ${material.nome}`);
  
}


</script>

<style >

</style>
