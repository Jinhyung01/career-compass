import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 해시 라우팅이라 브라우저 스크롤 복원이 다른 화면 위치로 끌고 간다
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
createApp(App).mount('#app')
