import { computed, ref } from 'vue'

const KEY = 'jobpill.user'
const TOKEN_KEY = 'accessToken'
const DEMO_USER = {
  name: '김서현',
  email: 'seohyeon.kim@email.com',
  demo: true
}

export const user = ref(JSON.parse(localStorage.getItem(KEY) || 'null'))
// 실제 로그인과 시연용 더미 세션 모두 화면 접근 권한을 가진다.
// API 호출 가능 여부는 hasApiSession으로 별도 구분한다.
export const isAuthenticated = computed(() => Boolean(user.value))
export const hasApiSession = computed(() => Boolean(user.value && localStorage.getItem(TOKEN_KEY)))
export const isDemoSession = computed(() => Boolean(user.value?.demo))

export const startSession = (loginResponse, email) => {
  const sessionUser = { ...loginResponse.user, email }
  user.value = sessionUser
  localStorage.setItem(KEY, JSON.stringify(sessionUser))
  localStorage.setItem(TOKEN_KEY, loginResponse.accessToken)
}

export const startDemoSession = () => {
  user.value = { ...DEMO_USER }
  localStorage.setItem(KEY, JSON.stringify(user.value))
  localStorage.removeItem(TOKEN_KEY)
}

export const logout = () => {
  user.value = null
  localStorage.removeItem(KEY)
  localStorage.removeItem(TOKEN_KEY)
  location.hash = '#/'
}

window.addEventListener('jobpill:unauthorized', logout)
