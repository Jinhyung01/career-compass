<script setup>
import { ref } from 'vue'

// 건바이건 결제 — 진단 1건마다 결제한다. 실제 PG 연동 없는 프론트 목업.
defineProps({ company: { type: String, default: '' }, role: { type: String, default: '' } })
const emit = defineEmits(['paid', 'close'])

const PRICE = 5900
const paying = ref(false)

const confirm = () => {
  paying.value = true
  setTimeout(() => emit('paid'), 700)
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-scrim" role="dialog" aria-modal="true" aria-labelledby="pay-title" @click.self="!paying && emit('close')">
      <div class="modal-box panel">
        <p class="cap">1회 진단권 결제</p>
        <h2 id="pay-title">{{ [company, role].filter(Boolean).join(' · ') }}</h2>
        <p class="sub">진단은 건별로 결제되며, 완료된 리포트는 마이페이지에 저장됩니다.</p>

        <div class="row price">
          <span>결제 금액</span>
          <strong class="num">₩{{ PRICE.toLocaleString() }}</strong>
        </div>
        <div class="row">
          <span>결제 수단</span>
          <strong class="num">신한카드 ···· 1024</strong>
        </div>

        <div class="foot-btns">
          <button class="btn btn-line btn-lg btn-pill grow" :disabled="paying" @click="emit('close')">취소</button>
          <button class="btn btn-mint btn-lg btn-pill grow" :disabled="paying" @click="confirm">
            {{ paying ? '결제 처리 중…' : `₩${PRICE.toLocaleString()} 결제하기` }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.panel { max-width: 440px; padding: 36px 34px 30px; }
.cap { font-size: 12px; font-weight: 700; color: var(--mint-d); margin: 0; }
h2 { font-size: 22px; font-weight: 800; margin: 12px 0 0; letter-spacing: -0.03em; }
.sub { font-size: 13px; line-height: 1.7; color: var(--g2); margin: 12px 0 0; }

.row {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 12px; padding: 16px 18px;
  background: var(--mist); border-radius: var(--r-sm);
}
.row:first-of-type { margin-top: 22px; }
.row span { font-size: 13px; font-weight: 600; color: var(--g2); }
.row strong { font-size: 14px; font-weight: 700; }
.row.price strong { font-size: 20px; font-weight: 800; }

.foot-btns { display: flex; gap: 10px; margin-top: 28px; }
.grow { flex: 1 1 0; }
</style>
