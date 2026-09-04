<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// GPT 세션 목록 스타일. 스티키 없이 본문과 같이 스크롤되고,
// '전체 기록 보기'를 누르면 접혀 있던 이전 세션이 펼쳐진다.
// matched: 'company' 는 기업이, 'role' 은 직무가 진단 결과와 매치된 세션이다.
// 표기 위치는 Figma clipboard 32 의 사이드바를 따른다.
// id 는 src/data/reports.js 의 리포트와 1:1 로 이어진다 — 눌러서 그 회차를 열람할 수 있다.
const sessions = [
  { id: 'r1', company: 'SK Hynix', role: 'AI Engineer', date: '2026.09.03' },
  { id: 'r2', company: 'SK Hynix', role: '양산 기술', date: '2026.08.08', matched: 'role' },
  { id: 'r4', company: '포스코 퓨쳐엠', role: '반도체 · DX', date: '2026.08.01', matched: 'company' },
  { id: 'r5', company: '카카오페이', role: 'Backend Engineer', date: '2026.07.22', fold: true },
  { id: 'r6', company: '무신사', role: 'Data Analyst', date: '2026.07.14', fold: true }
]

const current = ref(location.hash.split('/')[2] || '')
const sync = () => { current.value = location.hash.split('/')[2] || '' }
onMounted(() => window.addEventListener('hashchange', sync))
onUnmounted(() => window.removeEventListener('hashchange', sync))

const open = ref(false)
</script>

<template>
  <aside class="side">
    <p class="cap">진단 기록</p>

    <nav class="list">
      <a
        v-for="s in sessions"
        v-show="open || !s.fold"
        :key="s.id"
        class="item"
        :class="{ on: current === s.id }"
        :href="'#/report/' + s.id"
      >
        <strong><span v-if="s.matched === 'company'" class="matched">(매치됨)</span>{{ s.company }}</strong>
        <span class="role"><span v-if="s.matched === 'role'" class="matched">(매치됨)</span>{{ s.role }}</span>
        <span class="date num">{{ s.date }}</span>
      </a>
    </nav>

    <button class="more" :aria-expanded="open" @click="open = !open">
      {{ open ? '기록 접기' : '전체 기록 보기' }}
      <i :class="{ up: open }" aria-hidden="true"></i>
    </button>
  </aside>
</template>

<style scoped>
.side {
  flex: 0 0 268px;
  border-right: 1px solid var(--line);
  padding: 44px 20px 40px 0;
}
.cap { font-size: 12px; font-weight: 700; color: var(--g4); margin: 0 0 12px; padding-left: 14px; }

.list { display: flex; flex-direction: column; gap: 2px; }
.item {
  display: block;
  padding: 12px 14px;
  border-radius: var(--r-sm);
  transition: background var(--t-base) var(--ease);
}
.item:hover { background: var(--mist); }
.item.on { background: var(--mint-bg); }
.item strong {
  display: block;
  font-size: 14px; font-weight: 700; letter-spacing: -0.025em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.matched { color: var(--mint-d); font-weight: 800; margin-right: 4px; }
.item .role { display: block; font-size: 12px; color: var(--g3); margin-top: 3px; }
.item .date { display: block; font-size: 11px; color: var(--g5); margin-top: 3px; }

.more {
  display: flex; align-items: center; gap: 7px;
  margin-top: 10px; padding: 10px 14px;
  width: 100%;
  background: none; border: 0; border-radius: var(--r-sm);
  font-size: 13px; font-weight: 700; color: var(--g2);
  transition: background var(--t-base) var(--ease), color var(--t-base) var(--ease);
}
.more:hover { background: var(--mist); color: var(--ink); }
.more i {
  width: 6px; height: 6px;
  border-right: 1.6px solid currentColor; border-bottom: 1.6px solid currentColor;
  transform: rotate(45deg) translate(-1px, -1px);
  transition: transform var(--t-base) var(--ease);
}
.more i.up { transform: rotate(-135deg) translate(-1px, -1px); }

@media (max-width: 1100px) {
  .side {
    flex: 1 1 100%;
    border-right: 0; border-bottom: 1px solid var(--line);
    padding: 24px 0;
  }
  .list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
  .item { flex: 0 1 210px; }
  .more { width: auto; }
}
</style>
