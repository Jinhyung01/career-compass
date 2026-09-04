<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import TopNav from './components/TopNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import AuthGate from './components/AuthGate.vue'
import { useReveal } from './composables/useReveal.js'
import { user } from './auth.js'
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

const toTop = () => window.scrollTo({ top: 0, behavior: 'auto' })

const sync = () => {
  path.value = location.hash.slice(1) || '/'
  key.value += 1
  toTop()
  // 새 화면이 그려지면서 문서 높이가 바뀌므로 렌더 후 한 번 더 맨 위로 보낸다
  nextTick(() => requestAnimationFrame(toTop))
}
onMounted(() => window.addEventListener('hashchange', sync))
onUnmounted(() => window.removeEventListener('hashchange', sync))

// 정확히 일치 → /xxx/:id 패턴 → 첫 세그먼트 순으로 찾는다
const route = computed(() => {
  const seg = path.value.split('/').filter(Boolean)
  return routes[path.value] ||
    routes['/' + seg[0] + '/:id'] ||
    routes['/' + seg[0]] ||
    routes['/']
})
const blocked = computed(() => route.value.auth && !user.value)
useReveal()
</script>

<template>
  <div class="shell">
    <TopNav :active="route.nav" />
    <main :key="key" class="page-in" :inert="blocked || undefined">
      <component :is="route.view" />
    </main>
    <SiteFooter />
    <AuthGate v-if="blocked" :label="route.label" />
  </div>
</template>
