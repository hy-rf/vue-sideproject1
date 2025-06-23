import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type UserProfile from '@/types/UserProfile'
import { API_BASE_URL } from '@/config/constants'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserProfile | null>(null)

  async function fetchUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/me`)
      const data = (await response.json()) as UserProfile
      user.value = data
    } catch {
      user.value = {
        username: 'guest',
        roles: [],
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
