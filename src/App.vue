<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from './stores/user'
const userStore = useUserStore()
const user = userStore.user
const isLoggedIn = userStore.isLoggedIn
onMounted(() => {
  userStore.fetchUser()
})
const login = async () => {
  await userStore.fetchUser()
}

const logout = () => {
  userStore.user = null
}
</script>

<template>
  <header>
    <div id="user-info" v-if="isLoggedIn">
      <p>Hello, {{ user ? user.username : 'guest' }}!</p>
      <p v-for="(role, index) in user?.roles" :key="index">{{ role }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <button @click="login">Login</button>
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/import">Import csv</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  width: 15rem;
  left: 0;
}
.wrapper > nav {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
nav > a {
  color: var(--color-text);
}

#user-info {
  padding: 10px;
}
</style>
