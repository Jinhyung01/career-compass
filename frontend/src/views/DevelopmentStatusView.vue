<script setup>
import { onMounted, ref } from 'vue'
import { fetchBackendHealth } from '../api/health'

const status = ref('확인 중')

onMounted(async () => {
  try {
    const health = await fetchBackendHealth()
    status.value = health.status === 'UP' ? '정상' : health.status
  } catch {
    status.value = '연결 실패'
  }
})
</script>

<template>
  <main>
    <h1>잡필 개발환경</h1>
    <p>Backend 상태: {{ status }}</p>
  </main>
</template>
