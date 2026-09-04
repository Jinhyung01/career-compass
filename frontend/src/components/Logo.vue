<script setup>
// Jobpill = Job + 수필(隨筆)
// 원고지 한 칸과, 그 칸을 넘어 뻗는 한 획.
// 플랫·매트: 그라데이션·광택·글로우 없이 단색 면과 직선 획만 쓴다.
defineProps({ size: { type: Number, default: 28 }, dark: Boolean })
</script>

<template>
  <span class="logo" :class="{ dark }">
    <svg :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true">
      <!-- 원고지 칸 -->
      <rect x="2" y="6" width="20" height="20" rx="5" :fill="dark ? '#EDEFED' : '#141715'" />
      <!-- 칸을 넘어 뻗는 한 획 -->
      <rect x="9" y="14.4" width="21" height="3.2" rx="1.6" :fill="dark ? '#38FF9C' : '#178E5C'" />
    </svg>
    <span class="type">Job<em>pill</em></span>
  </span>
</template>

<style scoped>
.logo { display: inline-flex; align-items: center; gap: 8px; }
.type {
  font-size: 1.58em;
  font-weight: 700;
  letter-spacing: -0.045em;
  color: var(--ink);
  line-height: 1;
}
.logo.dark .type { color: #EDEFED; }
em { font-style: normal; color: var(--g2); }
.logo.dark em { color: var(--g6); }
</style>
