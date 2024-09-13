<template>
  <div class="container border-bottom">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            v-if="!isAuthenticated"
            to="/"
            class="nav-link"
            active-class="active"
            aria-current="page"
          >
            Login
          </router-link>
          <button v-else class="btn btn-outline-primary text-black me-2" @click="logout">
            Logout
          </button>
        </li>
        <li class="nav-item">
          <router-link to="/home" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/AddBook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/BookList" class="nav-link" active-class="active">Books</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const store = useStore()
const router = useRouter()
const auth = getAuth()

const isAuthenticated = computed(() => store.state.isAuthenticated)

const logout = async () => {
  try {
    await signOut(auth)
    console.log('signed out successfully')
    store.commit('setAuthentication', false)
    console.log(auth.currentUser)
    router.push({ path: '/' })
  } catch (error) {
    console.error('Sign out error:', error)
  }
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
  font-size: 1rem;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
}
</style>
