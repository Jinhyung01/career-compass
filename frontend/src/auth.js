import { ref } from 'vue'

// 프로토타입용 로컬 세션. 실 API 붙일 때 api.login/register 응답으로 교체한다.
const KEY = 'jobpill.user'

export const user = ref(JSON.parse(localStorage.getItem(KEY) || 'null'))

export const login = (u) => {
  user.value = u
  localStorage.setItem(KEY, JSON.stringify(u))
}

export const logout = () => {
  user.value = null
  localStorage.removeItem(KEY)
  location.hash = '#/'
}
