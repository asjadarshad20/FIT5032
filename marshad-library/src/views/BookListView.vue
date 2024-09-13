<template>
  <h1 class="text-center">Books List</h1>

  <div class="filter-section mb-3">
    <label for="maxIsbn">Max ISBN Value:</label>
    <InputText v-model="maxIsbn" id="maxIsbn" class="ml-2" />
    <button class="btn btn-primary ml-2" @click="filterBooks">Filter</button>
  </div>

  <!-- Max ISBN Filter Section -->

  <!-- Books Table -->
  <DataTable
    :value="books"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
    :pt="{
      table: { style: 'min-width: 50rem' },
      column: {
        bodycell: ({ state }) => ({
          class: [{ 'pt-0 pb-0': state['d_editing'] }]
        })
      }
    }"
  >
    <Column field="isbn" header="ISBN" style="width: 25%">
      <template #body="{ data, field }">
        <span v-if="editingRow !== data">{{ data.isbn }}</span>
        <InputText v-else v-model="data.isbn" />
      </template>
    </Column>

    <Column field="name" header="Name" style="width: 25%">
      <template #body="{ data, field }">
        <span v-if="editingRow !== data">{{ data.name }}</span>
        <InputText v-else v-model="data.name" />
      </template>
    </Column>

    <Column header="Edit">
      <template #body="{ data }">
        <button v-if="editingRow !== data" @click="editingRow = data">Edit</button>
        <button v-if="editingRow === data" @click="updateBook(data)">Save</button>
      </template>
    </Column>

    <Column header="Delete">
      <template #body="{ data }">
        <button class="btn btn-danger" @click="deleteBook(data.id)">Delete</button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import db from '../firebase.js'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const books = ref([])
const editingRow = ref(null)
const maxIsbn = ref(1000) // Ref value for max ISBN input

// Fetch books with the specified filter
const fetchBooks = async (isbnNum) => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '<', isbnNum), // Filter books by max ISBN
      orderBy('isbn'),
      limit(100)
    )
    const querySnapshot = await getDocs(q)
    books.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

// Filter books based on max ISBN value
const filterBooks = () => {
  fetchBooks(Number(maxIsbn.value)) // Fetch with the new max ISBN value
}

const updateBook = async (book) => {
  try {
    const bookRef = doc(db, 'books', book.id)
    await updateDoc(bookRef, {
      isbn: book.isbn,
      name: book.name
    })
    alert('Book updated successfully!')
    editingRow.value = null
    fetchBooks(maxIsbn.value) // Fetch again after updating
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

const deleteBook = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId)
    await deleteDoc(bookRef)
    alert('Book deleted successfully!')
    fetchBooks(maxIsbn.value) // Fetch again after deleting
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

onMounted(() => {
  fetchBooks(Number(maxIsbn.value)) // Fetch books initially
})
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: auto;
}
.filter-section {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
