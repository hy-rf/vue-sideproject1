<script lang="ts" setup>
import { ref } from 'vue'
const fileContent = ref<string | null>(null)
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      fileContent.value = reader.result as string
      console.log('CSV Content:', fileContent.value)
    }
    reader.readAsText(file)
  }
}
</script>

<template>
  <div>
    <h1>import csv file:</h1>
    <label for="avatar"
      >Choose a file
      <input type="file" accept=".csv" @change="handleFileUpload" />
    </label>
    <div v-if="fileContent">
      <h2>File Content:</h2>
      <pre>{{ fileContent }}</pre>
    </div>
  </div>
</template>

<style></style>
