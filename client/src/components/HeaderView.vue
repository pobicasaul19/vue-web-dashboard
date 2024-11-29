<script setup lang="ts">
import { ref } from 'vue'
const darkMode = ref(false)
const toggleColorScheme = () => {
  const element = document.querySelector('html')
  if (darkMode.value) {
    element?.classList.toggle('my-app-dark')
  } else {
    element?.classList.remove('my-app-dark')
  }
}
</script>

<template>
  <header>
    <ToggleSwitch @change="toggleColorScheme" v-model="darkMode" :pt="{
      slider: 'my-toggle-slider',
    }" />
  </header>
</template>

<style scoped lang="scss">
.my-toggle-slider {
  background-color: #000 !important;
}
</style>
