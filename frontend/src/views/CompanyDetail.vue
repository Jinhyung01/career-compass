<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { api } from '../api.js'
import { hasApiSession } from '../auth.js'
import { enrichCompany } from '../data/backend.js'
import CompanyLogo from '../components/CompanyLogo.vue'

// UC-S05 특정 기업 적합도 분석 — #/company/:companyCode 로 들어온 기업 하나를 보여준다.
const code = ref(location.hash.split('/')[2] || '')
const co = ref({
  companyCode: '', companyName: '', industry: '', role: '', people: 0, insight: 0,
  interviewed: '-', freshness: 0, jobs: [], culture: [], domain: ''
})
const reports = ref([])
const loading = ref(true)
const error = ref('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const company = await api.company(code.value)
    co.value = enrichCompany(company)
    // 기업 상세는 공개 화면이다. 로그인한 경우에만 개인 진단 결과를 표시한다.
    reports.value = hasApiSession.value
      ? (await api.reports({ status: 'COMPLETED', page: 0, size: 100 })).items
      : []
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}

const sync = () => {
  code.value = location.hash.split('/')[2] || ''
  load()
}
onMounted(() => {
  window.addEventListener('hashchange', sync)
  load()
})
onUnmounted(() => window.removeEventListener('hashchange', sync))

const jobs = computed(() => co.value.jobs)
const culture = computed(() => co.value.culture)
const diag = computed(() => {
  const report = reports.value.find(item =>
    item.reportType === 'FIT_ANALYSIS' && item.companyCode === co.value.companyCode)
  return report ? {
    id: report.reportId,
    score: Number(report.fitScore),
    date: new Date(report.createdAt).toLocaleDateString('ko-KR'),
    role: '적합도 분석'
  } : null
})

const chooseCompany = () => {
  sessionStorage.setItem('jobpill.selectedCompany', JSON.stringify({
    companyCode: co.value.companyCode,
    companyName: co.value.companyName
  }))
}
</script>

<template>
  <p v-if="loading" class="pad empty">기업 정보를 불러오는 중입니다.</p>
  <p v-if="error" class="pad empty" role="alert">{{ error }}</p>

  <section class="banner">
    <div class="pad banner-inner">
      <div class="id">
        <CompanyLogo :name="co.companyName" :domain="co.domain" :size="64" />
        <div>
          <p class="eyebrow on-dark">기업 정보</p>
          <h1>{{ co.companyName }}</h1>
          <p class="sub">
            {{ co.role }} · 현직자 {{ co.people }}명 · 인사이트 {{ co.insight }}건 · 최근 인터뷰 {{ co.interviewed }}
          </p>
          <div class="cta">
            <a class="btn btn-mint btn-pill" href="#/profile" @click="chooseCompany">이 기업으로 진단하기</a>
            <button class="btn btn-ghost btn-pill">관심 기업에 담기</button>
          </div>
        </div>
      </div>

      <aside class="glass-slate freshness">
        <p class="cap">정보 최신성</p>
        <p class="fresh-v"><b :key="co.companyCode" class="num" :data-count="co.freshness" data-suffix="%">0</b></p>
        <p class="fresh-note">
          인사이트 {{ co.insight }}건을 인터뷰 시점 기준으로 환산한 값입니다.
          기술 스택과 인재상이 바뀌는 주기를 고려해 12개월마다 다시 인터뷰합니다.
        </p>
      </aside>
    </div>
  </section>

  <div class="pad body">
    <!-- 직무별 -->
    <section class="block">
      <div class="reveal">
        <h2 class="section-title">직무별 요구 항목</h2>
        <p class="section-note">직무마다 현직자가 꼽은 요구 항목이 다릅니다. 진단을 실행하면 이 항목과 내 프로필을 대조합니다.</p>
      </div>
      <div class="jobs stagger">
        <a v-for="j in jobs" :key="j.name" class="card card-lift job" href="#/profile" @click="chooseCompany">
          <div class="job-head">
            <h3>{{ j.name }}</h3>
          </div>
          <p class="job-src num">인터뷰한 현직자 {{ j.people }}명</p>
          <div class="need">
            <span v-for="n in j.need" :key="n">{{ n }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- 문화 -->
    <section class="block two">
      <div class="col reveal">
        <h2 class="section-title">기업 문화</h2>
        <p class="section-note">인터뷰에서 반복 언급된 정도를 지표로 환산했습니다.</p>
        <div class="crows">
          <div v-for="c in culture" :key="c.name" class="crow">
            <span class="c-name">{{ c.name }}</span>
            <b class="num">{{ c.value }}</b>
            <div class="bar" :style="{ '--w': c.value + '%' }"><i></i></div>
            <em>{{ c.note }}</em>
          </div>
        </div>
      </div>

      <aside class="col reveal">
        <div class="glass ready">
          <template v-if="diag">
            <p class="eyebrow">최근 진단 결과</p>
            <h3>{{ co.companyName }} {{ diag.role }} 기준 {{ diag.score }}점</h3>
            <p>
              {{ diag.date }}에 실행한 진단 결과입니다.
              부족한 항목을 채우고 다시 진단하면 점수 변화를 이전 리포트와 비교해 확인할 수 있습니다.
            </p>
            <a class="btn btn-mint btn-block btn-pill" :href="'#/report/' + diag.id">리포트 열어보기</a>
            <a class="btn btn-line btn-block btn-pill more" href="#/profile" @click="chooseCompany">다시 진단하기</a>
          </template>
          <template v-else>
            <p class="eyebrow">아직 진단하지 않은 기업</p>
            <h3>매치 점수는 진단 후에 나옵니다</h3>
            <p>
              {{ co.companyName }}의 현직자 {{ co.people }}명이 말한 요구 항목과 내 프로필을 대조해야
              이 기업 기준 점수를 계산할 수 있습니다.
            </p>
            <a class="btn btn-mint btn-block btn-pill" href="#/profile" @click="chooseCompany">진단 시작하기</a>
          </template>
        </div>

        <div class="method">
          <p class="m-cap">이 정보는 어떻게 모으나요?</p>
          <p>
            현직자는 서비스에 직접 글을 쓰지 않습니다. 인터뷰로 얻은 내용을 관리자가 검수해 등록하고,
            기술 스택과 인재상이 바뀌는 주기를 고려해 12개월마다 다시 인터뷰합니다.
          </p>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.banner { background: var(--ink-2); color: #F0F2F0; }
.banner-inner {
  display: flex; flex-wrap: wrap; align-items: center; gap: 32px 48px;
  padding-top: clamp(40px, 4.5vw, 60px); padding-bottom: clamp(40px, 4.5vw, 60px);
}
.id { display: flex; align-items: flex-start; gap: 22px; flex: 1 1 480px; }
.mark {
  width: 76px; height: 76px; flex: none;
  border-radius: 22px;
  background: var(--mint); color: var(--ink);
  display: flex; align-items: center; justify-content: center;
  font-size: 34px; font-weight: 800;
}
h1 { font-size: clamp(26px, 3.2vw, 40px); font-weight: 800; line-height: 1.15; margin: 10px 0 0; letter-spacing: -0.04em; color: #F5F5F7; }
.sub { font-size: 14px; color: #A1A1A6; margin: 12px 0 0; }
.cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }

.freshness { flex: 0 1 300px; padding: 24px 26px; }
.cap { font-size: 11px; font-weight: 700; color: var(--mint); margin: 0; }
.fresh-v b { font-size: 52px; font-weight: 800; letter-spacing: -0.05em; color: #fff; }
.fresh-v { margin: 8px 0 0; }
.fresh-note { font-size: 13px; line-height: 1.6; color: #C9CCC9; margin: 12px 0 0; }
.fresh-note b { color: #F0F2F0; }

.body { padding-bottom: 100px; }
.block { padding-top: clamp(52px, 6vw, 84px); }

/* 직무 */
.jobs { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.job { padding: 26px 26px 24px; }
.job-head { margin-bottom: 4px; }
.job h3 { font-size: 18px; font-weight: 800; margin: 0; letter-spacing: -0.03em; }
.job-src { font-size: 12px; color: var(--g4); margin: 14px 0 0; }
.need { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.need span { font-size: 12px; font-weight: 600; color: var(--g1); background: var(--mist); border-radius: 999px; padding: 6px 12px; }

/* 문화 */
.two { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: 44px; align-items: start; }
.crow { display: grid; grid-template-columns: 1fr auto; gap: 6px 12px; padding: 18px 0; border-top: 1px solid var(--line); }
.c-name { font-size: 15px; font-weight: 700; }
.crow b { font-size: 15px; font-weight: 800; }
.crow .bar { grid-column: 1 / -1; height: 8px; margin-top: 6px; }
.crow em { grid-column: 1 / -1; font-style: normal; font-size: 12px; color: var(--g4); margin-top: 8px; }

.ready { padding: 30px 30px 28px; }
.ready h3 { font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.035em; }
.ready p { font-size: 14px; line-height: 1.7; color: var(--g1); margin: 14px 0 24px; }
.more { margin-top: 10px; }
.method { margin-top: 28px; padding-top: 26px; border-top: 1px solid var(--line); }
.m-cap { font-size: 13px; font-weight: 800; margin: 0 0 12px; }
.method p { font-size: 13px; line-height: 1.75; color: var(--g2); margin: 0; }

@media (max-width: 1000px) {
  .two { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 900px) {
  .freshness { flex: 1 1 100%; }
  .id { flex-wrap: wrap; }
}
</style>
