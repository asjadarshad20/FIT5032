<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formData = ref({
  isbn: '',
  name: ''
})

const addBook = async () => {
  try {
    const isbnNum = Number(formData.value.isbn)
    if (isNaN(isbnNum)) {
      alert('ISBN must be a valid number')
      return
    }

    const response = await axios.post('https://addbook-fl7562lhkq-uc.a.run.app', {
      isbn: isbnNum,
      name: formData.value.name
    })

    if (response.status === 200) {
      alert(response.data)
      formData.value.name = ''
      formData.value.isbn = ''
    } else {
      alert('Failed to add the book: ' + response.data)
    }
  } catch (error) {
    console.error('Error adding book:', error)
    alert('An error occurred while adding the book.')
  }
}

const errors = ref({
  isbn: '',
  name: ''
})

const submitForm = () => {
  addBook()
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4 offset-4">
        <h1 class="col text-center">Add Book</h1>
        <div class="col"></div>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col">
              <label for="isbn" class="form-label">ISBN</label>
              <input required type="text" class="form-control" id="isbn" v-model="formData.isbn" />
            </div>
          </div>
          <div class="row mbn3">
            <div class="col">
              <label for="name" class="form-label">Name</label>
              <input required type="text" class="form-control" id="name" v-model="formData.name" />
              <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            </div>
          </div>
          <div class="text-center mt-2">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-valid {
  color: green;
}
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
