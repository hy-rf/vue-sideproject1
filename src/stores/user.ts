import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type User from '@/types/User.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  async function fetchUser() {
    try {
      const response = await fetch('/api/me')
      const data = (await response.json()) as User
      user.value = data
    } catch {
      user.value = {
        id: 0,
        name: 'test',
      }
    }
  }

  const isLoggedIn = computed(() => user.value !== null)

  return {
    user,
    isLoggedIn,
    fetchUser,
  }
})
