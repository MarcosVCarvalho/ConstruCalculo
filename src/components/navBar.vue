<template>
  <Menubar :model="items" style="background: gray">
    <template #start>
      <Image
        src="https://app.cajutec.com.br/assets/cajutec-color.cb5c64a4.png"
        alt="Image"
        width="20"
      />
    </template>
  </Menubar>
</template>

<script setup>
import Menubar from "primevue/menubar";
import Image from "primevue/image";
import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Agendas",
    icon: "pi pi-search",
    items: [
      {
        label: "Calendário",
        icon: "pi pi-bolt",
      },
      {
        label: "Datas comemorativas",
        icon: "pi pi-server",
      },
      {
        label: "Feriados",
        icon: "pi pi-pencil",
      },
    ],
  },
  {
    label: "Contato",
    icon: "pi pi-envelope",
  },
]);
</script>

<style lang="scss" scoped></style>
