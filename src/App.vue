<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BHeader from './components/BHeader.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>
  <!-- <div>
    <JSON />
  </div> -->
  <router-view></router-view>
</template>
