<template>
  <div id="app">
    <h1>Book Count API</h1>
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
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-fl7562lhkq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error.message || 'Error fetching data'
        this.jsondata = null
      }
    }
  }
}
</script>
