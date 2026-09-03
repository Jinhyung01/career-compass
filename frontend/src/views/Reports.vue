<script setup>
import { computed, ref } from 'vue'
import { reports } from '../data/reports.js'
import CompanyLogo from '../components/CompanyLogo.vue'
import { companies } from '../data/companies.js'

// 진단 리포트 모아보기. #/report → 이 목록, #/report/:id → 리포트 본문.
const query = ref('')
const domainOf = name => companies.find(c => c.companyName === name)?.domain || ''

const list = computed(() =>
  [...reports]
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
    .filter(r => {
      const q = query.value.trim().toLowerCase()
      return q === '' || (r.meta.companyName + r.meta.positionName + r.meta.code).toLowerCase().includes(q)
    })
)

const latest = computed(() => list.value[0] || reports[0])
const best = computed(() => reports.reduce((a, b) => (b.overall.fitScore > a.overall.fitScore ? b : a)))
const weakest = r => r.skills.reduce((a, b) => (b.value < a.value ? b : a))
</script>

<template>
  <div class="pad wrap">
    <header class="reveal">
      <p class="eyebrow">REPORT ARCHIVE</p>
      <h1 class="page-title">리포트</h1>
      <p class="page-desc">진단할 때마다 리포트가 한 건씩 쌓입니다. 점수보다 어떤 항목이 바뀌었는지를 보세요.</p>
    </header>

    <div class="summary card-dark stagger">
      <div>
        <p class="cap">누적 리포트</p>
        <p class="v num">{{ reports.length }}<em>건</em></p>
      </div>
      <div>
        <p class="cap">최근 진단</p>
        <p class="v sm">{{ latest.meta.companyName }}</p>
        <p class="note num">{{ latest.meta.date }} · {{ latest.overall.fitScore }}점</p>
      </div>
      <div>
        <p class="cap">가장 높은 점수</p>
        <p class="v num">{{ best.overall.fitScore }}<em>점</em></p>
        <p class="note">{{ best.meta.companyName }} {{ best.meta.positionName }}</p>
      </div>
      <a class="go" href="#/profile">
        <p class="cap">새 진단</p>
        <p class="v2">컨설팅 시작</p>
        <p class="note2">프로필 입력부터 시작합니다.</p>
      </a>
    </div>

    <form class="search reveal" @submit.prevent>
      <input v-model="query" class="field" placeholder="기업명, 직무, 리포트 번호로 검색" />
      <button class="btn btn-dark btn-pill">검색</button>
    </form>

    <div v-if="list.length" class="rows stagger">
      <a v-for="r in list" :key="r.id" class="row" :href="'#/report/' + r.id">
        <CompanyLogo :name="r.meta.companyName" :domain="domainOf(r.meta.companyName)" :size="46" />

        <div class="body">
          <p class="who num">{{ r.meta.companyName }} · {{ r.meta.code }} · {{ r.meta.date }}</p>
          <h2>{{ r.meta.positionName }}</h2>
          <p class="head">{{ r.headline }}</p>
          <p class="weak">
            가장 낮은 항목 — <b>{{ weakest(r).name }}</b> <span class="num">{{ weakest(r).value }}</span>
            · 추천 프로젝트 <span class="num">{{ r.recommendedProjects.length }}건</span>
          </p>
        </div>

        <div class="score">
          <b class="num">{{ r.overall.fitScore }}</b>
          <span class="grade">{{ r.overall.grade }}등급</span>
        </div>
      </a>
    </div>
    <p v-else class="empty">검색 조건에 맞는 리포트가 없습니다.</p>
  </div>
</template>

<style scoped>
.wrap { padding-top: clamp(36px, 4.5vw, 64px); padding-bottom: 100px; }

.summary { display: flex; flex-wrap: wrap; margin-top: 34px; border-radius: var(--r-lg); overflow: hidden; }
.summary > * { flex: 1 1 210px; padding: 26px 28px; }
.summary > * + * { border-left: 1px solid #2D302E; }
.cap { font-size: 12px; font-weight: 700; color: #A1A1A6; margin: 0; }
.v { font-size: 32px; font-weight: 800; margin: 10px 0 0; letter-spacing: -0.045em; color: #F5F5F7; }
.v.sm { font-size: 22px; letter-spacing: -0.035em; }
.v em { font-style: normal; font-size: 14px; color: #A1A1A6; margin-left: 5px; }
.note { font-size: 12px; color: #8A8D8A; margin: 10px 0 0; }
.go { display: block; background: var(--mint); border-left-color: var(--mint) !important; }
.go .cap { color: #0A0A0A; }
.v2 { font-size: 22px; font-weight: 800; color: #0A0A0A; margin: 10px 0 0; letter-spacing: -0.035em; }
.note2 { font-size: 12px; color: #1A1A1A; margin: 10px 0 0; }

.search { display: flex; gap: 10px; margin: 34px 0 24px; }
.search .field { flex: 1; height: 54px; border-radius: 999px; padding: 0 26px; }
.search .btn { height: 54px; padding: 0 32px; font-size: 15px; }

.rows { display: flex; flex-direction: column; gap: 10px; }
.row {
  display: flex; align-items: flex-start; gap: 20px;
  padding: 24px 26px;
  border: 1px solid var(--line); border-radius: var(--r-lg);
  transition:
    transform var(--t-base) var(--spring-soft),
    border-color var(--t-base) var(--ease),
    box-shadow var(--t-base) var(--ease);
}
.row:hover { transform: translateX(4px); border-color: var(--line-2); box-shadow: 0 14px 34px rgba(11, 13, 12, 0.08); }

.body { flex: 1; min-width: 0; }
.who { font-size: 12px; color: var(--g3); margin: 0; }
.row h2 { font-size: 19px; font-weight: 800; letter-spacing: -0.03em; margin: 6px 0 0; }
.head { font-size: 14px; line-height: 1.65; color: var(--g1); margin: 10px 0 0; }
.weak { font-size: 12px; color: var(--g3); margin: 12px 0 0; }
.weak b { color: var(--ink); font-weight: 700; }

.score { flex: none; text-align: right; }
.score b { display: block; font-size: 30px; font-weight: 800; letter-spacing: -0.045em; }
.grade {
  display: inline-flex; align-items: center; height: 24px; padding: 0 10px;
  border-radius: 999px; background: var(--mist); color: var(--g1);
  font-size: 11px; font-weight: 700; margin-top: 6px;
}

.empty {
  padding: 40px 32px; background: var(--mist); border-radius: var(--r);
  font-size: 15px; color: var(--g1);
}

@media (max-width: 820px) {
  .summary > * { flex-basis: 100%; }
  .summary > * + * { border-left: 0; border-top: 1px solid #2D302E; }
  .go { border-left: 0 !important; }
  .row { flex-wrap: wrap; gap: 14px 18px; }
  .row:hover { transform: none; }
  .score { text-align: left; }
}
</style>
