<script setup>
defineProps({ label: { type: String, default: '이 메뉴' } })
</script>

<template>
  <div class="modal-scrim" role="alertdialog" aria-modal="true" aria-labelledby="gate-title">
    <div class="modal-box gate">
      <p class="err">로그인 필요</p>
      <h2 id="gate-title">{{ label }}은 로그인 후 이용할 수 있습니다.</h2>
      <p class="d">진단 기록과 리포트는 계정에 저장되기 때문에, 로그인한 상태에서만 열람할 수 있습니다.</p>
      <div class="row">
        <a class="btn btn-dark btn-pill" href="#/login">로그인 / 회원가입</a>
        <a class="btn btn-line btn-pill" href="#/">홈으로</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gate { max-width: 460px; padding: 34px 34px 30px; }
.err {
  display: inline-flex; align-items: center; height: 26px; padding: 0 11px;
  border-radius: 999px; background: #FDECEC; color: #A4222A;
  font-size: 11px; font-weight: 700; margin: 0;
}
h2 { font-size: 21px; line-height: 1.45; font-weight: 800; margin: 18px 0 0; letter-spacing: -0.03em; }
.d { font-size: 14px; line-height: 1.7; color: var(--g2); margin: 14px 0 26px; }
.row { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
