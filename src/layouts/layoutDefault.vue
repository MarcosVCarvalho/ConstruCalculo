<template>
  <div>
    <nav-bar />
  </div>
  <div style="display: flex">
    <div>
      <div class="card flex justify-center">
        <Menu :model="items" />
      </div>
    </div>
    <div><RouterView /></div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import navBar from "@/components/navBar.vue";
import Menu from "primevue/menu";

import { ref } from "vue";

const items = ref([
  { label: "New", icon: "pi pi-plus" },
  { label: "Search", icon: "pi pi-search" },
]);
</script>

<style lang="scss" scoped></style>
