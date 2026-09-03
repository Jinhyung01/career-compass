<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { reportById } from '../data/reports.js'

// 컨설팅과 별개 탭. #/report/:id 로 이전 진단 결과도 열람할 수 있다 (기본값 r1).
// 사용자 모집단 DB 가 없어 백분위·비교 모수·지원자 등급 분포는 두지 않는다.
// 대신 현직자 인터뷰로 알 수 있는 요구 항목 빈도와 추천 프로젝트를 넣는다.
// 종합 결과 → 역량 프로파일 → 세부 역량 → 강점·보완점 → 현직자 요구 항목
// → 직무 적합도 → 우선 보완 과제 → 추천 프로젝트 → 이력서 → 예상 질문
const id = ref(location.hash.split('/')[2] || 'r1')
const sync = () => { id.value = location.hash.split('/')[2] || 'r1' }
onMounted(() => window.addEventListener('hashchange', sync))
onUnmounted(() => window.removeEventListener('hashchange', sync))

const r = computed(() => reportById(id.value))
const meta = computed(() => r.value.meta)
const overall = computed(() => r.value.overall)
const skills = computed(() => r.value.skills)
const details = computed(() => r.value.details)
const strengths = computed(() => r.value.strengths)
const gaps = computed(() => r.value.gaps)
const demands = computed(() => r.value.demands)
const projects = computed(() => r.value.recommendedProjects)
const jobFit = computed(() => r.value.jobFit)
const actions = computed(() => r.value.actions)
const resumePoints = computed(() => r.value.resumeHighlights)
const questions = computed(() => r.value.questions)

const savePdf = () => window.print()
</script>

<template>
  <!-- ═══ 1 페이지 ═══ -->
  <div class="print-page">
    <section class="banner">
      <div class="pad banner-inner">
        <div>
          <p class="eyebrow on-dark">진단 리포트 · {{ meta.code }}</p>
          <h1>{{ meta.companyName }} {{ meta.positionName }} 진단 리포트</h1>
          <p class="sub">{{ r.headline }}</p>
          <div class="banner-cta no-print">
            <button class="btn btn-mint btn-pill" @click="savePdf">PDF로 저장</button>
            <a class="btn btn-ghost btn-pill" href="#/mypage">기록에 저장</a>
          </div>
        </div>
        <aside class="glass-neon score">
          <p class="cap">MATCH SCORE</p>
          <p class="v"><b :key="r.id" class="num" :data-count="overall.fitScore">0</b><em>점 · {{ overall.grade }}등급</em></p>
        </aside>
      </div>
    </section>

    <!-- 인쇄본 머리글 (화면에서는 숨김) -->
    <div class="pad print-only sheet-head">
      <span><b>{{ meta.name }}</b> 님</span>
      <span>{{ meta.companyName }} · {{ meta.positionName }}</span>
      <span>리포트 {{ meta.code }}</span>
      <span>{{ meta.date }}</span>
    </div>

    <div class="pad body">
      <!-- 종합 결과 -->
      <h2 class="section-title">종합 결과</h2>
      <div class="summary card reveal">
        <div class="sum-cell">
          <p class="s-cap">종합 등급</p>
          <p class="s-v num">{{ overall.grade }}</p>
        </div>
        <div class="sum-cell">
          <p class="s-cap">종합 점수</p>
          <p class="s-v num">{{ overall.fitScore }}<em>점</em></p>
        </div>
        <div class="sum-cell">
          <p class="s-cap">대상 직무</p>
          <p class="s-v sm">{{ meta.positionName }}</p>
        </div>
        <div class="sum-cell">
          <p class="s-cap">진단일</p>
          <p class="s-v sm num">{{ meta.date }}</p>
        </div>
      </div>

      <div class="cols mt">
        <div class="left reveal">
          <h2 class="section-title">역량 프로파일</h2>
          <div v-for="s in skills" :key="s.name" class="skill">
            <p class="n">{{ s.name }}</p>
            <div class="bar" :class="{ 'on-mint': s.weak }" :style="{ '--w': s.value + '%' }"><i></i></div>
            <b class="num">{{ s.value }}</b>
          </div>
        </div>

        <aside class="insight card reveal">
          <p class="eyebrow">핵심 진단</p>
          <h3>{{ r.insight.title }}</h3>
          <p v-for="l in r.insight.lines" :key="l">{{ l }}</p>
        </aside>
      </div>

      <h2 class="section-title mt">세부 역량</h2>
      <p class="section-note">역량별 점수와 같은 직무 지원자 대비 백분위입니다.</p>
      <div class="table-wrap card">
        <table class="detail">
          <thead>
            <tr><th>역량군</th><th>세부 항목</th><th class="r">점수</th><th class="r">판정</th></tr>
          </thead>
          <tbody>
            <tr v-for="d in details" :key="d.name">
              <td class="dim">{{ d.group }}</td>
              <td><b>{{ d.name }}</b></td>
              <td class="r num">{{ d.score }}</td>
              <td class="r"><span class="judge" :class="d.tone">{{ d.judge }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══ 2 페이지 ═══ -->
  <div class="print-page">
    <div class="pad body top-gap">
      <h2 class="section-title">강점과 보완점</h2>
      <div class="sg">
        <article class="card sg-box">
          <p class="sg-cap up">강점</p>
          <ul><li v-for="s in strengths" :key="s">{{ s }}</li></ul>
        </article>
        <article class="card sg-box">
          <p class="sg-cap down">보완점</p>
          <ul><li v-for="g in gaps" :key="g">{{ g }}</li></ul>
        </article>
      </div>

      <h2 class="section-title mt">현직자가 꼽은 요구 항목</h2>
      <p class="section-note">
        {{ meta.companyName }} {{ meta.positionName }} 현직자 {{ demands.of }}명의 인터뷰에서
        요구 항목으로 언급된 횟수입니다.
      </p>
      <div class="card demands reveal">
        <div v-for="d in demands.items" :key="d.item" class="drow">
          <span class="d-name">{{ d.item }}</span>
          <b class="num">{{ Math.round((d.count / demands.of) * 100) }}%</b>
          <div class="bar on-mint" :style="{ '--w': (d.count / demands.of) * 100 + '%' }"><i></i></div>
          <em class="num">{{ demands.of }}명 중 {{ d.count }}명이 언급</em>
        </div>
      </div>

      <h2 class="section-title mt">직무 적합도</h2>
      <p class="section-note">입력한 프로필로 산출한 직무별 적합 점수입니다.</p>
      <div class="table-wrap card">
        <table class="detail">
          <thead>
            <tr><th class="r">순위</th><th>직무</th><th class="r">적합 점수</th><th>비고</th></tr>
          </thead>
          <tbody>
            <tr v-for="j in jobFit" :key="j.job">
              <td class="r num dim">{{ j.rank }}</td>
              <td><b>{{ j.job }}</b></td>
              <td class="r num">{{ j.score }}</td>
              <td class="dim">{{ j.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══ 3 페이지 ═══ -->
  <div class="print-page">
    <div class="pad body top-gap">
      <h2 class="section-title">우선 보완 과제</h2>
      <p class="section-note">보완점 중 가장 먼저 손대야 하는 순서입니다.</p>
      <div v-for="a in actions" :key="a.no" class="action">
        <span class="no num">{{ a.no }}</span>
        <strong>{{ a.title }}</strong>
        <span class="meta num">{{ a.meta }}</span>
      </div>

      <h2 class="section-title mt">추천 프로젝트</h2>
      <p class="section-note">
        현직자가 꼽은 요구 항목을 그대로 과제로 옮긴 기획입니다.
        새로 배우는 것보다, 부족한 항목이 숫자로 남는 주제를 골랐습니다.
      </p>
      <div class="projects">
        <article v-for="p in projects" :key="p.no" class="card proj">
          <div class="p-head">
            <span class="p-no num">{{ p.no }}</span>
            <div>
              <h3>{{ p.title }}</h3>
              <p class="p-tag">{{ p.tag }} · 예상 {{ p.weeks }}</p>
            </div>
          </div>

          <p class="p-src">근거 — {{ p.source }}</p>
          <p class="p-why">{{ p.why }}</p>

          <p class="p-label">할 일</p>
          <ol class="p-todo">
            <li v-for="t in p.todo" :key="t">{{ t }}</li>
          </ol>

          <dl class="p-meta">
            <div><dt>산출물</dt><dd>{{ p.output }}</dd></div>
            <div><dt>기간</dt><dd class="num">{{ p.weeks }}</dd></div>
          </dl>

          <p class="p-resume">
            <span>이력서에 이렇게</span>{{ p.resume }}
          </p>
        </article>
      </div>

    </div>
  </div>

  <!-- ═══ 4 페이지 ═══ -->
  <div class="print-page">
    <div class="pad body top-gap">
      <h2 class="section-title">이력서 문장 고치기</h2>
      <p class="section-note">문장을 새로 쓰지 말고, 있는 문장을 이렇게 바꾸세요.</p>
      <div class="rewrites">
        <article v-for="(p, i) in resumePoints" :key="p.after" class="card rw">
          <span class="rw-no num">{{ i + 1 }}</span>
          <div class="rw-body">
            <p class="rw-line before"><span>지금</span>{{ p.before }}</p>
            <p class="rw-line after"><span>이렇게</span>{{ p.after }}</p>
            <p class="rw-why">{{ p.why }}</p>
          </div>
        </article>
      </div>

      <h2 class="section-title mt">예상 면접 질문</h2>
      <p class="section-note">이번 진단 결과에서 확인 질문이 나올 가능성이 높은 항목입니다.</p>
      <dl class="qa">
        <div v-for="q in questions" :key="q.q">
          <dt>{{ q.q }}</dt>
          <dd>{{ q.why }}</dd>
        </div>
      </dl>

      <p class="print-only sheet-foot num">{{ meta.name }} · {{ meta.companyName }} {{ meta.positionName }} 진단 리포트 · {{ meta.date }} · Jobpill</p>
    </div>
  </div>
</template>

<style scoped>
/* ── 배너 ── */
.banner { background: var(--ink-2); color: #F0F2F0; }
.banner-inner {
  display: flex; flex-wrap: wrap; align-items: center; gap: 28px 48px;
  padding-top: clamp(40px, 4.5vw, 64px); padding-bottom: clamp(40px, 4.5vw, 64px);
}
.banner-inner > div:first-child { flex: 1 1 460px; }
h1 { font-size: clamp(26px, 3.2vw, 38px); font-weight: 800; margin: 14px 0 0; letter-spacing: -0.04em; color: #F5F5F7; }
.sub { font-size: 15px; color: #A1A1A6; margin: 14px 0 0; }
.banner-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }

.score { flex: 0 1 300px; padding: 24px 28px; }
.cap { font-size: 11px; font-weight: 700; color: var(--mint); margin: 0; }
.v { display: flex; align-items: baseline; gap: 10px; margin: 10px 0 0; }
.v b { font-size: 60px; font-weight: 800; letter-spacing: -0.05em; color: #fff; }
.v em { font-style: normal; font-size: 13px; font-weight: 700; color: #C9CCC9; }

/* 인쇄 머리글 */
.sheet-head {
  gap: 24px; align-items: center;
  font-size: 10px; color: var(--g3);
  padding-top: 10px; padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}
.sheet-head b { color: var(--ink); }
.sheet-foot { font-size: 10px; color: var(--g5); text-align: right; margin-top: 24px; padding-top: 12px; border-top: 1px solid var(--line); }

/* ── 본문 ── */
.body { padding-top: clamp(36px, 4vw, 56px); padding-bottom: clamp(40px, 5vw, 72px); }
.top-gap { padding-top: clamp(32px, 4vw, 52px); }
.cols { display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start; }
.left { flex: 1 1 420px; max-width: 560px; }
.mt { margin-top: clamp(44px, 5vw, 68px); }

/* 종합 결과 */
.summary { display: flex; flex-wrap: wrap; margin-top: 16px; overflow: hidden; }
.sum-cell { flex: 1 1 170px; padding: 24px 28px; }
.sum-cell + .sum-cell { border-left: 1px solid var(--line); }
.s-cap { font-size: 12px; font-weight: 700; color: var(--g3); margin: 0; }
.s-v { font-size: 30px; font-weight: 800; margin: 10px 0 0; letter-spacing: -0.045em; }
.s-v em { font-style: normal; font-size: 14px; font-weight: 700; color: var(--g3); margin-left: 4px; }

.skill { display: grid; grid-template-columns: 1fr auto; align-items: center; margin-bottom: 22px; }
.skill .n { grid-column: 1 / -1; font-size: 13px; color: var(--g1); margin: 0 0 10px; }
.skill .bar { height: 8px; }
.skill b { font-size: 14px; font-weight: 800; margin-left: 16px; }

.insight { flex: 1 1 340px; padding: 30px; }
.insight h3 { font-size: 24px; font-weight: 800; margin: 12px 0 18px; letter-spacing: -0.035em; }
.insight p { font-size: 14px; line-height: 1.7; color: var(--g1); margin: 0 0 6px; }

/* 표 */
.table-wrap { margin-top: 16px; padding: 8px 24px; overflow-x: auto; }
.detail { width: 100%; border-collapse: collapse; font-size: 14px; }
.detail th {
  text-align: left; font-size: 12px; font-weight: 700; color: var(--g3);
  padding: 16px 12px; border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.detail td { padding: 16px 12px; border-bottom: 1px solid var(--line); }
.detail tr:last-child td { border-bottom: 0; }
.detail .r { text-align: right; }
.detail .dim { color: var(--g3); font-size: 13px; }
.detail b { font-weight: 700; }
.judge {
  display: inline-flex; align-items: center; height: 25px; padding: 0 11px;
  border-radius: 999px; font-size: 11px; font-weight: 700;
  background: var(--mist); color: var(--g1);
}
.judge.good { background: var(--mint-bg); color: #0E5C3B; }
.judge.bad { background: #FDECEC; color: #A4222A; }

/* 강점 · 보완점 */
.sg { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 16px; }
.sg-box { padding: 26px 28px 24px; }
.sg-cap { font-size: 13px; font-weight: 800; margin: 0 0 16px; }
.sg-cap.up { color: var(--mint-d); }
.sg-cap.down { color: #A4222A; }
.sg-box ul { margin: 0; padding-left: 18px; }
.sg-box li { font-size: 14px; line-height: 1.7; color: var(--g1); margin-bottom: 10px; }


/* 우선 보완 과제 */
.action {
  display: flex; width: 100%; align-items: center; gap: 22px;
  min-height: 70px; padding: 16px 24px;
  background: #fff; border: 1px solid var(--line); border-radius: var(--r);
  margin-bottom: 10px;
}
.no { font-size: 12px; font-weight: 800; color: var(--mint-d); }
.action strong { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
.meta { margin-left: auto; font-size: 13px; color: var(--g1); }

/* 현직자 요구 항목 */
.demands { padding: 10px 28px 18px; margin-top: 16px; }
.drow { display: grid; grid-template-columns: 1fr auto; gap: 6px 12px; padding: 18px 0; border-top: 1px solid var(--line); }
.drow:first-child { border-top: 0; }
.d-name { font-size: 15px; font-weight: 700; letter-spacing: -0.02em; }
.drow b { font-size: 15px; font-weight: 800; }
.drow .bar { grid-column: 1 / -1; height: 8px; margin-top: 4px; }
.drow em { grid-column: 1 / -1; font-style: normal; font-size: 12px; color: var(--g4); margin-top: 6px; }

/* 추천 프로젝트 */
.projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px; margin-top: 16px; }
.proj { padding: 28px 28px 24px; display: flex; flex-direction: column; }
.p-head { display: flex; align-items: flex-start; gap: 14px; }
.p-no {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px; border-radius: 12px;
  background: var(--ink); color: var(--mint);
  font-size: 13px; font-weight: 800;
}
.proj h3 { font-size: 19px; font-weight: 800; margin: 0; letter-spacing: -0.03em; line-height: 1.35; }
.p-tag { font-size: 12px; font-weight: 700; color: var(--mint-d); margin: 7px 0 0; }
.p-src {
  font-size: 12px; line-height: 1.6; color: var(--g2);
  background: var(--mist); border-radius: var(--r-sm);
  padding: 11px 14px; margin: 20px 0 0;
}
.p-why { font-size: 14px; line-height: 1.75; color: var(--g1); margin: 14px 0 0; }
.p-label { font-size: 12px; font-weight: 800; color: var(--g1); margin: 22px 0 10px; }
.p-todo { margin: 0; padding-left: 20px; }
.p-todo li { font-size: 14px; line-height: 1.7; color: var(--ink); margin-bottom: 7px; }
.p-meta { margin: 20px 0 0; padding-top: 16px; border-top: 1px solid var(--line); }
.p-meta > div { display: flex; gap: 14px; padding: 4px 0; }
.p-meta dt { flex: none; width: 54px; font-size: 12px; font-weight: 700; color: var(--g3); }
.p-meta dd { margin: 0; font-size: 13px; line-height: 1.6; color: var(--g1); }
.p-resume {
  margin: 18px 0 0; padding: 14px 16px;
  background: var(--mint-bg); border-radius: var(--r-sm);
  font-size: 13px; line-height: 1.65; color: #0E3D28;
}
.p-resume span { display: block; font-size: 11px; font-weight: 800; color: var(--mint-d); margin-bottom: 5px; }

/* 이력서 문장 고치기 */
.rewrites { display: flex; flex-direction: column; gap: 10px; }
.rw { display: flex; gap: 16px; padding: 22px 24px; }
.rw-no {
  flex: none; width: 24px; height: 24px; border-radius: 50%;
  background: var(--ink); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; margin-top: 2px;
}
.rw-body { flex: 1; min-width: 0; }
.rw-line { font-size: 15px; line-height: 1.7; margin: 0; }
.rw-line span {
  display: inline-flex; align-items: center; height: 22px; padding: 0 9px;
  border-radius: 999px; font-size: 11px; font-weight: 800;
  margin-right: 9px; vertical-align: 2px;
}
.rw-line.before { color: var(--g3); text-decoration: line-through; text-decoration-color: var(--g6); }
.rw-line.before span { background: var(--mist); color: var(--g2); text-decoration: none; }
.rw-line.after { color: var(--ink); font-weight: 700; margin-top: 10px; }
.rw-line.after span { background: var(--mint-bg); color: #0E5C3B; }
.rw-why { font-size: 12px; color: var(--g3); margin: 12px 0 0; }

/* 예상 질문 */
.qa { margin: 0; }
.qa > div { padding: 20px 0; border-bottom: 1px solid var(--line); }
.qa dt { font-size: 16px; font-weight: 700; letter-spacing: -0.025em; }
.qa dd { margin: 8px 0 0; font-size: 13px; line-height: 1.7; color: var(--g2); }

@media (max-width: 900px) {
  .score { flex: 1 1 100%; }
  .sum-cell + .sum-cell { border-left: 0; border-top: 1px solid var(--line); }
  .action { flex-wrap: wrap; gap: 10px 16px; }
  .meta { margin-left: 0; }
}

@media print {
  .sheet-head { display: flex; }
  .banner { padding: 0; }
  .banner-inner { padding-top: 14px; padding-bottom: 14px; gap: 16px 28px; }
  h1 { font-size: 20px; }
  .sub { font-size: 11px; }
  .v b { font-size: 34px; }
  .body { padding-top: 16px; padding-bottom: 0; }
  .section-title { font-size: 15px; }
  .insight h3 { font-size: 17px; }
  .s-v { font-size: 22px; }
  .detail th, .detail td { padding: 9px 10px; font-size: 11px; }
  .action { min-height: 0; padding: 12px 16px; }
  .proj { padding: 16px 18px; }
  .proj h3 { font-size: 15px; }
  .p-todo li, .p-why { font-size: 11px; }
  .p-src, .p-resume { padding: 8px 10px; font-size: 10px; }
  .rw { padding: 12px 16px; }
  .rw-line { font-size: 12px; }
  .drow { padding: 9px 0; }
  .sg-box { padding: 16px 18px; }
  .sg-box li { font-size: 12px; }
  .qa > div { padding: 12px 0; }
  .qa dt { font-size: 13px; }
}
</style>
