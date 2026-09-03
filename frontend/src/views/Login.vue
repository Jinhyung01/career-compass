<script setup>
import { ref } from 'vue'
import AuthAside from '../components/AuthAside.vue'
import { login } from '../auth.js'

const mode = ref('login')
const name = ref('')
const email = ref('')

// 프로토타입: 서버 인증 없이 로컬 세션만 만든다. 실 API 연동 시 api.login/register 로 교체.
const submit = () => {
  login({ name: name.value.trim() || email.value.split('@')[0] || '김서현', email: email.value.trim() || 'name@email.com' })
  location.hash = mode.value === 'login' ? '#/mypage' : '#/profile'
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

      <h1>{{ mode === 'login' ? '로그인하고 진단 시작' : '가입하고 진단 시작' }}</h1>
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
        id="pw" class="field" type="password"
        :placeholder="mode === 'login' ? '비밀번호를 입력하세요' : '영문·숫자 조합 8자 이상'"
        autocomplete="current-password"
      />

      <template v-if="mode === 'signup'">
        <label class="label" for="pw2">비밀번호 확인</label>
        <input id="pw2" class="field" type="password" placeholder="한 번 더 입력하세요" autocomplete="new-password" />
        <label class="agree"><input type="checkbox" /> 이용약관과 개인정보 처리방침에 동의합니다.</label>
      </template>
      <div v-else class="links">
        <a href="#/login">비밀번호를 잊으셨나요?</a>
      </div>

      <button class="btn btn-dark btn-lg btn-block btn-pill" @click="submit">
        {{ mode === 'login' ? '로그인' : '가입하고 프로필 입력' }}
      </button>

      <div class="or"><span>또는</span></div>

      <button class="btn btn-block sns kakao" @click="submit">카카오로 계속하기</button>
      <button class="btn btn-block sns google" @click="submit">구글로 계속하기</button>
      <button class="btn btn-block sns naver" @click="submit">네이버로 계속하기</button>

      <p class="foot-note">
        분석에 사용한 이력서 파일은 30일 뒤 자동 삭제됩니다.
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
