<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style scoped lang="scss">
input {
  border: solid 1px black !important;
  padding: 5px 10px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  appearance: textfield;
}
</style>