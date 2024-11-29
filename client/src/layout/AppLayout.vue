<script setup>
import AppHeader from './AppHeader.vue';
</script>

<template>
  <div class="layout-wrapper">
    <app-header />
    <div class="layout-main">
      <div class="layout-main-container">
        <router-view />
      </div>
    </div>
  </div>
  <Toast />
</template>