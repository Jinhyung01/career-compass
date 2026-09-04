<script setup>
import { computed, ref, watch } from 'vue'
import { companies, totals } from '../data/companies.js'
import { matchByCompany } from '../data/reports.js'
import CompanyLogo from '../components/CompanyLogo.vue'

// 채용 공고 목록이 아니라, 현직자 인터뷰로 확보한 기업 정보다.
// DB 에 sector · area · fresh · primary 컬럼이 없으므로 필터 패널은 두지 않는다.
// match 점수는 진단을 실행한 기업에만 있다 — 나머지는 '진단 전'으로 둔다.
const sorts = [
  { key: 'recent', label: '최근 인터뷰순' },
  { key: 'people', label: '현직자 많은 순' },
  { key: 'diagnosed', label: '진단한 기업 먼저' }
]
const sort = ref('recent')

const matchOf = name => matchByCompany[name] || null
const query = ref('')
const PAGE = 24
const shown = ref(PAGE)

const order = {
  recent: (a, b) => b.interviewed.localeCompare(a.interviewed),
  people: (a, b) => b.people - a.people,
  diagnosed: (a, b) => (matchOf(b.companyName)?.score ?? -1) - (matchOf(a.companyName)?.score ?? -1)
}

const filtered = computed(() =>
  [...companies].sort(order[sort.value]).filter(c =>
    query.value.trim() === '' ||
    (c.companyName + c.role).toLowerCase().includes(query.value.trim().toLowerCase())
  )
)

const visible = computed(() => filtered.value.slice(0, shown.value))

watch([sort, query], () => { shown.value = PAGE })
</script>

<template>
  <div class="pad wrap">
    <header class="reveal">
      <p class="eyebrow">COMPANY HALL</p>
      <h1 class="page-title">기업 정보</h1>
      <p class="page-desc">
        채용 공고가 아니라 현직자 인터뷰로 확보한 기업 정보입니다. 진단 결과와 가까운 순서로 정렬했습니다.
      </p>
      <p class="src num">
        등록 기업 {{ totals.companies }}곳 ·
        인터뷰에 응해주신 현직자 {{ totals.insiders }}명 ·
        인사이트 {{ totals.insights.toLocaleString('ko-KR') }}건
      </p>
    </header>

    <form class="search reveal" @submit.prevent>
      <input v-model="query" class="field" placeholder="기업명, 직무를 검색하세요" />
      <button class="btn btn-dark btn-pill">검색</button>
    </form>

    <div class="list-head reveal">
      <strong class="num">{{ filtered.length }}곳</strong>
      <div class="sorts">
        <button
          v-for="o in sorts"
          :key="o.key"
          class="sort"
          :class="{ on: sort === o.key }"
          @click="sort = o.key"
        >{{ o.label }}</button>
      </div>
    </div>

    <div v-if="filtered.length" class="grid stagger">
      <a v-for="c in visible" :key="c.companyCode" class="co" :href="'#/company/' + c.companyCode">
        <div class="co-top">
          <CompanyLogo :name="c.companyName" :domain="c.domain" :size="46" />
          <span v-if="matchOf(c.companyName)" class="match num">{{ matchOf(c.companyName).score }}<em>match</em></span>
          <span v-else class="undiag">진단 전</span>
        </div>

        <p class="co-name">{{ c.companyName }}</p>
        <h3>{{ c.role }}</h3>

        <div v-if="matchOf(c.companyName)" class="gauge"><i :style="{ width: matchOf(c.companyName).score + '%' }"></i></div>
        <p v-else class="hint">진단하면 이 기업 기준 매치 점수가 표시됩니다.</p>

        <dl class="co-meta num">
          <div><dt>현직자</dt><dd>{{ c.people }}명</dd></div>
          <div><dt>인사이트</dt><dd>{{ c.insight }}건</dd></div>
          <div><dt>최근 조사</dt><dd>{{ c.interviewed }}</dd></div>
        </dl>
      </a>
    </div>
    <p v-else class="empty">
      조건에 맞는 기업이 없습니다. 다른 기업명이나 직무명으로 찾아보세요.
      아직 인터뷰하지 않은 기업이라면 요청을 남길 수 있습니다.
    </p>

    <button v-if="shown < filtered.length" class="btn btn-line btn-pill more" @click="shown += PAGE">
      더 보기 <b class="num">{{ filtered.length - shown }}</b>곳 남음
    </button>
  </div>
</template>

<style scoped>
.wrap { padding-top: clamp(36px, 4.5vw, 64px); padding-bottom: 100px; }
.src { font-size: 13px; color: var(--g4); margin: 16px 0 0; }
.search { display: flex; gap: 10px; margin: 32px 0 0; }
.search .field { flex: 1; height: 56px; border-radius: 999px; padding: 0 26px; }
.search .btn { height: 56px; padding: 0 34px; font-size: 15px; }

.list-head {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  border-bottom: 1px solid var(--line);
  padding: 30px 2px 14px;
  margin-bottom: 22px;
}
.list-head strong { font-size: 16px; font-weight: 800; }
.sorts { display: flex; gap: 4px; }
.sort {
  border: 0; background: none;
  padding: 7px 13px; border-radius: 999px;
  font-size: 13px; font-weight: 700; color: var(--g3);
  transition: background var(--t-base) var(--ease), color var(--t-base) var(--ease);
}
.sort:hover { background: var(--mist); color: var(--ink); }
.sort.on { background: var(--ink); color: #fff; }

/* 카드 그리드 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  gap: 14px;
}
.co {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 18px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  transition:
    transform var(--t-base) var(--spring-soft),
    border-color var(--t-base) var(--ease),
    box-shadow var(--t-base) var(--ease);
}
.co:hover {
  transform: translateY(-4px);
  border-color: var(--line-2);
  box-shadow: 0 18px 40px rgba(11, 13, 12, 0.09);
}

.co-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.match {
  display: flex; align-items: baseline; gap: 4px;
  font-size: 21px; font-weight: 800; letter-spacing: -0.04em; color: var(--mint-d);
}
.match em { font-style: normal; font-size: 10px; font-weight: 700; color: var(--g4); letter-spacing: 0; }
.undiag {
  display: inline-flex; align-items: center; height: 25px; padding: 0 11px;
  border-radius: 999px; background: var(--mist); color: var(--g3);
  font-size: 11px; font-weight: 700;
}

.co-name { font-size: 12px; font-weight: 700; color: var(--g3); margin: 20px 0 0; }
.co h3 {
  font-size: 17px; font-weight: 800; letter-spacing: -0.03em;
  margin: 6px 0 0; line-height: 1.4;
  min-height: 2.8em;
}

.gauge { height: 4px; border-radius: 999px; background: var(--line); overflow: hidden; margin: 16px 0 0; }
.gauge i { display: block; height: 100%; border-radius: 999px; background: var(--ink); }
.hint { font-size: 12px; line-height: 1.5; color: var(--g4); margin: 12px 0 0; }

.co-meta { margin: 16px 0 0; padding-top: 14px; border-top: 1px solid var(--line); }
.co-meta > div { display: flex; justify-content: space-between; padding: 3px 0; }
.co-meta dt { font-size: 12px; color: var(--g4); }
.co-meta dd { margin: 0; font-size: 12px; font-weight: 700; color: var(--g1); }

.more { display: flex; width: 100%; height: 54px; margin-top: 16px; }
.empty {
  padding: 40px 32px; background: var(--mist); border-radius: var(--r);
  font-size: 15px; line-height: 1.7; color: var(--g1); max-width: 62ch;
}

@media (max-width: 900px) {
  .search .field, .search .btn { height: 50px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
  .co h3 { min-height: 0; }
}
</style>
