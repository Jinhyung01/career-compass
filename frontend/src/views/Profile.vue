<script setup>
import { computed, ref } from 'vue'
import ConsultAside from '../components/ConsultAside.vue'
import AnalyzingModal from '../components/AnalyzingModal.vue'
import { companies as allCompanies } from '../data/companies.js'

// UC-S02 내 정보 입력 / 수정 — 대조의 기준이 되는 쪽은 공고가 아니라 나다.
// STEP 01 / 02  기업 · 직무 · 기술 스택
// STEP 02 / 02  학력 · 경력 · 자격증 · 프로젝트  (Figma clipboard 31 · 32)
const step = ref(1)
const analyzing = ref(false)

// 지원 기업·직무 선택지는 기업관과 같은 더미 데이터에서 뽑는다
const companies = allCompanies.map(c => c.companyName)
const roles = [...new Set(allCompanies.flatMap(c => c.jobs.map(j => j.name)))].sort()
const allStacks = ['Python', 'RAG', 'FastAPI', 'PyTorch', 'Kubernetes', 'Airflow', 'SQL', 'React', 'TypeScript']
const degrees = ['4년제 졸업 예정', '4년제 졸업', '전문대 졸업', '석사 재학', '석사 졸업']

const form = ref({
  company: 'SK Hynix',
  role: 'AI Engineer',
  stacks: ['Python', 'RAG', 'FastAPI'],
  degree: '4년제 졸업 예정',
  careers: [
    { company: 'SK ATX', period: '2025.01 - 2025.12', type: '인턴, 퇴직', role: 'Product Engineer' },
    { company: 'Samsung 전자', period: '2024.10 - 2024.12', type: '인턴, 퇴직', role: '생산관리' }
  ],
  certs: ['정보처리기사', '빅데이터 분석기사', 'OPic(IH)'],
  project: '',
  files: ['~~결과 보고서.pdf', 'xx 사업 기획안.docs']
})

const certInput = ref('')
const picked = computed(() => allCompanies.find(c => c.companyName === form.value.company) || allCompanies[0])

const toggle = (list, v) => {
  const i = list.indexOf(v)
  i === -1 ? list.push(v) : list.splice(i, 1)
}

const addCert = () => {
  const v = certInput.value.trim()
  if (v && !form.value.certs.includes(v)) form.value.certs.push(v)
  certInput.value = ''
}

const addCareer = () => form.value.careers.push({ company: '', period: '', type: '', role: '' })

const agent = computed(() => step.value === 1
  ? {
      title: ['직무만 정해도', '진단을 시작할 수 있어요.'],
      desc: ['기업까지 적으면 공고 데이터를', '더 정확하게 좁혀볼게요.'],
      checks: [
        { label: '희망 직무 입력 완료', ok: !!form.value.role },
        { label: `기술 스택 ${form.value.stacks.length}개 선택`, ok: form.value.stacks.length > 0 }
      ]
    }
  : {
      title: ['프로필만 입력해도', '진단 할 수 있어요.'],
      desc: ['기업까지 적으면 공고 데이터 기반으로', '더 정확한 컨설팅이 가능해요.'],
      checks: [
        { label: '기업 문화 입력 완료', ok: !!form.value.company },
        { label: `자격증 ${form.value.certs.length}개 등록`, ok: form.value.certs.length > 0 },
        { label: '이력 업로드 중', ok: form.value.files.length > 0 }
      ]
    })

const goStep = n => { step.value = n; window.scrollTo({ top: 0, behavior: 'smooth' }) }
const start = () => { analyzing.value = true }
// 진단이 끝나면 방금 만든 리포트로 바로 이동한다 (목록이 아니라 상세)
const done = () => { analyzing.value = false; location.hash = '#/report/r1' }
</script>

<template>
  <div class="pad wrap">
    <div class="layout">
      <ConsultAside />

      <!-- ═══ 입력 ═══ -->
      <section class="main reveal">
        <p class="eyebrow">STEP {{ step === 1 ? '01' : '02' }} / 02 · 내 정보</p>

        <!-- STEP 01 / 02 -->
        <template v-if="step === 1">
          <h1>어디에 지원하실 건가요?</h1>
          <p class="desc">지원 기업과 직무를 기준으로 채용 공고·현직자 인터뷰를 좁힙니다.</p>

          <label class="label" for="company">지원 기업</label>
          <select id="company" v-model="form.company" class="field">
            <option v-for="c in companies" :key="c">{{ c }}</option>
          </select>

          <label class="label" for="role">희망 직무</label>
          <select id="role" v-model="form.role" class="field">
            <option v-for="r in roles" :key="r">{{ r }}</option>
          </select>

          <p class="label">기술 스택 <span class="opt">중복 선택 가능</span></p>
          <div class="chips">
            <button
              v-for="t in allStacks"
              :key="t"
              class="chip"
              :class="{ on: form.stacks.includes(t) }"
              @click="toggle(form.stacks, t)"
            >{{ t }}</button>
          </div>

          <div class="foot-btns">
            <button class="btn btn-mint btn-lg btn-pill grow" @click="goStep(2)">다음</button>
          </div>
        </template>

        <!-- STEP 02 / 02 -->
        <template v-else>
          <h1>프로필을 입력 받고 있어요.</h1>
          <p class="desc">사용자의 정보를 기준으로 진단 결과를 작성합니다.</p>

          <label class="label" for="degree">학력</label>
          <select id="degree" v-model="form.degree" class="field">
            <option v-for="d in degrees" :key="d">{{ d }}</option>
          </select>

          <p class="label row-label">
            경력
            <button class="add" aria-label="경력 추가" @click="addCareer">+</button>
          </p>
          <ul class="careers">
            <li v-for="(c, i) in form.careers" :key="i">
              <b>{{ c.company || '기업명' }}</b>
              <span>{{ c.period || '기간' }}</span>
              <span>({{ c.type || '고용 형태' }})</span>
              <span>{{ c.role || '직무' }}</span>
            </li>
          </ul>

          <label class="label" for="cert">자격증</label>
          <input
            id="cert"
            v-model="certInput"
            class="field"
            placeholder="자격증 명 입력 후 Enter를 눌러주세요 (예: 정보처리기사, OPic(IH))"
            @keyup.enter="addCert"
          />
          <div class="tags">
            <span v-for="(c, i) in form.certs" :key="c" class="tag">
              {{ c }}<button aria-label="삭제" @click="form.certs.splice(i, 1)">×</button>
            </span>
          </div>

          <label class="label" for="project">프로젝트(경험) 내용</label>
          <textarea id="project" v-model="form.project" class="field area" placeholder="프로젝트 관련 내용을 입력해주세요."></textarea>

          <label class="label" for="resume">프로젝트(경험) 관련 자료 <span class="opt">30일 뒤 자동 삭제</span></label>
          <label class="drop">
            <input id="resume" type="file" accept=".pdf,.docx" hidden />
            <strong>PDF 또는 DOCX를 여기에 놓으세요</strong>
            <span>최대 10MB</span>
          </label>
          <div class="files">
            <span v-for="(f, i) in form.files" :key="f" class="tag">
              {{ f }}<button aria-label="삭제" @click="form.files.splice(i, 1)">×</button>
            </span>
          </div>

          <div class="foot-btns">
            <button class="btn btn-dark btn-lg btn-pill grow" @click="goStep(1)">이전</button>
            <button class="btn btn-mint btn-lg btn-pill grow" @click="start">진단 시작하기 (결제)</button>
          </div>
        </template>
      </section>

      <!-- ═══ 에이전트 ═══ -->
      <aside class="agent">
        <div class="glass-concrete agent-card">
          <p class="tag-row"><i></i>CAREER AGENT</p>

          <h2>
            <span v-for="t in agent.title" :key="t">{{ t }}<br /></span>
          </h2>
          <p class="d">
            <span v-for="d in agent.desc" :key="d">{{ d }}<br /></span>
          </p>

          <hr />

          <ul class="checks">
            <li v-for="c in agent.checks" :key="c.label" :class="{ ok: c.ok }"><span></span>{{ c.label }}</li>
          </ul>

          <p class="note">
            {{ picked.companyName }}에는 인터뷰에 응해주신 현직자가 {{ picked.people }}명 있습니다.
            마지막 인터뷰는 {{ picked.interviewed }}이고, 인사이트는 {{ picked.insight }}건입니다.
          </p>
        </div>
      </aside>
    </div>

    <AnalyzingModal v-if="analyzing" :company="form.company" :role="form.role" @done="done" />
  </div>
</template>

<style scoped>
/* 오른쪽 에이전트 카드를 화면 가장자리 쪽으로 붙이기 위해 우측 거터를 걷어낸다 */
.wrap { padding-bottom: 90px; padding-right: max(20px, calc(var(--gutter) / 3)); }
.layout { display: flex; align-items: flex-start; gap: 0; }

/* 입력 */
.main { flex: 1 1 auto; padding: 44px 52px 40px; max-width: 720px; }
h1 { font-size: clamp(26px, 3vw, 34px); font-weight: 800; margin: 12px 0 0; letter-spacing: -0.04em; }
.desc { font-size: 15px; line-height: 1.7; color: var(--g2); margin: 12px 0 40px; max-width: 52ch; }
.main .label, .main p.label { margin-top: 28px; }
.opt { font-weight: 400; font-size: 12px; color: var(--g4); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }

.row-label { display: flex; align-items: center; justify-content: space-between; }
.add {
  width: 26px; height: 26px; border: 0; border-radius: 8px;
  background: var(--mist); color: var(--ink);
  font-size: 16px; font-weight: 700; line-height: 1;
  transition: background var(--t-base) var(--ease);
}
.add:hover { background: var(--mint-bg); }

.careers {
  list-style: none; margin: 0; padding: 18px 22px;
  border: 1px solid var(--line-2); border-radius: var(--r-sm);
}
.careers li {
  position: relative;
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px;
  font-size: 14px; color: var(--g1);
  padding: 5px 0 5px 14px;
}
.careers li::before {
  content: ''; position: absolute; left: 0; top: 12px;
  width: 4px; height: 4px; border-radius: 50%; background: var(--ink);
}
.careers b { font-size: 14px; font-weight: 700; color: var(--ink); }

.area { height: 120px; padding: 16px 18px; line-height: 1.7; resize: vertical; }

.tags, .files { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.tag {
  display: inline-flex; align-items: center; gap: 8px;
  height: 32px; padding: 0 8px 0 14px; border-radius: 999px;
  background: var(--mist); font-size: 13px; font-weight: 700; color: var(--g1);
}
.tag button {
  border: 0; background: none; color: var(--g4);
  font-size: 15px; line-height: 1; padding: 0 4px;
}
.tag button:hover { color: var(--ink); }

.drop {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  height: 124px;
  background: var(--mist);
  border: 1px dashed var(--line-2);
  border-radius: var(--r);
  cursor: pointer;
  transition: border-color var(--t-base) var(--ease), background var(--t-base) var(--ease), transform var(--t-base) var(--spring);
}
.drop:hover { border-color: var(--mint-d); background: var(--mint-bg); transform: translateY(-2px); }
.drop strong { font-size: 14px; }
.drop span { font-size: 12px; color: var(--g4); }

.foot-btns { display: flex; gap: 12px; margin-top: 44px; }
.grow { flex: 1 1 0; }

/* 에이전트 — 콘크리트 그레이 리퀴드글래스 */
.agent { flex: 0 0 336px; margin-left: auto; padding: 44px 0 40px 24px; }
.agent-card { padding: 28px 26px 30px; }
.tag-row { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; margin: 0; }
.tag-row i { width: 26px; height: 26px; border-radius: 8px; background: var(--mint); }
.agent-card h2 { font-size: 21px; line-height: 1.45; font-weight: 800; margin: 26px 0 0; letter-spacing: -0.03em; }
.d { font-size: 13px; line-height: 1.8; color: var(--g2); margin: 18px 0 0; }
hr { border: 0; border-top: 1px solid rgba(11, 13, 12, 0.1); margin: 24px 0 20px; }
.checks { list-style: none; margin: 0; padding: 0; }
.checks li {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--g3); margin-bottom: 13px;
  transition: color var(--t-base) var(--ease);
}
.checks li span {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--g6); flex: none;
  transition: background var(--t-base) var(--ease), transform var(--t-base) var(--spring);
}
.checks li.ok { color: var(--ink); font-weight: 700; }
.checks li.ok span { background: var(--mint-d); transform: scale(1.35); }
.note {
  font-size: 12px; line-height: 1.6; color: var(--g3);
  margin: 24px 0 0; padding-top: 20px;
  border-top: 1px solid rgba(11, 13, 12, 0.1);
}

@media (max-width: 1100px) {
  .layout { flex-wrap: wrap; }
  .main { flex: 1 1 440px; padding: 36px 32px 40px 0; }
  .agent { flex: 1 1 300px; margin-left: 0; padding: 36px 0 40px; }
}
@media (max-width: 760px) {
  .main { padding: 28px 0; max-width: none; }
  .foot-btns { flex-direction: column; }
}
</style>
