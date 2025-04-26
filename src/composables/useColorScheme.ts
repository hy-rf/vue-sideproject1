// composables/useColorScheme.js
import { ref, onMounted, onUnmounted } from 'vue'

const colorScheme = ref('light')

export function useColorScheme() {
  const updateColorScheme = (e: MediaQueryListEvent) => {
    colorScheme.value = e.matches ? 'dark' : 'light'
  }

  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    colorScheme.value = mediaQuery.matches ? 'dark' : 'light'
    mediaQuery.addEventListener('change', updateColorScheme)
  })

  onUnmounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.removeEventListener('change', updateColorScheme)
  })

  return {
    colorScheme,
  }
}
