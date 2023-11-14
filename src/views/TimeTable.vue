<script>
import { inject } from 'vue'
import DayColumn from '../components/DayColumn.vue'
export default {
  setup() {
    const moment = inject('moment')
    // const d = new Date(2022, 2, 21)
    // const de = new Date(Date.now() + 86400000).toLocaleString()
    // console.log(Date.now())
    // console.log(new Date())
    // console.log(d)
    // console.log(de)
    // console.log(
    //   new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'long' }).format(d)
    // )
    return { moment }
  },
  components: {
    DayColumn
  },
  computed: {
    weekDate() {
      let weekDateArray = []
      for (let i = 0; i < 7; i++) {
        let exteraTimeStanp = 86400000 * i
        weekDateArray.push(Date.now() + exteraTimeStanp)
      }
      return weekDateArray
    }
  }
}
</script>

<template>
  <div class="time-table-page">
    <DayColumn
      v-for="(Date, index) in weekDate"
      :key="Date"
      :DateInfo="Date"
      :Today="index === 0 ? true : false"
    />
  </div>
</template>
