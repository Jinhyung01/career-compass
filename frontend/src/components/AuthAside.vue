<template>
  <aside>
    <div class="blobs" aria-hidden="true">
      <span class="b1"></span><span class="b2"></span>
    </div>
    <div class="inner">
      <h2>
        <span class="m">현직자 기준으로</span><br />
        <span class="w">부족한 경험을 확인하세요</span>
      </h2>
      <p class="desc">진단 결과는 계정에 저장되고, 다시 진단하면 이전 결과와 비교됩니다.</p>

      <ul class="points">
        <li><b>✓ 리포트 자동 저장</b></li>
        <li><b>✓ 현직자 인터뷰 교차 검증</b></li>
        <li><b>✓ 업로드 파일 용도 외 미이용</b></li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: relative;
  flex: 1 1 400px;
  max-width: 540px;
  background: var(--ink-2);
  overflow: hidden;
  padding: clamp(48px, 6vw, 88px) clamp(28px, 3.4vw, 56px);
}
.blobs span {
  position: absolute;
  border-radius: 48% 52% 55% 45% / 52% 44% 56% 48%;
  animation: swim 22s ease-in-out infinite alternate;
}
.b1 {
  width: 360px; height: 360px; left: -22%; top: -12%;
  background: linear-gradient(145deg, #38FF9C, rgba(0, 112, 66, 0.9));
  opacity: 0.5;
}
.b2 {
  width: 220px; height: 190px; right: -8%; bottom: 6%;
  background: linear-gradient(145deg, #6BFFB8, rgba(0, 88, 52, 0.9));
  opacity: 0.36;
  animation-duration: 17s; animation-delay: -5s;
}
@keyframes swim { to { transform: translate(6vw, 7vh) rotate(20deg) scale(1.18); } }
@media (prefers-reduced-motion: reduce) { .blobs span { animation: none; } }

.inner { position: relative; }
h2 {
  font-size: clamp(28px, 3.2vw, 42px);
  line-height: 1.24;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.045em;
}
.w { color: #F5F5F7; }
.m { color: var(--mint); }
.desc { font-size: 15px; line-height: 1.75; color: #A1A1A6; margin: 24px 0 0; max-width: 42ch; }

.points { list-style: none; margin: 44px 0 0; padding: 0; border-top: 1px solid rgba(255,255,255,0.14); padding-top: 14px; }
.points li { padding: 14px 0; }
.points b { font-size: 14px; font-weight: 700; color: #F0F2F0; }
</style>
