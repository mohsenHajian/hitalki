<script>
import { inject } from 'vue'
export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  }
}
</script>

<template>
  <div class="time-unit">
    <span>16:30</span>
  </div>
</template>
