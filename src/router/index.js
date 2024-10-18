import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import store from '@/store'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import AddBookView from '@/views/AddBookView.vue'
import BookListView from '@/views/BookListView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetBooksAPI from '@/views/GetBooksAPI.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/BookList',
    name: 'BookList',
    component: BookListView
  },
  {
    path: '/BookCount',
    name: 'BookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherView',
    name: 'WeatherView',
    component: WeatherView
  },
 
    {
      path: '/CountBook',
      name: 'CountBook',
      component: CountBookAPI
    },
    {
      path: '/GetBooks',
      name: 'GetBooks',
      component: GetBooksAPI
    }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !store.state.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router