<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import TopNav from './components/TopNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import AuthGate from './components/AuthGate.vue'
import { useReveal } from './composables/useReveal.js'
import { isAuthenticated } from './auth.js'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Reports from './views/Reports.vue'
import Report from './views/Report.vue'
import Companies from './views/Companies.vue'
import CompanyDetail from './views/CompanyDetail.vue'
import MyPage from './views/MyPage.vue'

// 취업준비생 핵심 흐름: 회원가입/로그인 → 컨설팅(STEP 01·02) → 분석 팝업 → 리포트.
// auth: true 인 화면은 비로그인 상태에서 화면 위에 로그인 안내 팝업이 뜬다.
const routes = {
  '/': { view: Home, nav: '' },
  '/login': { view: Login, nav: '' },
  '/profile': { view: Profile, nav: 'profile', auth: true, label: '컨설팅' },
  '/companies': { view: Companies, nav: 'companies' },
  '/company': { view: CompanyDetail, nav: 'companies' }, // #/company/:companyCode
  '/report': { view: Reports, nav: 'report', auth: true, label: '리포트' },
  '/report/:id': { view: Report, nav: 'report', auth: true, label: '리포트' },
  '/mypage': { view: MyPage, nav: 'mypage', auth: true, label: '마이페이지' }
}

const path = ref(location.hash.slice(1) || '/')
const key = ref(0)
const requestedGateLabel = ref('')

const toTop = () => window.scrollTo({ top: 0, behavior: 'auto' })
const goHome = () => {
  requestedGateLabel.value = ''
  location.hash = '#/'
}

const navigateTo = nextPath => {
  requestedGateLabel.value = ''
  if (nextPath === path.value) return
  history.pushState(null, '', `#${nextPath}`)
  applyPath(nextPath)
}

const applyPath = nextPath => {
  path.value = nextPath || '/'
  key.value += 1
  toTop()
  // 새 화면이 그려지면서 문서 높이가 바뀌므로 렌더 후 한 번 더 맨 위로 보낸다
  nextTick(() => requestAnimationFrame(toTop))
}

const sync = () => {
  requestedGateLabel.value = ''
  applyPath(location.hash.slice(1) || '/')
}

// 해시 링크의 브라우저 기본 동작이 멈춰도 메뉴·버튼·푸터 링크가 항상 같은 방식으로 이동한다.
const navigate = event => {
  const anchor = event.target.closest('a[href^="#/"]')
  // 마우스 클릭은 button=0이지만, 키보드/접근성 도구의 click 이벤트는
  // button 값이 없을 수 있다. 그런 정상 클릭도 라우팅한다.
  if (!anchor || event.defaultPrevented || (event.button != null && event.button !== 0) || event.metaKey || event.ctrlKey || event.shiftKey) return

  event.preventDefault()
  const nextPath = anchor.getAttribute('href').slice(1)
  if (nextPath === path.value) return

  navigateTo(nextPath)
}

onMounted(() => {
  window.addEventListener('hashchange', sync)
  document.addEventListener('click', navigate)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', sync)
  document.removeEventListener('click', navigate)
})

// 정확히 일치 → /xxx/:id 패턴 → 첫 세그먼트 순으로 찾는다
const route = computed(() => {
  const seg = path.value.split('/').filter(Boolean)
  return routes[path.value] ||
    routes['/' + seg[0] + '/:id'] ||
    routes['/' + seg[0]] ||
    routes['/']
})
const blocked = computed(() => route.value.auth && !isAuthenticated.value)
const gateVisible = computed(() => Boolean(requestedGateLabel.value) || blocked.value)
const gateLabel = computed(() => requestedGateLabel.value || route.value.label)
const requestAuth = label => { requestedGateLabel.value = label }
useReveal()
</script>

<template>
  <div class="shell">
    <TopNav :active="route.nav" @request-auth="requestAuth" />
    <main :key="key" class="page-in" :inert="gateVisible || undefined">
      <component :is="route.view" />
    </main>
    <SiteFooter />
    <AuthGate v-if="gateVisible" :label="gateLabel" @close="goHome" />
  </div>
</template>
