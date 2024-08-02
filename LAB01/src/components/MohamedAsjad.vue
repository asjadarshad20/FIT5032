<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="Mohamed">
    <h1 class="Red">{{ msg }}</h1>
    <h3>
      ^ The new component 
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 550;
  font-size: 3 rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.5rem;
}

.Mohamed h1,
.Mohamed h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .Mohamed h1,
  .Mohamed h3 {
    text-align: left;
  }
}
</style>
