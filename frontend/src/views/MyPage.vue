<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { api } from '../api.js'
import { user } from '../auth.js'
import { formatDate } from '../data/backend.js'

// 좌측 스티키 인덱스 + 아래로 길게 이어지는 섹션 구성.
// 진단 기록(Frame 45) · 결제 내역(Frame 47)에 기본 정보 수정 섹션을 앞에 붙였다.
const sections = [
  { id: 'account', label: '기본 정보' },
  { id: 'archive', label: '진단 기록' },
  { id: 'trend', label: '점수 추이' },
  { id: 'billing', label: '결제 내역' }
]

const profile = ref({
  name: user.value?.name || '김서현',
  email: user.value?.email || 'seohyeon.kim@email.com',
  phone: '010-1234-5678',
  degree: '4년제 졸업 예정',
  school: '한국대학교 산업공학과',
  job: 'AI Engineer',
  target: 'SK Hynix'
})
const reportItems = ref([])
const loadError = ref('')

const degrees = ['4년제 졸업 예정', '4년제 졸업', '전문대 졸업', '석사 재학', '석사 졸업']
const roles = ['AI Engineer', '양산 기술', 'Product Designer', 'Backend Engineer', 'Data Analyst']

const editing = ref(false)
const saved = ref(false)
const save = () => {
  editing.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 2400)
}

// 진단 기록 요약 — 리포트 데이터에서 직접 센다
const FIT_LINE = 85
const stats = computed(() => [
  { name: '진단 기업', value: new Set(reportItems.value.map(r => r.companyName).filter(Boolean)).size, unit: '개' },
  { name: '완료 리포트', value: reportItems.value.filter(r => r.status === 'COMPLETED').length, unit: '개' },
  {
    name: '적합 기업',
    value: new Set(reportItems.value.filter(r => Number(r.fitScore) >= FIT_LINE).map(r => r.companyName)).size,
    unit: '개',
    note: `${FIT_LINE}점 이상을 기준으로 합니다`
  }
])

// id 는 src/data/reports.js 와 이어진다 — 행을 누르면 그 회차 리포트가 열린다
const rows = computed(() => reportItems.value.map((report, index) => ({
  id: String(report.reportId),
  date: formatDate(report.createdAt),
  title: report.reportType === 'RECOMMEND'
    ? '맞춤 기업 추천'
    : `${report.companyName || '기업'} 적합도 분석`,
  match: report.fitScore == null ? '-' : `${Number(report.fitScore)}%`,
  delta: '—',
  status: report.status === 'COMPLETED' ? (index === 0 ? '최신' : '완료') : report.status,
  live: index === 0 && report.status === 'COMPLETED'
})))

const trend = computed(() => reportItems.value
  .filter(report => report.fitScore != null)
  .slice()
  .reverse()
  .map((report, index, items) => ({
    date: new Date(report.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }),
    value: Number(report.fitScore),
    last: index === items.length - 1
  })))

// 김서현 시연 계정의 완료 리포트 6건과 결제 내역을 1:1로 보여 준다.
// 실제 PG 연동 전까지는 이 시연용 원장을 사용한다.
const PRICE = '₩5,900'
const payments = [
  { id: 'payment-6', date: '2026.09.03', title: 'SK Hynix · AI Engineer 진단', amount: PRICE },
  { id: 'payment-5', date: '2026.08.08', title: 'SK Hynix · 양산 기술 진단', amount: PRICE },
  { id: 'payment-4', date: '2026.08.04', title: 'SK AX · AI Engineer 진단', amount: PRICE },
  { id: 'payment-3', date: '2026.08.01', title: '포스코 퓨쳐엠 · DX 진단', amount: PRICE },
  { id: 'payment-2', date: '2026.07.22', title: '카카오페이 · Backend Engineer 진단', amount: PRICE },
  { id: 'payment-1', date: '2026.07.14', title: '무신사 · Data Analyst 진단', amount: PRICE }
]

// 스크롤 위치에 따라 인덱스 활성 항목을 바꾼다
const active = ref('account')
// 해시 라우터를 쓰기 때문에 인덱스는 앵커가 아니라 스크롤로 이동한다
const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
let io
onMounted(async () => {
  try {
    const [savedProfile, reports] = await Promise.all([
      api.getProfile().catch(requestError => requestError.code === 'PROFILE_NOT_FOUND' ? null : Promise.reject(requestError)),
      api.reports({ page: 0, size: 100 })
    ])
    if (savedProfile?.desiredPosition) profile.value.job = savedProfile.desiredPosition.positionName
    reportItems.value = reports.items
  } catch (requestError) {
    loadError.value = requestError.message
  }

  io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) active.value = e.target.id }),
    { rootMargin: '-30% 0px -60% 0px' }
  )
  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) io.observe(el)
  })
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <div class="pad wrap">
    <p v-if="loadError" class="empty" role="alert">{{ loadError }}</p>
    <div class="layout">
      <!-- ══ 스티키 인덱스 ══ -->
      <aside class="index">
        <p class="i-cap">마이페이지</p>
        <nav>
          <button
            v-for="s in sections"
            :key="s.id"
            type="button"
            :class="{ on: active === s.id }"
            @click="jump(s.id)"
          >{{ s.label }}</button>
        </nav>
        <a class="btn btn-dark btn-pill btn-sm new" href="#/profile">새 진단</a>
      </aside>

      <div class="body">
        <!-- ══ 기본 정보 ══ -->
        <section id="account" class="sec">
          <div class="head reveal">
            <div>
              <h1 class="page-title">기본 정보</h1>
              <p class="page-desc">진단에 사용하는 기본 정보입니다. 수정하면 다음 진단부터 반영됩니다.</p>
            </div>
            <div class="actions">
              <span v-if="saved" class="badge live">저장되었습니다</span>
              <button v-if="!editing" class="btn btn-line btn-pill" @click="editing = true">수정</button>
              <template v-else>
                <button class="btn btn-line btn-pill" @click="editing = false">취소</button>
                <button class="btn btn-mint btn-pill" @click="save">저장</button>
              </template>
            </div>
          </div>

          <div class="card info">
            <dl>
              <div><dt>이름</dt><dd><input v-if="editing" v-model="profile.name" class="field s" /><span v-else>{{ profile.name }}</span></dd></div>
              <div><dt>이메일</dt><dd><input v-if="editing" v-model="profile.email" class="field s" type="email" /><span v-else>{{ profile.email }}</span></dd></div>
              <div><dt>연락처</dt><dd><input v-if="editing" v-model="profile.phone" class="field s" /><span v-else class="num">{{ profile.phone }}</span></dd></div>
              <div><dt>학교 · 전공</dt><dd><input v-if="editing" v-model="profile.school" class="field s" /><span v-else>{{ profile.school }}</span></dd></div>
              <div>
                <dt>학력</dt>
                <dd>
                  <select v-if="editing" v-model="profile.degree" class="field s"><option v-for="d in degrees" :key="d">{{ d }}</option></select>
                  <span v-else>{{ profile.degree }}</span>
                </dd>
              </div>
              <div>
                <dt>희망 직무</dt>
                <dd>
                  <select v-if="editing" v-model="profile.job" class="field s"><option v-for="r in roles" :key="r">{{ r }}</option></select>
                  <span v-else>{{ profile.job }}</span>
                </dd>
              </div>
              <div><dt>관심 기업</dt><dd><input v-if="editing" v-model="profile.target" class="field s" /><span v-else>{{ profile.target }}</span></dd></div>
            </dl>
          </div>
        </section>

        <!-- ══ 진단 기록 ══ -->
        <section id="archive" class="sec">
          <div class="head reveal">
            <div>
              <h2 class="page-title">진단 기록</h2>
              <p class="page-desc">점수보다 변화의 방향을 확인하세요.</p>
            </div>
            <div class="actions">
              <input class="field search" placeholder="리포트 검색" />
            </div>
          </div>

          <div class="stats card-dark stagger">
            <div v-for="s in stats" :key="s.name">
              <p class="cap">{{ s.name }}</p>
              <p class="v num">{{ s.value }}<em v-if="s.unit">{{ s.unit }}</em></p>
              <p v-if="s.note" class="s-note">{{ s.note }}</p>
            </div>
          </div>

          <div class="table stagger">
            <div class="thead">
              <span>진단일</span><span>리포트</span><span>매치</span><span>변화</span><span>상태</span>
            </div>
            <a v-for="r in rows" :key="r.id" class="tr" :href="'#/report/' + r.id">
              <span class="date num">{{ r.date }}</span>
              <strong>{{ r.title }}</strong>
              <b class="num">{{ r.match }}</b>
              <span class="delta num" :class="{ up: r.delta !== '—' }">{{ r.delta }}</span>
              <span class="badge" :class="{ live: r.live }">{{ r.status }}</span>
            </a>
          </div>
        </section>

        <!-- ══ 점수 추이 ══ -->
        <section id="trend" class="sec">
          <div class="reveal">
            <h2 class="page-title">점수 추이</h2>
            <p class="page-desc">진단할 때마다 기록된 매치 점수입니다.</p>
          </div>
          <div class="trend card reveal">
            <div class="chart">
              <div v-for="p in trend" :key="p.date" class="col">
                <b class="num">{{ p.value }}</b>
                <span class="bar-v" :class="{ last: p.last }" :style="{ height: ((p.value - 40) / 60) * 100 + '%' }"></span>
                <span class="date num">{{ p.date }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ══ 결제 내역 ══ 등장·호버 모션 없는 정적 원장 -->
        <section id="billing" class="sec">
          <div>
            <h2 class="page-title">결제 내역</h2>
            <p class="page-desc">진단은 건별로 결제됩니다. 1회 진단권 {{ PRICE }}.</p>
          </div>

          <div class="ledger card">
            <div v-for="p in payments" :key="p.id" class="lrow">
              <span class="l-date num">{{ p.date }}</span>
              <span class="l-title">{{ p.title }}</span>
              <span class="l-amt num">{{ p.amount }}</span>
            </div>
          </div>

          <div class="pay card">
            <span class="label">결제 수단</span>
            <strong class="num">신한카드 ···· 1024</strong>
            <button class="link">변경</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap { padding-bottom: 100px; }
.layout { display: flex; align-items: flex-start; gap: 56px; }

/* 스티키 인덱스 */
.index {
  flex: 0 0 200px;
  position: sticky;
  top: 100px;
  padding-top: 48px;
}
.i-cap { font-size: 12px; font-weight: 700; color: var(--g4); margin: 0 0 14px; padding-left: 14px; }
.index nav { display: flex; flex-direction: column; gap: 2px; }
.index nav button {
  position: relative;
  padding: 11px 14px;
  border: 0; background: none; text-align: left;
  border-radius: var(--r-sm);
  font-size: 14px; font-weight: 600; color: var(--g2);
  transition: background var(--t-base) var(--ease), color var(--t-base) var(--ease);
}
.index nav button:hover { background: var(--mist); color: var(--ink); }
.index nav button.on { background: var(--mist); color: var(--ink); font-weight: 700; }
.index nav button.on::before {
  content: ''; position: absolute; left: 0; top: 10px; bottom: 10px;
  width: 3px; border-radius: 2px; background: var(--ink);
}
.new { margin: 18px 0 0 14px; }

.body { flex: 1 1 auto; min-width: 0; padding-top: 48px; }
.sec + .sec { padding-top: clamp(64px, 7vw, 96px); }
.sec { scroll-margin-top: 100px; }
.head { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px 24px; }
.actions { margin-left: auto; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.search { width: 210px; height: 44px; border-radius: 999px; padding: 0 20px; }

/* 기본 정보 */
.info { margin-top: 26px; padding: 8px 30px; }
.info dl { margin: 0; }
.info dl > div {
  display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 20px;
  padding: 18px 0; border-bottom: 1px solid var(--line);
}
.info dl > div:last-child { border-bottom: 0; }
.info dt { font-size: 13px; font-weight: 700; color: var(--g2); }
.info dd { margin: 0; font-size: 15px; font-weight: 600; }
.field.s { height: 46px; max-width: 420px; font-size: 14px; }
select.field.s { background-position: calc(100% - 22px) 20px, calc(100% - 16px) 20px; }

.stats { display: flex; flex-wrap: wrap; margin-top: 30px; border-radius: var(--r-lg); overflow: hidden; }
.stats > div { flex: 1 1 200px; padding: 26px 28px; }
.stats > div + div { border-left: 1px solid #2D302E; }
.cap { font-size: 12px; font-weight: 700; color: #A1A1A6; margin: 0; }
.v { font-size: 32px; font-weight: 800; margin: 10px 0 0; letter-spacing: -0.045em; color: #F5F5F7; }
.v em { font-style: normal; font-size: 14px; color: #A1A1A6; margin-left: 6px; }
.s-note { font-size: 12px; line-height: 1.5; color: #8A8D8A; margin: 10px 0 0; }

.table { margin-top: 34px; }
.thead, .tr { display: grid; grid-template-columns: 130px 1fr 90px 80px 80px; align-items: center; gap: 14px; }
.thead { font-size: 12px; font-weight: 700; color: var(--g4); padding: 0 22px 14px; }
.tr {
  height: 74px; padding: 0 22px;
  border: 1px solid var(--line); border-radius: var(--r); margin-bottom: 8px;
  transition: transform var(--t-base) var(--spring-soft), border-color var(--t-base) var(--ease), box-shadow var(--t-base) var(--ease);
}
.tr:hover { transform: translateX(4px); border-color: var(--line-2); box-shadow: 0 10px 26px rgba(11, 13, 12, 0.07); }
.date { font-size: 13px; color: var(--g2); }
.tr strong { font-size: 16px; font-weight: 700; letter-spacing: -0.025em; }
.tr b { font-size: 17px; font-weight: 800; letter-spacing: -0.03em; }
.delta { font-size: 13px; color: var(--g4); }
.delta.up { font-weight: 800; color: var(--mint-d); }
.tr .badge { justify-self: start; }

.trend { margin-top: 26px; padding: 28px 30px 24px; }
.chart { display: flex; align-items: flex-end; gap: 5%; height: 180px; padding-left: 8px; }
.col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
.col b { font-size: 14px; font-weight: 800; margin-bottom: 8px; }
.bar-v {
  width: 100%; max-width: 86px;
  background: var(--g6); border-radius: 6px 6px 0 0;
  margin-top: auto;
  transition: height 1s var(--spring-soft);
}
.col:nth-child(2) .bar-v { background: var(--g5); }
.col:nth-child(3) .bar-v { background: #757875; }
.bar-v.last { background: var(--mint); }
.col .date { font-size: 12px; color: var(--g4); margin-top: 10px; }

/* 결제 내역 — 장식 없는 원장 한 상자. 등장·호버 모션 없음 */
.ledger { margin-top: 26px; padding: 2px 26px; }
.lrow {
  display: grid;
  grid-template-columns: 104px 1fr auto;
  align-items: baseline;
  gap: 18px;
  padding: 17px 0;
  border-top: 1px solid var(--line);
}
.lrow:first-child { border-top: 0; }
.l-date { font-size: 13px; color: var(--g3); }
.l-title { font-size: 14px; color: var(--ink); }
.l-amt { font-size: 14px; font-weight: 700; }

.pay { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 30px; padding: 24px 28px; margin-top: 40px; }
.pay .label { margin: 0; }
.pay strong { font-size: 15px; }
.link { margin-left: auto; background: none; border: 0; font-size: 13px; font-weight: 700; color: var(--g1); }
.link:hover { color: var(--ink); }

@media (max-width: 1000px) {
  .layout { flex-wrap: wrap; gap: 0; }
  .index {
    flex: 1 1 100%; position: static; padding-top: 28px;
    border-bottom: 1px solid var(--line); padding-bottom: 18px;
  }
  .index nav { flex-direction: row; flex-wrap: wrap; }
  .new { margin-left: 0; }
  .body { flex: 1 1 100%; padding-top: 34px; }
}
@media (max-width: 820px) {
  .info { padding: 8px 20px; }
  .info dl > div { grid-template-columns: 1fr; gap: 8px; }
  .stats > div { flex-basis: 100%; }
  .stats > div + div { border-left: 0; border-top: 1px solid #2D302E; }
  .thead { display: none; }
  .tr { grid-template-columns: 1fr auto; height: auto; gap: 8px 14px; padding: 20px; }
  .tr strong { grid-column: 1 / -1; order: -1; }
  .tr:hover { transform: none; }
  .ledger { padding: 2px 20px; }
  .lrow { grid-template-columns: 1fr auto; gap: 6px 14px; }
  .lrow .l-title { grid-column: 1 / -1; order: -1; }
  .search { width: 100%; }
}
</style>
