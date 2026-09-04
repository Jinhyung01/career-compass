<script setup>
import Logo from './Logo.vue'
import { isAuthenticated, user, logout } from '../auth.js'

defineProps({ active: { type: String, default: '' } })
const emit = defineEmits(['request-auth'])

const menu = [
  { key: 'profile', label: '컨설팅', href: '#/profile', auth: true },
  { key: 'companies', label: '기업 정보', href: '#/companies' },
  { key: 'report', label: '리포트', href: '#/report', auth: true }
]

const openMenu = (event, item) => {
  if (item.auth && !isAuthenticated.value) {
    event.preventDefault()
    emit('request-auth', item.label)
    return
  }
  openPublic(event, item.href.slice(1))
}

const openMyPage = event => {
  if (!isAuthenticated.value) {
    event.preventDefault()
    emit('request-auth', '마이페이지')
    return
  }
  openPublic(event, '/mypage')
}

const openPublic = (event, path) => {
  event.preventDefault()
  location.hash = `#${path}`
}
</script>

<template>
  <header class="top">
    <div class="inner">
      <a class="brand" href="#/" @click="openPublic($event, '/')"><Logo :size="26" /></a>

      <nav class="gnb">
        <a v-for="m in menu" :key="m.key" :href="m.href" :class="{ on: active === m.key }" @click="openMenu($event, m)">
          {{ m.label }}
          <i></i>
        </a>
      </nav>

      <div class="util">
        <a class="ghost" href="#/mypage" @click="openMyPage">마이페이지</a>
        <template v-if="user">
          <span class="who num">{{ user.name }} 님</span>
          <button class="btn btn-line btn-pill btn-sm" @click="logout">로그아웃</button>
        </template>
        <a v-else class="btn btn-mint btn-pill btn-sm" href="#/login" @click="openPublic($event, '/login')">로그인 / 회원가입</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(11, 13, 12, 0.07);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.inner {
  height: 74px;
  display: flex;
  align-items: center;
  gap: 44px;
  padding: 0 var(--gutter);
}
.brand { flex: none; transition: transform var(--t-base) var(--spring); }
.brand:active { transform: scale(0.96); }

.gnb { display: flex; gap: 32px; align-self: stretch; }
.gnb a {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--g3);
  transition: color var(--t-base) var(--ease);
}
.gnb a:hover { color: var(--ink); }
.gnb a.on { color: var(--ink); font-weight: 700; }
.gnb a i {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--t-base) var(--spring);
}
.gnb a:hover i { transform: scaleX(0.55); background: var(--g5); }
.gnb a.on i { transform: scaleX(1); background: var(--ink); }

.util { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.ghost { font-size: 14px; font-weight: 600; color: var(--g3); margin-right: 8px; transition: color var(--t-base) var(--ease); }
.ghost:hover { color: var(--ink); }
.who { font-size: 13px; font-weight: 700; color: var(--ink); margin-right: 4px; }

@media (max-width: 940px) {
  .inner { height: auto; flex-wrap: wrap; gap: 10px 20px; padding-top: 14px; padding-bottom: 12px; }
  .gnb { order: 3; width: 100%; gap: 22px; }
  .gnb a { font-size: 15px; padding-bottom: 6px; }
  .ghost { display: none; }
}
</style>
