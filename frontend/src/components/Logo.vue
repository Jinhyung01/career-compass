<script setup>
import lockup from '../assets/logo/jobpill-lockup.png'
import lockupDark from '../assets/logo/jobpill-lockup-dark.png'
import mark from '../assets/logo/jobpill-mark.png'
import markDark from '../assets/logo/jobpill-mark-dark.png'

const LOCKUP_RATIO = 1306 / 420
const MARK_RATIO = 332 / 396

const props = defineProps({
  size: { type: Number, default: 28 },
  dark: Boolean,
  markOnly: Boolean
})
</script>

<template>
  <img
    class="logo"
    :src="markOnly ? (dark ? markDark : mark) : (dark ? lockupDark : lockup)"
    :style="{
      height: (markOnly ? size : size * 1.6) + 'px',
      width: (markOnly ? size * MARK_RATIO : size * 1.6 * LOCKUP_RATIO) + 'px'
    }"
    alt="Jobpill"
  />
</template>

<style scoped>
.logo { display: inline-block; object-fit: contain; }
</style>
