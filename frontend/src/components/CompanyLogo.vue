<script setup>
import { computed, ref } from 'vue'

// 실제 도메인이 있는 기업은 파비콘을, 없거나 로드에 실패하면 로고풍 모노그램을 쓴다.
// 모노그램은 이름 해시로 그라데이션·이니셜·포인트 마크를 정하므로 같은 기업은 항상 같은 모양이 나온다.
// ponytail: 파비콘 CDN 한 줄. 고해상도 자산이 필요해지면 로고 파일을 직접 받아 둔다.
const props = defineProps({
  name: { type: String, required: true },
  domain: { type: String, default: '' },
  size: { type: Number, default: 52 }
})

// 매트 톤 그라데이션 조합 8종
const palette = [
  ['#16324F', '#2E6BA8'], ['#1F4536', '#3E9C6E'], ['#3E2A57', '#7A54A8'], ['#5C3819', '#B8763E'],
  ['#1F3238', '#4C7C8C'], ['#4A2333', '#A85A78'], ['#2C3B12', '#6B8E3A'], ['#2E2450', '#6B54A8']
]
// 포인트 마크 4종 — 이니셜과 겹치지 않게 모서리에만 얹는다
const marks = ['ring', 'dot', 'tick', 'bar']

const hash = computed(() => {
  let h = 0
  for (const ch of props.name) h = (h * 31 + ch.codePointAt(0)) >>> 0
  return h
})
const brand = computed(() => palette[hash.value % palette.length])
const mark = computed(() => marks[Math.floor(hash.value / palette.length) % marks.length])

// "SK AX"처럼 공백으로 나뉜 이름은 이니셜 2개, 한 단어 기업명은 1글자만 쓴다
const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return props.name.slice(0, 1)
})

const failed = ref(!props.domain)
</script>

<template>
  <span
    class="clogo"
    :style="{ width: size + 'px', height: size + 'px' }"
    :aria-label="name"
  >
    <img
      v-if="!failed"
      :src="`https://www.google.com/s2/favicons?domain=${domain}&sz=128`"
      :alt="name"
      loading="lazy"
      @error="failed = true"
    />
    <svg v-else viewBox="0 0 48 48" role="img" :aria-label="name">
      <defs>
        <linearGradient :id="`g-${hash}`" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" :stop-color="brand[0]" />
          <stop offset="1" :stop-color="brand[1]" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" :fill="`url(#g-${hash})`" />

      <text
        x="21" y="27" text-anchor="middle" dominant-baseline="central"
        fill="#fff" :font-size="initials.length > 1 ? 15 : 19" font-weight="800" letter-spacing="-0.5"
        font-family="Pretendard, -apple-system, sans-serif"
      >{{ initials }}</text>

      <!-- 포인트 마크 -->
      <circle v-if="mark === 'ring'" cx="37" cy="11" r="5" fill="none" stroke="#fff" stroke-width="2" opacity="0.85" />
      <circle v-else-if="mark === 'dot'" cx="38" cy="10" r="4" fill="#fff" opacity="0.9" />
      <path v-else-if="mark === 'tick'" d="M31 17 L41 7" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.85" />
      <rect v-else x="30" y="8" width="12" height="4" rx="2" fill="#fff" opacity="0.85" />
    </svg>
  </span>
</template>

<style scoped>
.clogo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border-radius: 13px;
  background: #fff;
  border: 1px solid var(--line);
  overflow: hidden;
}
img { width: 62%; height: 62%; object-fit: contain; }
svg { width: 100%; height: 100%; display: block; }
</style>
