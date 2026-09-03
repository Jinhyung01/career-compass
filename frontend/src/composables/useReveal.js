import { onMounted, onUnmounted } from 'vue'

// 스크롤 리빌 + 게이지 성장 + 숫자 카운트업을 한 옵저버로 처리한다.
// ponytail: 셀렉터 세 개를 한 IntersectionObserver 로 묶음. 노드가 수백 개로 늘면 분리.
export function useReveal() {
  let observer
  let mo

  const countUp = el => {
    const target = Number(el.dataset.count)
    const decimals = Number(el.dataset.decimals || 0)
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const start = performance.now()

    const tick = now => {
      const p = Math.min((now - start) / 1200, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = prefix + (target * eased).toLocaleString('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) + suffix
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const scan = () => {
    document
      .querySelectorAll('.reveal:not(.reveal-in), .stagger:not(.reveal-in), [data-count]:not(.counted)')
      .forEach(n => observer.observe(n))
  }

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target
          el.classList.add('reveal-in')
          if (el.dataset.count && !el.classList.contains('counted')) {
            el.classList.add('counted')
            const d = Number(el.dataset.decimals || 0)
            if (reduce) {
              el.textContent = (el.dataset.prefix || '') +
                Number(el.dataset.count).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d }) +
                (el.dataset.suffix || '')
            } else {
              countUp(el)
            }
          }
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    scan()
    mo = new MutationObserver(() => requestAnimationFrame(scan))
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    observer && observer.disconnect()
    mo && mo.disconnect()
  })
}
