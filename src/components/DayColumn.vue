<script>
import { inject } from 'vue'
import TimeUnit from './TimeUnit.vue'
export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  },
  components: { TimeUnit }
}
</script>

<template>
  <div class="day-column">
    <div class="day-column-header">
      <!-- <span>{{ moment().format('jYYYY/jM/jD') }}</span> -->
      <span>یکشنبه</span>
      <span>22 آبان</span>
    </div>
    <TimeUnit />
    <TimeUnit />
    <TimeUnit />
  </div>
</template>
