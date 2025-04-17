import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  async function fetchUser() {
    try {
      const response = await fetch('/api/user')
      const data = await response.json()
      user.value = data
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const isLoggedIn = computed(() => user.value !== null)

  return {
    user,
    isLoggedIn,
    fetchUser,
  }
})
