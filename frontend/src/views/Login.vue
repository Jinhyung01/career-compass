<script setup>
import { ref } from 'vue'
import AuthAside from '../components/AuthAside.vue'
import { api } from '../api.js'
import { startDemoSession, startSession } from '../auth.js'

const mode = ref('login')
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const agreed = ref(false)
const loading = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  if (mode.value === 'signup' && password.value !== passwordConfirm.value) {
    error.value = '비밀번호 확인이 일치하지 않습니다.'
    return
  }
  if (mode.value === 'signup' && !agreed.value) {
    error.value = '이용약관과 개인정보 처리방침에 동의해 주세요.'
    return
  }

  loading.value = true
  try {
    const credentials = { email: email.value.trim(), password: password.value }
    if (mode.value === 'signup') {
      await api.register({ ...credentials, name: name.value.trim() })
    }
    const response = await api.login(credentials)
    startSession(response, credentials.email)
    location.hash = mode.value === 'login' ? '#/' : '#/profile'
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}

const socialNotice = () => { error.value = '소셜 로그인은 아직 지원하지 않습니다.' }

const startDemo = () => {
  startDemoSession()
  location.hash = '#/'
}
</script>

<template>
  <div class="auth">
    <AuthAside />

    <div class="form reveal">
      <div class="tabs">
        <span class="thumb" :class="mode"></span>
        <button :class="{ on: mode === 'login' }" @click="mode = 'login'">로그인</button>
        <button :class="{ on: mode === 'signup' }" @click="mode = 'signup'">회원가입</button>
      </div>

      <h1>{{ mode === 'login' ? '로그인하고 진단 시작하기' : '가입하고 진단 시작하기' }}</h1>
      <p class="lead">
        {{ mode === 'login'
          ? '진단 기록과 리포트는 계정에 저장됩니다.'
          : '가입 후 프로필을 입력하면 진단을 시작할 수 있습니다.' }}
      </p>

      <template v-if="mode === 'signup'">
        <label class="label" for="name">이름</label>
        <input id="name" v-model="name" class="field" placeholder="홍길동" autocomplete="name" />
      </template>

      <label class="label" for="email">이메일</label>
      <input id="email" v-model="email" class="field" type="email" placeholder="name@email.com" autocomplete="email" />

      <label class="label" for="pw">비밀번호</label>
      <input
        id="pw" v-model="password" class="field" type="password"
        :placeholder="mode === 'login' ? '비밀번호를 입력하세요' : '영문·숫자 조합 8자 이상'"
        autocomplete="current-password"
      />

      <template v-if="mode === 'signup'">
        <label class="label" for="pw2">비밀번호 확인</label>
        <input id="pw2" v-model="passwordConfirm" class="field" type="password" placeholder="한 번 더 입력하세요" autocomplete="new-password" />
        <label class="agree"><input v-model="agreed" type="checkbox" /> 이용약관과 개인정보 처리방침에 동의합니다.</label>
      </template>
      <div v-else class="links">
        <a href="#/login">비밀번호를 잊으셨나요?</a>
      </div>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>

      <button class="btn btn-dark btn-lg btn-block btn-pill" :disabled="loading" @click="submit">
        {{ loading ? '처리 중…' : mode === 'login' ? '로그인' : '가입하고 진단 시작하기' }}
      </button>

      <button v-if="mode === 'login'" class="btn btn-line btn-block btn-pill demo" @click="startDemo">
        김서현 시연 계정으로 둘러보기
      </button>

      <div class="or"><span>또는</span></div>

      <button class="btn btn-block sns kakao" @click="socialNotice">카카오로 계속하기</button>
      <button class="btn btn-block sns google" @click="socialNotice">구글로 계속하기</button>
      <button class="btn btn-block sns naver" @click="socialNotice">네이버로 계속하기</button>

      <p class="foot-note">
        업로드 파일은 용도 외에 이용되지 않습니다.
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth { display: flex; flex-wrap: wrap; align-items: stretch; }
.form {
  flex: 1 1 420px;
  padding: clamp(44px, 5vw, 76px) clamp(24px, 6vw, 120px);
  max-width: 640px;
  margin: 0 auto;
}

.tabs {
  position: relative;
  display: flex;
  background: var(--mist);
  border-radius: 999px;
  padding: 5px;
  margin-bottom: 32px;
}
.thumb {
  position: absolute;
  top: 5px; bottom: 5px; left: 5px;
  width: calc(50% - 5px);
  background: var(--ink);
  border-radius: 999px;
  transition: transform var(--t-base) var(--spring);
}
.thumb.signup { transform: translateX(100%); }
.tabs button {
  position: relative;
  flex: 1;
  height: 42px;
  border: 0;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--g3);
  transition: color var(--t-base) var(--ease);
}
.tabs button.on { color: #fff; }

h1 { font-size: clamp(24px, 2.6vw, 32px); font-weight: 800; margin: 0; letter-spacing: -0.04em; }
.lead { font-size: 15px; color: var(--g2); margin: 12px 0 28px; }
.form-error { margin: 18px 0; color: #A4222A; font-size: 13px; font-weight: 700; }
.demo { margin-top: 10px; }
.label { margin-top: 22px; }
.agree { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--g1); margin: 26px 0 22px; }
.links { display: flex; justify-content: flex-end; margin: 14px 0 26px; }
.links a { font-size: 13px; font-weight: 700; color: var(--g1); border-bottom: 1px solid var(--line-2); }
.links a:hover { color: var(--ink); border-color: var(--ink); }

.or { position: relative; text-align: center; margin: 32px 0 22px; }
.or::before { content: ''; position: absolute; inset: 50% 0 auto; height: 1px; background: var(--line); }
.or span { position: relative; background: #fff; padding: 0 14px; font-size: 12px; color: var(--g4); }

.sns { height: 54px; font-size: 15px; border-radius: 999px; border-color: var(--line-2); margin-bottom: 10px; }
.kakao { background: #FEE500; color: #191600; }
.google { background: #fff; color: var(--ink); }
.naver { background: #03C75A; color: #fff; }

.foot-note { margin-top: 34px; }
</style>
