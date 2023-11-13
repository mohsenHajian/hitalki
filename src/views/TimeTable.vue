<script>
import { inject } from 'vue'
import DayColumn from '../components/DayColumn.vue'
export default {
  setup() {
    const moment = inject('moment')
    return { moment }
  },
  components: {
    DayColumn
  }
}
</script>

<template>
  <div class="time-table-page">
    <DayColumn />
    <DayColumn />
    <DayColumn />
    <DayColumn />
    <DayColumn />
    <DayColumn />
    <DayColumn />
  </div>
</template>
