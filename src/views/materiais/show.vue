<template>
  <div v-if="obra">
    <h1>Detalhes da Obra #{{ obra.id }}</h1>
    <p>Tipo: {{ obra.tipo }}</p>
    <p>Área: {{ obra.area }} m²</p>
    <p>Volume: {{ obra.volume }} m³</p>
    <p>Custo estimado: R$ {{ obra.custo }}</p>

    <button @click="baixarPDF">Baixar PDF</button>
    <button @click="enviarWhats">Enviar via WhatsApp</button>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import ObraController from '@/Controller/ObraController.js'
import { useRoute } from 'vue-router'
import jsPDF from 'jspdf'

const route = useRoute()
const obra = ref(null)

onMounted(() => {
  obra.value = ObraController.buscar(route.params.id)
})

function baixarPDF() {
  const doc = new jsPDF()
  doc.text(`Relatório - Obra #${obra.value.id}`, 20, 20)
  doc.text(`Tipo: ${obra.value.tipo}`, 20, 30)
  doc.text(`Área: ${obra.value.area} m²`, 20, 40)
  doc.text(`Volume: ${obra.value.volume} m³`, 20, 50)
  doc.text(`Custo estimado: R$ ${obra.value.custo}`, 20, 60)
  doc.save(`Obra_${obra.value.id}.pdf`)
}

function enviarWhats() {
  const msg = encodeURIComponent(`Orçamento Construcálculo - Obra #${obra.value.id}\nCusto estimado: R$ ${obra.value.custo}`)
  window.open(`https://wa.me/?text=${msg}`, '_blank')
}

</script>

<style lang="scss" scoped></style>
