<script setup>
import { totals } from '../data/companies.js'

// 카피와 근거는 팀 기획서(문제 정의 · 기존 서비스 한계 · 핵심 흐름)를 따른다.
const alternatives = [
  { name: '채용 공고', limit: '기업이 직접 쓴 홍보 문구. 실제 업무와 온도차가 크다.', gap: '“Python 활용 능력”이 어느 수준인지 알 수 없음' },
  { name: '잡플래닛 · 블라인드', limit: '만족도 후기 중심이라 내 역량과 대조가 안 된다.', gap: '평점은 있지만 내 기준점이 없음' },
  { name: '취업 커뮤니티', limit: '정보가 비구조적이고 검색이 되지 않는다.', gap: '같은 질문이 매년 반복됨' },
  { name: 'AI 챗봇', limit: '공개된 정보만 안다.', gap: '인터뷰로만 얻는 내부 기준은 모름' }
]

// 프로필 입력 → 기준 대조 → 리포트 확인
const steps = [
  { no: '01', title: '프로필 입력', body: '학력·경력·자격증·프로젝트를 입력합니다.' },
  { no: '02', title: '기준 대조', body: '채용 공고와 현직자 인터뷰에 내 프로필을 항목 단위로 대조합니다.' },
  { no: '03', title: '리포트 확인', body: '부족한 역량과 보완 과제를 우선순위 순서로 받습니다.', cta: true }
]

// Figma Frame 40 — 이 서비스가 답하는 세 가지 질문
const questions = [
  { no: '01', q: '내 프로필에서 무엇이 부족한가', a: '공고 기준과 대조해 부족한 경험을 찾습니다.' },
  { no: '02', q: '무엇을 실행해야 하는가', a: '다음에 할 프로젝트를 제안합니다.' },
  { no: '03', q: '어떻게 합격권에 가까워지는가', a: '다시 진단해 변화를 확인합니다.' }
]

// clipboard 10 — 등록 기업 / 인사이트 / 인터뷰 응답자 + START NOW
const stats = [
  { cap: '등록 기업', value: totals.companies, suffix: '곳', note: '현직자 인터뷰를 확보한 기업' },
  { cap: '인사이트', value: totals.insights, suffix: '건', note: '인터뷰에서 정리한 요구 항목' },
  { cap: '인터뷰 참여 현직자', value: totals.insiders, suffix: '명', note: '등록 기업 현직자 기준' }
]

const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
</script>

<template>
  <!-- ═══ HERO ═══ -->
  <section class="hero">
    <div class="spheres" aria-hidden="true">
      <span class="sphere s1"></span>
      <span class="sphere s2"></span>
      <span class="sphere s3"></span>
      <span class="sphere s4"></span>
      <span class="sphere s5"></span>
      <span class="scrim"></span>
    </div>

    <div class="hero-inner">
      <div class="copy">
        <p class="kicker">AI CAREER CONSULTING</p>
        <h1>
          <span class="mint">현직자가 보는 기준으로</span><br />
          <span class="white">당신의 부족한 경험을 찾습니다.</span>
        </h1>
        <p class="lead">채용 공고와 현직자 인터뷰를 대조해, 다음 프로젝트를 제시합니다.</p>
        <div class="cta">
          <a class="btn btn-mint btn-lg btn-pill" href="#/profile">진단 시작하기</a>
          <button class="btn btn-ghost btn-lg btn-pill" @click="jump('why')">서비스 안내</button>
        </div>
        <p class="tiny">진단 결과는 계정에 저장되고, 다시 진단하면 이전 결과와 비교됩니다.</p>
      </div>

      <!-- 히어로 위에 떠 있는 유리 카드 -->
      <aside class="glass-neon qbox reveal">
        <p class="q-cap">이 서비스가 답하는 세 가지 질문</p>
        <dl class="q-list">
          <div v-for="q in questions" :key="q.no">
            <dt><span class="q-no num">{{ q.no }}</span>{{ q.q }}</dt>
            <dd>{{ q.a }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>

  <!-- ═══ 문제 ═══ -->
  <section id="why" class="pad problem">
    <div class="problem-head reveal">
      <p class="eyebrow">지금 취업 준비가 막히는 지점</p>
      <h2 class="page-title">근거가 없으니 전략이 “일단 다”가 됩니다.</h2>
      <p class="page-desc">
        목표 기업이 3~5개인데 어디에 집중할지 정하지 못하면, 지원은 “일단 다 써본다”가 되고
        준비는 “일단 다 해본다”가 됩니다. 시간은 한정돼 있는데 판단할 근거가 없기 때문입니다.
      </p>
    </div>

    <div class="alt stagger">
      <article v-for="a in alternatives" :key="a.name" class="card card-lift">
        <h3>{{ a.name }}</h3>
        <p class="limit">{{ a.limit }}</p>
        <p class="gap">{{ a.gap }}</p>
      </article>
    </div>

    <p class="verdict reveal">
      위 채널은 정보를 보여줄 뿐, 내 프로필과 대조하지는 않습니다.
      Jobpill은 입력한 프로필을 채용 공고·현직자 인터뷰와 항목 단위로 대조해 결과를 제시합니다.
    </p>
  </section>

  <!-- ═══ 진행 흐름 ═══ -->
  <section class="pad flow">
    <div class="flow-head reveal">
      <h2 class="page-title">프로필을 입력하면, 현직자 기준과 대조해 리포트를 만듭니다.</h2>
    </div>

    <ol class="steps stagger">
      <li v-for="s in steps" :key="s.no" class="card card-lift">
        <span class="step-no num">{{ s.no }}</span>
        <h3>{{ s.title }}</h3>
        <p>{{ s.body }}</p>
        <a v-if="s.cta" class="badge cta-badge" href="#/profile">진단 시작하기</a>
      </li>
    </ol>
  </section>

  <!-- ═══ 숫자 · 원칙 ═══ -->
  <section id="about" class="outro">
    <div class="outro-head reveal">
      <p class="eyebrow on-dark">우리가 쌓아온 것</p>
      <h2>읽을 정보는 이미 많습니다.<br />대조할 기준이 없었을 뿐입니다.</h2>
      <p class="sub">
        현직자 인터뷰를 관리자가 직접 검수해 구조화하고, 오래된 정보는 다시 인터뷰해 갱신합니다.
        기술 스택과 인재상은 자주 바뀌기 때문입니다.
      </p>
    </div>

    <div class="tiles stagger">
      <div v-for="s in stats" :key="s.cap" class="glass-slate tile">
        <p class="cap">{{ s.cap }}</p>
        <p class="v num" :data-count="s.value" :data-decimals="s.decimals || 0" :data-suffix="s.suffix">0</p>
        <p class="u">{{ s.note }}</p>
      </div>
      <a class="tile go" href="#/profile">
        <p class="cap">새 진단</p>
        <p class="v2">진단 시작하기</p>
        <p class="u2">프로필 입력부터 시작합니다.</p>
      </a>
    </div>

    <div class="principle reveal">
      <p class="eyebrow on-dark">서비스 운영 원칙</p>
      <h3>데이터의 출처와 시점을 함께 제공합니다.</h3>
      <p class="pd">
        AI가 생성한 진단 결과는 담당자가 검수한 뒤 제공하며, 모든 인터뷰 데이터에는 인터뷰 시점을 함께 표시합니다.
        업로드 파일은 용도 외에 이용되지 않습니다.
      </p>
      <a class="btn btn-mint btn-lg btn-pill" href="#/profile">진단 시작하기</a>
    </div>
  </section>
</template>

<style scoped>
/* ══ HERO ══ */
.hero { position: relative; background: var(--ink-2); overflow: hidden; }
.spheres { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.sphere {
  position: absolute;
  border-radius: 48% 52% 55% 45% / 52% 44% 56% 48%;
  will-change: transform;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.s1 {
  width: 420px; height: 420px; right: -4%; top: -26%;
  background: linear-gradient(145deg, #38FF9C, rgba(0, 128, 74, 0.9));
  opacity: 0.92;
  animation-name: drift-one; animation-duration: 24s;
}
.s2 {
  width: 250px; height: 205px; right: 6%; top: 56%;
  border-radius: 56% 44% 48% 52% / 45% 55%;
  background: linear-gradient(145deg, #6BFFB8, rgba(0, 106, 62, 0.85));
  opacity: 0.6;
  animation-name: drift-two; animation-duration: 29s;
}
.s3 {
  width: 300px; height: 300px; right: 26%; top: 12%;
  background: linear-gradient(145deg, rgba(56, 255, 156, 0.8), rgba(0, 84, 50, 0.9));
  opacity: 0.45;
  animation-name: drift-three; animation-duration: 19s;
}
.s4 {
  width: 132px; height: 132px; left: 46%; top: 68%;
  background: linear-gradient(145deg, #9CFFCE, rgba(0, 150, 90, 0.9));
  opacity: 0.72;
  animation-name: drift-four; animation-duration: 16s;
}
.s5 {
  width: 190px; height: 136px; left: -3%; top: 62%;
  border-radius: 44% 56% 42% 58% / 58% 43% 57% 42%;
  background: linear-gradient(145deg, rgba(56, 255, 156, 0.55), rgba(0, 70, 42, 0.9));
  opacity: 0.42;
  animation-name: drift-five; animation-duration: 21s;
}
@keyframes drift-one { to { transform: translate(-9vw, 7vh) rotate(16deg) scale(1.1); } }
@keyframes drift-two { to { transform: translate(-11vw, -9vh) rotate(-22deg) scale(1.18); } }
@keyframes drift-three { to { transform: translate(7vw, 11vh) rotate(24deg) scale(0.9); } }
@keyframes drift-four { to { transform: translate(-8vw, -10vh) rotate(-18deg) scale(1.28); } }
@keyframes drift-five { to { transform: translate(9vw, -8vh) rotate(20deg) scale(1.14); } }
@media (prefers-reduced-motion: reduce) { .sphere { animation: none; } }

.scrim {
  position: absolute; inset: 0;
  background: linear-gradient(100deg, #050605 14%, rgba(5, 6, 5, 0.78) 46%, rgba(5, 6, 5, 0.1) 82%);
}

.hero-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
  padding: clamp(64px, 7vw, 110px) var(--gutter) clamp(72px, 8vw, 120px);
}
.copy { flex: 1 1 520px; min-width: 0; }
.kicker { font-size: clamp(13px, 1.3vw, 16px); font-weight: 700; color: var(--mint); margin: 0; letter-spacing: -0.01em; }
h1 {
  font-size: clamp(34px, 4.6vw, 66px);
  line-height: 1.14;
  font-weight: 800;
  margin: 24px 0 0;
  letter-spacing: -0.045em;
}
.mint { color: var(--mint); }
.white { color: #F5F5F7; }
.lead { font-size: clamp(15px, 1.4vw, 19px); line-height: 1.7; color: #C9CCC9; margin: 28px 0 0; max-width: 56ch; }
.cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
.tiny { font-size: 13px; color: #767976; margin: 18px 0 0; }

/* 히어로 위 네온 유리 카드 */
.qbox { flex: 0 1 400px; padding: 28px 30px 26px; }
.q-cap { font-size: 13px; font-weight: 800; color: var(--mint); margin: 0 0 6px; letter-spacing: -0.02em; }
.q-list { margin: 0; }
.q-list > div { padding: 20px 0; border-top: 1px solid rgba(255, 255, 255, 0.14); }
.q-list dt {
  display: flex; align-items: baseline; gap: 10px;
  font-size: 16px; font-weight: 700; color: #F5F5F7; letter-spacing: -0.025em;
}
.q-no { font-size: 11px; font-weight: 800; color: var(--mint); }
.q-list dd { margin: 8px 0 0 28px; font-size: 13px; line-height: 1.6; color: #A9ACA9; }

/* ══ 문제 ══ */
.problem { padding-top: clamp(72px, 8vw, 120px); }
.problem-head { max-width: 820px; }
.alt {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 48px;
}
.alt article { padding: 26px 26px 28px; }
.alt h3 { font-size: 18px; font-weight: 800; margin: 0; letter-spacing: -0.03em; }
.limit { font-size: 14px; line-height: 1.65; color: var(--g2); margin: 14px 0 0; }
.gap {
  font-size: 13px; color: var(--g1); margin: 18px 0 0;
  padding-top: 16px; border-top: 1px solid var(--line);
}
.verdict {
  font-size: clamp(18px, 2.1vw, 26px);
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.03em;
  margin: 48px 0 0;
  max-width: 900px;
}
.verdict b { font-weight: 800; }


/* ══ 흐름 ══ */
.flow { padding-top: clamp(80px, 9vw, 130px); }
.flow-head { max-width: 720px; }
.steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 48px 0 0;
  padding: 0;
}
.steps li { padding: 30px 28px 32px; }
.step-no {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px; border-radius: 12px;
  background: var(--ink); color: var(--mint);
  font-size: 14px; font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.steps h3 { font-size: 18px; font-weight: 800; margin: 20px 0 0; letter-spacing: -0.03em; }
.steps p { font-size: 14px; line-height: 1.7; color: var(--g2); margin: 14px 0 0; }
.steps .badge { margin-top: 22px; }
.cta-badge { background: var(--mint); color: #0A0A0A; }

/* ══ 아웃트로 ══ */
.outro {
  background: #000;
  color: #F5F5F7;
  padding: clamp(80px, 9vw, 130px) var(--gutter) clamp(72px, 8vw, 110px);
  margin-top: clamp(80px, 9vw, 130px);
}
.outro-head { max-width: 780px; }
.outro h2 {
  font-size: clamp(28px, 3.6vw, 46px);
  line-height: 1.24;
  font-weight: 800;
  color: #F5F5F7;
  margin: 22px 0 0;
  letter-spacing: -0.04em;
}
.sub { font-size: 17px; line-height: 1.75; color: #A1A1A6; margin: 24px 0 0; max-width: 62ch; }

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 56px;
}
.tile { padding: 26px 24px 28px; }
.cap { font-size: 12px; font-weight: 700; color: #A1A1A6; margin: 0; }
.v { font-size: clamp(32px, 3.6vw, 44px); font-weight: 800; margin: 12px 0 0; letter-spacing: -0.045em; color: #F5F5F7; }
.u { font-size: 13px; color: #8A8D8A; margin: 12px 0 0; line-height: 1.5; }
.go { display: block; background: var(--mint); border: 0; }
.go .cap { color: #0A0A0A; }
.v2 { font-size: 24px; font-weight: 800; color: #0A0A0A; margin: 14px 0 0; letter-spacing: -0.035em; }
.u2 { font-size: 13px; color: #1A1A1A; margin: 12px 0 0; }

.principle { border-top: 1px solid #1E211F; margin-top: 64px; padding-top: 52px; max-width: 720px; }
.principle h3 { font-size: clamp(22px, 2.6vw, 30px); font-weight: 800; color: #F5F5F7; margin: 16px 0 0; letter-spacing: -0.035em; }
.pd { font-size: 16px; line-height: 1.75; color: #A1A1A6; margin: 20px 0 32px; }

@media (max-width: 900px) {
  .qbox { flex: 1 1 100%; }
}
</style>
