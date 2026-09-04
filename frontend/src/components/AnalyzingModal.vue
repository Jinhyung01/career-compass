<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 기획서 핵심 흐름의 [분석 진행 중] 단계.
// 별도 라우트가 아니라 컨설팅 화면 위에 뜨는 팝업이다.
// 실제로는 api.waitForReport 가 2초 간격으로 폴링한다 — 여기서는 그 단계를 그대로 보여준다.
const props = defineProps({ company: { type: String, default: '' }, role: { type: String, default: '' } })
const emit = defineEmits(['done'])

const steps = [
  { label: '프로필 정리', note: '입력한 학력·경력·자격증·프로젝트를 항목으로 나눕니다', ms: 1400 },
  { label: '현직자 인터뷰 검색', note: '해당 기업 현직자 인터뷰를 불러옵니다', ms: 2200 },
  { label: '항목별 대조', note: '요구 수준과 내 수준을 역량 단위로 맞춰봅니다', ms: 2600 },
  { label: '리포트 작성', note: '강점·부족한 역량·보완할 점을 순서대로 정리합니다', ms: 2000 }
]

const current = ref(0)
const elapsed = ref(0)
let timers = []
let ticker

onMounted(() => {
  let acc = 0
  steps.forEach((s, i) => {
    acc += s.ms
    timers.push(setTimeout(() => { current.value = i + 1 }, acc))
  })
  timers.push(setTimeout(() => emit('done'), acc + 900))
  ticker = setInterval(() => { elapsed.value += 1 }, 1000)
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
  clearInterval(ticker)
})
</script>

<template>
  <!-- main 의 page-in 애니메이션이 fixed 의 컨테이닝 블록이 되므로 body 로 내보낸다 -->
  <Teleport to="body">
  <div class="modal-scrim dark" role="dialog" aria-modal="true" aria-labelledby="an-title">
    <div class="modal-box panel">
      <p class="cap">{{ [company, role].filter(Boolean).join(' · ') }}</p>
      <h2 id="an-title">적합도를 분석하고 있습니다</h2>
      <p class="sub">현직자 인터뷰와 입력한 프로필을 항목별로 대조하는 중입니다.</p>

      <ol class="steps">
        <li
          v-for="(s, i) in steps"
          :key="s.label"
          :class="{ done: i < current, now: i === current }"
        >
          <span class="dot">
            <svg viewBox="0 0 20 20" class="check" aria-hidden="true">
              <path d="M5 10.4l3.2 3.2L15 6.8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="text">
            <b>{{ s.label }}</b>
            <em>{{ s.note }}</em>
          </span>
          <span class="state">{{ i < current ? '완료' : i === current ? '진행 중' : '대기' }}</span>
        </li>
      </ol>

      <div class="foot">
        <div class="bar on-mint grown" :style="{ '--w': (current / steps.length) * 100 + '%' }"><i></i></div>
        <p class="time num">{{ elapsed }}초 경과 · {{ current }} / {{ steps.length }} 단계</p>
      </div>

      <p class="leave">이 창을 닫아도 분석은 계속됩니다. 결과는 마이페이지에 저장됩니다.</p>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
.panel {
  max-width: 620px;
  background: var(--ink-2);
  color: #F0F2F0;
  padding: 40px 40px 34px;
}
.cap { font-size: 12px; font-weight: 700; color: var(--mint); margin: 0; }
h2 { font-size: 22px; font-weight: 800; line-height: 1.35; margin: 14px 0 0; letter-spacing: -0.03em; color: #fff; }
.sub { font-size: 14px; line-height: 1.7; color: #C9CCC9; margin: 12px 0 30px; }

.steps { list-style: none; margin: 0; padding: 0; }
.steps li {
  display: flex; align-items: center; gap: 16px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.45;
  transition: opacity var(--t-emph) var(--ease);
}
.steps li.done, .steps li.now { opacity: 1; }

.dot {
  width: 28px; height: 28px; flex: none;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.22);
  display: flex; align-items: center; justify-content: center;
  color: var(--ink);
  transition: background var(--t-base) var(--ease), border-color var(--t-base) var(--ease), transform var(--t-base) var(--spring);
}
.check { width: 17px; height: 17px; opacity: 0; transition: opacity var(--t-micro) var(--ease); }
.check path { stroke-dasharray: 22; stroke-dashoffset: 22; }
.done .dot { background: var(--mint); border-color: var(--mint); transform: scale(1.06); }
.done .check { opacity: 1; }
.done .check path { animation: draw 0.42s var(--ease) forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.now .dot { border-color: var(--mint); animation: pulse 1.4s var(--ease) infinite; }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 255, 156, 0.5); }
  70% { box-shadow: 0 0 0 12px rgba(56, 255, 156, 0); }
}

.text { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.text b { font-size: 15px; font-weight: 700; color: #F0F2F0; }
.text em { font-style: normal; font-size: 13px; color: #8A8D8A; }
.state { font-size: 12px; font-weight: 700; color: #767976; }
.now .state { color: var(--mint); }
.done .state { color: #A1A1A6; }

.foot { margin-top: 30px; }
.foot .bar { background: rgba(255, 255, 255, 0.14); }
.time { font-size: 12px; color: #8A8D8A; margin: 13px 0 0; }
.leave { font-size: 12px; color: #767976; margin: 24px 0 0; text-align: center; }

@media (max-width: 640px) {
  .panel { padding: 28px 22px 26px; }
  .state { display: none; }
}
</style>
