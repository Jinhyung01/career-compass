<script setup>
import Logo from './Logo.vue'
</script>

<template>
  <footer>
    <div class="pad inner">
      <div class="brand">
        <Logo :mark="24" dark />
        <p>현직자에게 직접 물어 정리한 기준으로,<br />내 프로필을 대조합니다.</p>
      </div>

      <nav>
        <div>
          <p class="cap">서비스</p>
          <a href="#/profile">컨설팅</a>
          <a href="#/report">리포트</a>
          <a href="#/companies">기업 정보</a>
        </div>
        <div>
          <p class="cap">계정</p>
          <a href="#/login">로그인</a>
          <a href="#/login">회원가입</a>
          <a href="#/mypage">마이페이지</a>
        </div>
        <div>
          <p class="cap">정책</p>
          <a href="#/">이용약관</a>
          <a href="#/">개인정보 처리방침</a>
        </div>
      </nav>
    </div>

    <div class="pad legal">
      <p>인터뷰 자료는 관리자가 검수해 등록하며 조사 시점을 함께 표시합니다. 업로드한 파일은 30일 뒤 자동 삭제됩니다.</p>
      <p>© 2026 Jobpill</p>
    </div>
  </footer>
</template>

<style scoped>
footer { background: #000; color: #B5B5B5; margin-top: auto; }
.inner { display: flex; flex-wrap: wrap; gap: 40px 80px; padding-top: 56px; padding-bottom: 48px; }
.brand { flex: 1 1 280px; }
.brand p { font-size: 14px; color: #6B6B6B; margin: 18px 0 0; }
nav { display: flex; flex-wrap: wrap; gap: 40px 72px; }
nav div { display: flex; flex-direction: column; gap: 12px; }
.cap { font-size: 12px; font-weight: 700; color: #F5F5F5; margin: 0 0 4px; }
nav a { font-size: 14px; color: #8A8D8A; }
nav a:hover { color: var(--mint); }
.legal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 40px;
  justify-content: space-between;
  border-top: 1px solid #1E211F;
  padding-top: 24px;
  padding-bottom: 40px;
}
.legal p { font-size: 12px; color: #5C5F5C; margin: 0; }
</style>
