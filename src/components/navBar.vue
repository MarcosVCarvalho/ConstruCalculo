<template>
</template>

<script setup>
const props = defineProps({
  estaAberto: {
    type: Boolean,
    require: true,
  },
});

const emit = defineEmits(["update:estaAberto"]);

function toggleSidebar() {
  emit("update:estaAberto", !props.estaAberto);
}
</script>

<style lang="scss" scoped></style>
