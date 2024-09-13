<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import store from '@/store'

const auth = getAuth()

const router = useRouter()
const handleLogin = () => {
  signInWithEmailAndPassword(auth, formData.value.username, formData.value.password)
    .then(() => {
      store.commit('setAuthentication', true)
      console.log('Firebase Sign in Successful!')
      router.push('/about')
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.error(error.code)
    })
}
const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: '',
  password: ''
})

// const validateName = (blur) => {
//   if (formData.value.username !== 'Mohamed' || formData.value.password !== 'Asjad123@') {
//     if (blur) errors.value.username = 'Incorrect Username and/or Password'
//     errors.value.password = 'Incorrect Username and/or Password'
//   } else {
//     errors.value.username = null
//     errors.value.password = null
//   }
// }

const submitForm = () => {
  handleLogin()
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4 offset-4">
        <h1 class="col text-center">Login</h1>
        <div class="col"></div>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col">
              <label for="username" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
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
