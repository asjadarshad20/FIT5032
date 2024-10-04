<template>
  <div id="app">
    <h1>Get Books API</h1>
    <div v-if="jsondata">
      <pre>{{ jsondata }}</pre>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  mounted() {
    this.getBooksAPI()
  },
  methods: {
    async getBooksAPI() {
      try {
        const response = await axios.get('https://listbooks-fl7562lhkq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = error.message || 'Error fetching data'
        this.jsondata = null
      }
    }
  }
}
</script>
