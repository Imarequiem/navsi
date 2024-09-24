<template>
  <select :name="name" v-model="model">
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
defineProps({
  name: String,
})

const model = defineModel()
</script>

<style scoped lang="scss">
select {
  border: solid 1px black !important;
  appearance: auto !important;
}
</style>